import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, User, GraduationCap, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['student', 'tutor'], {
    required_error: 'Please select if you are a student or tutor',
  }),
  firstName: z.string().optional(),
  university: z.string().optional(),
  degree: z.string().optional(),
  year: z.string().optional(),
  exams: z.array(z.string()).optional(),
  examRates: z.record(z.string(), z.number().min(1, 'Rate must be at least £1')).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.userType === 'tutor') {
    return data.exams && data.exams.length > 0 && 
           data.examRates && Object.keys(data.examRates).length > 0 && 
           data.firstName && data.university && data.degree && data.year;
  }
  return true;
}, {
  message: "Tutors must complete all required fields including exam rates",
  path: ["firstName"],
});

const universities = [
  'Oxford',
  'Cambridge', 
  'Imperial',
  'LSE'
];

const degrees = [
  'Mathematics',
  'Physics',
  'Economics',
  'Physical Natural Sciences'
];

const years = [
  '1st',
  '2nd', 
  '3rd'
];

const exams = [
  'TMUA',
  'MAT',
  'ESAT',
  'Interview prep'
];

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'tutor' | null>(null);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [examRates, setExamRates] = useState<Record<string, number>>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userType: undefined,
      firstName: '',
      university: undefined,
      degree: undefined,
      year: undefined,
      exams: [],
      examRates: {},
    },
  });

  const handleSignUp = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);

    try {
      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (authError) throw authError;

      // Create/update profile immediately after user creation
      if (authData.user) {
        const profileData = {
          id: authData.user.id,
          user_type: values.userType,
          updated_at: new Date().toISOString(),
        };

        // Add tutor-specific data if it's a tutor signup
        if (values.userType === 'tutor') {
          Object.assign(profileData, {
            name: values.firstName,
            university: `University of ${values.university}`,
            degree: values.degree,
            year: `${values.year} Year`,
            subjects: {
              exams: values.exams
            },
            exam_rates: values.examRates,
          });
        }

        // Insert or update the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData, { 
            onConflict: 'id',
            ignoreDuplicates: false 
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Still store in localStorage as backup
          if (values.userType === 'tutor') {
            localStorage.setItem('tempTutorData', JSON.stringify({
              user_type: values.userType,
              name: values.firstName,
              university: `University of ${values.university}`,
              degree: values.degree,
              year: `${values.year} Year`,
              subjects: {
                exams: values.exams
              },
              exam_rates: values.examRates,
            }));
          }
        }
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      onSwitchToLogin();
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (type: 'student' | 'tutor') => {
    setSelectedUserType(type);
    form.setValue('userType', type);
    
    if (type === 'student') {
      setSelectedExams([]);
      setExamRates({});
      form.setValue('exams', []);
      form.setValue('examRates', {});
      form.setValue('firstName', '');
      form.setValue('university', undefined);
      form.setValue('degree', undefined);
      form.setValue('year', undefined);
    }
  };

  const addExam = (exam: string) => {
    if (!selectedExams.includes(exam)) {
      const newExams = [...selectedExams, exam];
      setSelectedExams(newExams);
      form.setValue('exams', newExams);
      
      // Initialize rate for new exam
      const newRates = { ...examRates, [exam]: 25 };
      setExamRates(newRates);
      form.setValue('examRates', newRates);
    }
  };

  const removeExam = (exam: string) => {
    const newExams = selectedExams.filter(e => e !== exam);
    setSelectedExams(newExams);
    form.setValue('exams', newExams);
    
    // Remove rate for removed exam
    const newRates = { ...examRates };
    delete newRates[exam];
    setExamRates(newRates);
    form.setValue('examRates', newRates);
  };

  const updateExamRate = (exam: string, rate: number) => {
    const newRates = { ...examRates, [exam]: rate };
    setExamRates(newRates);
    form.setValue('examRates', newRates);
  };

  return (
    <Card className="bg-white/95 backdrop-blur shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Create Account
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Join us to start your journey to Oxbridge & Imperial
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={selectedUserType === 'student' ? 'default' : 'outline'}
                  className={`h-20 flex-col gap-2 transition-all border-2 ${
                    selectedUserType === 'student'
                      ? 'bg-primary text-primary-foreground shadow-lg border-primary scale-105' 
                      : 'hover:bg-secondary border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleUserTypeSelect('student')}
                >
                  <User className="h-6 w-6" />
                  <span className="font-medium">Student</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedUserType === 'tutor' ? 'default' : 'outline'}
                  className={`h-20 flex-col gap-2 transition-all border-2 ${
                    selectedUserType === 'tutor'
                      ? 'bg-primary text-primary-foreground shadow-lg border-primary scale-105' 
                      : 'hover:bg-secondary border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleUserTypeSelect('tutor')}
                >
                  <GraduationCap className="h-6 w-6" />
                  <span className="font-medium">Tutor</span>
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-white pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tutor-specific fields */}
            {selectedUserType === 'tutor' && (
              <div className="space-y-4 animate-fade-in p-4 bg-secondary/50 rounded-lg border">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <GraduationCap className="h-5 w-5" />
                  <span>Tutor Information</span>
                </div>
                
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select your university" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {universities.map((university) => (
                            <SelectItem key={university} value={university}>
                              {university}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select your degree" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {degrees.map((degree) => (
                            <SelectItem key={degree} value={degree}>
                              {degree}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Study</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exams You Can Teach</label>
                  <Select onValueChange={addExam}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select exams to add" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {exams
                        .filter(exam => !selectedExams.includes(exam))
                        .map((exam) => (
                          <SelectItem key={exam} value={exam}>
                            {exam}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  {selectedExams.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedExams.map((exam) => (
                        <Badge
                          key={exam}
                          variant="secondary"
                          className="text-sm bg-accent/20 text-accent-foreground border-accent/30"
                        >
                          {exam}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-2 hover:bg-destructive/20"
                            onClick={() => removeExam(exam)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {selectedExams.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Set Your Rates (£/hour)</label>
                    <div className="space-y-2">
                      {selectedExams.map((exam) => (
                        <div key={exam} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                          <span className="text-sm font-medium min-w-[100px]">{exam}:</span>
                          <Input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="25.00"
                            value={examRates[exam] || ''}
                            onChange={(e) => updateExamRate(exam, parseFloat(e.target.value) || 0)}
                            className="bg-white flex-1"
                          />
                          <span className="text-sm text-muted-foreground">£/hour</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Advise to add £5 to your usual rate
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;