import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin, Clock, ArrowUp, Mail, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Team = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tutors from database
  useEffect(() => {
    const loadTutors = async () => {
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'tutor');

        if (error) {
          console.error('Error loading tutors:', error);
          return;
        }

        // Transform database data to match component format
        const transformedTutors = profiles?.map(profile => {
          let specialties: string[] = [];
          
          // Handle subjects data structure safely
          if (profile.subjects && typeof profile.subjects === 'object' && !Array.isArray(profile.subjects)) {
            const subjectsObj = profile.subjects as { [key: string]: any };
            if (subjectsObj.exams && Array.isArray(subjectsObj.exams)) {
              specialties = subjectsObj.exams;
            }
          } else if (Array.isArray(profile.subjects)) {
            specialties = profile.subjects as string[];
          }

          return {
            id: profile.id,
            name: profile.name || 'Anonymous Tutor',
            role: "Tutor",
            university: profile.university || 'University',
            course: profile.degree || 'Course',
            year: profile.year || 'Year',
            specialties,
            examRates: profile.exam_rates || {}
          };
        }) || [];

        setTeamMembers(transformedTutors);
      } catch (error) {
        console.error('Error loading tutors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTutors();
  }, []);

  const examSections = [
    { 
      id: "tmua", 
      title: "TMUA Tutors", 
      description: ""
    },
    { 
      id: "mat", 
      title: "MAT Tutors", 
      description: ""
    },
    { 
      id: "esat", 
      title: "ESAT Tutors", 
      description: ""
    },
    { 
      id: "interview-prep", 
      title: "Interview Preparation", 
      description: ""
    }
  ];

  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure the element is rendered
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Scroll on initial load
    scrollToSection();

    // Listen for hash changes
    const handleHashChange = () => {
      scrollToSection();
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTutorsForExam = (examType: string) => {
    return teamMembers.filter(member => 
      member.specialties.some(specialty => {
        const normalizedSpecialty = specialty.toLowerCase();
        const normalizedExamType = examType.toLowerCase();
        
        if (examType === "interview-prep") {
          return normalizedSpecialty.includes("interview");
        }
        
        // Exact match for MAT to avoid matching "Maths"
        if (normalizedExamType === "mat") {
          return normalizedSpecialty === "mat";
        }
        
        return normalizedSpecialty.includes(normalizedExamType);
      })
    );
  };

  const getEmailTitle = (sectionId: string) => {
    switch (sectionId) {
      case "tmua": return "TMUA";
      case "mat": return "MAT";
      case "esat": return "ESAT + options";
      case "interview-prep": return "Interview preparation";
      default: return sectionId.toUpperCase();
    }
  };

  const getExamSpecificRate = (member: any, sectionId: string) => {
    const rates = member.examRates || {};
    
    // Map section IDs to the exam keys used in signup
    const examKeyMap = {
      'tmua': 'TMUA',
      'mat': 'MAT', 
      'esat': 'ESAT',
      'interview-prep': 'Interview prep'
    };
    
    const examKey = examKeyMap[sectionId as keyof typeof examKeyMap] || sectionId.toUpperCase();
    const rate = rates[examKey] || rates[sectionId] || 30;
    return `£${rate}/hour`;
  };

  const renderTutorCard = (member: any, tutorIndex: number, sectionId: string) => {
    const examRate = getExamSpecificRate(member, sectionId);

    return (
      <Card key={`${member.name}-card`} className="hover:shadow-elegant transition-all duration-300 h-full flex flex-col hover:scale-[1.02]">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex gap-6 mb-4 flex-1">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            
            {/* Details Section - Two Columns */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              {/* Name, University Column */}
              <div>
                <CardTitle className="text-lg mb-2">{member.name}</CardTitle>
                <CardDescription className="font-medium text-primary mb-2">
                  {member.year} {member.course} Student
                </CardDescription>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="text-sm">{member.university}</span>
                  </div>
                </div>
              </div>
              
              {/* Tutor Subjects Column */}
              <div>
                <p className="font-medium mb-2 text-foreground">Tutor:</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing Section */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <span className="font-semibold text-lg">{examRate}</span>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>• 10% discount for 5+ lessons</p>
                <p>• Free taster lesson</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              asChild
              className="flex-1 text-white hover:text-white hover:scale-105 transition-transform duration-200"
              style={{ color: 'white' }}
            >
              <Link 
                to={`/chat/${member.id}`}
                className="text-white hover:text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Chat
              </Link>
            </Button>
            
            <Button 
              className="flex-1 text-white hover:text-white hover:scale-105 transition-transform duration-200"
              style={{ color: 'white' }}
              onClick={async () => {
                try {
                  // Check if user is authenticated
                  const { data: { user }, error: authError } = await supabase.auth.getUser();
                  
                  if (authError || !user) {
                    console.log('User not authenticated, redirecting to login');
                    // Redirect to login if not authenticated - user needs to be logged in
                    window.location.href = '/login';
                    return;
                  }

                  console.log('User authenticated, creating payment session...');
                  
                  const { data, error } = await supabase.functions.invoke('create-payment', {
                    body: {
                      tutorId: member.id,
                      examType: sectionId,
                      lessonQuantity: 1
                    }
                  });

                  if (error) {
                    console.error('Payment error:', error);
                    alert(`Payment failed: ${error.message}`);
                    return;
                  }

                  if (data?.url) {
                    console.log('Payment session created, opening Stripe checkout...');
                    window.open(data.url, '_blank');
                  } else {
                    console.error('No payment URL received');
                    alert('Failed to create payment session. Please try again.');
                  }
                } catch (error) {
                  console.error('Error:', error);
                  alert('Something went wrong. Please try again.');
                }
              }}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Buy Lessons
            </Button>
          </div>
          
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Meet Our Expert Tutors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our tutors are current students at Cambridge and Imperial who have successfully navigated 
            the admissions process and are passionate about helping you achieve your goals.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {examSections.map((section, index) => (
              <Button
                key={section.id}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL hash
                    window.history.pushState(null, '', `#${section.id}`);
                  }
                }}
              >
                {section.title}
              </Button>
            ))}
          </div>
        </div>

        {examSections.map((section, sectionIndex) => {
          const tutors = getTutorsForExam(section.id);
          
          if (tutors.length === 0) return null;
          
          return (
            <div key={section.id} id={section.id} className="mb-16 pt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tutors.map((member, tutorIndex) => renderTutorCard(member, tutorIndex, section.id))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 text-center">
          <Card className="bg-gradient-card border-0 shadow-elegant hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Why Choose Our Tutors?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Recent Experience</h4>
                  <p className="text-muted-foreground text-sm">
                    Our tutors recently went through the same admissions process you're facing, 
                    giving them fresh insights into what examiners are looking for.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Proven Success</h4>
                  <p className="text-muted-foreground text-sm">
                    All our tutors achieved top grades and gained admission to their first-choice universities, 
                    demonstrating their mastery of the material.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Personalized Approach</h4>
                  <p className="text-muted-foreground text-sm">
                    We understand that every student is different and tailor our teaching methods 
                    to match your learning style and goals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary rounded-full shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-125 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 text-accent" />
        </button>
      )}
    </div>
  );
};

export default Team;