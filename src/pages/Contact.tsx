import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, GraduationCap, Mail, User, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { tutorId } = useParams<{ tutorId: string }>();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedServices: [] as string[],
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Team member data - should match the data in Team.tsx
  const teamMembers = [
    {
      id: "vincent-xue",
      name: "Vincent",
      role: "Tutor",
      university: "University of Oxford",
      course: "Mathematics",
      year: "1st Year",
      specialties: ["TMUA", "MAT", "Interview Prep"],
      price: "£30/hour"
    },
    {
      id: "praneeth-lakshman",
      name: "Praneeth",
      role: "Tutor", 
      university: "University of Cambridge",
      course: "Physical Natural Sciences",
      year: "1st Year",
      specialties: ["ESAT Maths 1 and 2", "ESAT Physics", "Interview Prep"],
      price: "£30/hour"
    },
    {
      id: "pranav-sharma",
      name: "Pranav",
      role: "Tutor",
      university: "Imperial College London",
      course: "Electrical and Electronic Engineering",
      year: "1st Year",
      specialties: ["ESAT Maths 1 and 2", "ESAT Physics", "Interview Prep"],
      price: "£30/hour"
    }
  ];

  const tutor = teamMembers.find(member => member.id === tutorId);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || formData.selectedServices.length === 0) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and at least one service must be selected.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format services for subject line
      const servicesText = formData.selectedServices.join(', ');
      
      // Placeholder email functionality - replace with actual email service
      const emailData = {
        to: "tutoring@placeholder-email.com", // Replace with actual email
        subject: `[${servicesText}] - ${formData.name}`,
        message: `${formData.additionalInfo || 'No additional information provided'}${formData.phone ? `\n\nPhone: ${formData.phone}` : ''}`
      };

      // Simulate email sending (replace with actual email service like EmailJS, Formspree, etc.)
      console.log('Email would be sent:', emailData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Booking request sent!",
        description: `Your message has been sent to ${tutor?.name}. You'll hear back within 24 hours.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        selectedServices: [],
        additionalInfo: ''
      });

    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tutor Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested tutor could not be found.
            </p>
            <Button asChild>
              <Link to="/team">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Link>
          </Button>
        </div>

        {/* Contact Form */}
        <Card className="shadow-elegant animate-fade-in-up hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 animate-scale-in">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold animate-fade-in-delay-200">
              Book a Session with {tutor.name}
            </CardTitle>
            <p className="text-muted-foreground animate-fade-in-delay-400">
              {tutor.year} {tutor.course} Student at {tutor.university} • {tutor.price}
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              {/* Services Selection */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Select Services You're Interested In *
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-border rounded-lg bg-muted/30">
                  {tutor.specialties.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.selectedServices.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Please select at least one service
                  </p>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-sm font-medium">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Tell us about your goals, current level, preferred schedule, or any specific questions..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-hero hover:bg-primary/90 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Booking Request
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                You'll receive a confirmation email and hear back within 24 hours. 
                Free taster lessons available!
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;