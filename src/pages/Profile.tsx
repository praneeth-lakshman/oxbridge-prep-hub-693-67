import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit3, Save, X, LogOut, MessageSquare, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Inbox from '@/components/Inbox';

interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  university: string | null;
  degree: string | null;
  year: string | null;
  subjects: any;
  exam_rates: any;
  user_type: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    university: string;
    degree: string;
    year: string;
    exam_rates: Record<string, number>;
  }>({
    name: '',
    university: '',
    degree: '',
    year: '',
    exam_rates: {
      TMUA: 30,
      MAT: 30,
      ESAT: 30,
      'interview-prep': 35
    }
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }
      
      setUser(user);
      await fetchProfile(user.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
        setFormData({
          name: data.name || '',
          university: data.university || '',
          degree: data.degree || '',
          year: data.year || '',
          exam_rates: (typeof data.exam_rates === 'object' && data.exam_rates !== null) 
            ? {...{TMUA: 30, MAT: 30, ESAT: 30, 'interview-prep': 35}, ...data.exam_rates as Record<string, number>}
            : {
                TMUA: 30,
                MAT: 30,
                ESAT: 30,
                'interview-prep': 35
              }
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    
    try {
      const profileData = {
        id: user.id,
        email: user.email,
        name: formData.name || null,
        university: formData.university || null,
        degree: formData.degree || null,
        year: formData.year || null,
        exam_rates: formData.exam_rates || null,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      setIsEditing(false);
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setFormData({
      name: profile?.name || '',
      university: profile?.university || '',
      degree: profile?.degree || '',
      year: profile?.year || '',
      exam_rates: (typeof profile?.exam_rates === 'object' && profile.exam_rates !== null)
        ? {...{TMUA: 30, MAT: 30, ESAT: 30, 'interview-prep': 35}, ...profile.exam_rates as Record<string, number>}
        : {
            TMUA: 30,
            MAT: 30,
            ESAT: 30,
            'interview-prep': 35
          }
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${profile?.user_type === 'tutor' ? 'max-w-7xl' : 'max-w-2xl'}`}>
        {/* Header */}
        <Card className="bg-gradient-card border-0 shadow-elegant mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-between items-start mb-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="text-muted-foreground"
              >
                ← Back to Home
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
            
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                {profile?.name || 'Welcome!'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {user.email}
                {profile?.user_type === 'tutor' && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    Tutor
                  </span>
                )}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        {profile?.user_type === 'tutor' ? (
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your tutor profile information and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              
              {!isEditing ? (
                // Display Mode
                <div className="space-y-4">
                  {profile?.university && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">University</h3>
                      <p className="text-muted-foreground">{profile.university}</p>
                    </div>
                  )}
                  
                  {profile?.degree && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Degree</h3>
                      <p className="text-muted-foreground">{profile.degree}</p>
                    </div>
                  )}
                  
                  {profile?.year && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Year</h3>
                      <p className="text-muted-foreground">{profile.year}</p>
                    </div>
                  )}
                  
                  {profile?.exam_rates && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Exam Rates</h3>
                      <div className="space-y-1">
                        {Object.entries(profile.exam_rates as Record<string, number>).map(([exam, rate]) => (
                          <p key={exam} className="text-muted-foreground">
                            {exam}: £{rate}/hour
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Member Since</h3>
                    <p className="text-muted-foreground">
                      {new Date(profile?.created_at || user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                // Edit Mode - Same as before
                <div className="space-y-4">
                  {/* ... keep existing code (edit form) */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      name="university"
                      placeholder="Enter your university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      name="degree"
                      placeholder="Enter your degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      placeholder="Enter your year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Exam Rates (£/hour)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(formData.exam_rates).map(([exam, rate]) => (
                        <div key={exam} className="space-y-1">
                          <Label htmlFor={exam} className="text-xs">{exam}</Label>
                          <Input
                            id={exam}
                            type="number"
                            placeholder="Rate"
                            value={rate}
                            onChange={(e) => setFormData({
                              ...formData, 
                              exam_rates: {
                                ...formData.exam_rates,
                                [exam]: parseFloat(e.target.value) || 0
                              }
                            })}
                            className="bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={saveProfile}
                      disabled={saving}
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      onClick={cancelEdit}
                      variant="outline"
                      disabled={saving}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Student Profile - Simple single card
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="space-y-6">
              <Separator />
              
              {!isEditing ? (
                // Display Mode
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Member Since</h3>
                    <p className="text-muted-foreground">
                      {new Date(profile?.created_at || user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                // Edit Mode for Students (minimal)
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={saveProfile}
                      disabled={saving}
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      onClick={cancelEdit}
                      variant="outline"
                      disabled={saving}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;