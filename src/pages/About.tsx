import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are accomplished university students who recently secured places at top institutions, bringing 
            firsthand expertise from navigating the admissions process just one year ago to guide students toward achieving their university admission goals.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16 animate-fade-in-delay-200">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4 animate-scale-in" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                To provide exceptional academic support and guidance to students preparing for 
                university admissions tests and interviews. We believe every student deserves 
                personalized attention and expert instruction to reach their full potential.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Co-Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-delay-400">
          <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:scale-[1.03] animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto mb-4 flex items-center justify-content-center animate-scale-in">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Vincent</h3>
              <p className="text-primary font-medium mb-3">Co-Founder & CEO</p>
              <p className="text-muted-foreground text-sm">
                Oxford Mathematics student specializing in TMUA and MAT preparation. Expert in 
                mathematical reasoning and problem-solving techniques with recent firsthand admissions experience.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:scale-[1.03] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/60 rounded-full mx-auto mb-4 flex items-center justify-center animate-scale-in">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Pranav</h3>
              <p className="text-primary font-medium mb-3">Co-Founder & CMO</p>
              <p className="text-muted-foreground text-sm">
                Imperial College Engineering student with expertise in ESAT preparation and 
                science admissions. Passionate about making simple engineering concepts complex to himself.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:scale-[1.03] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-4 flex items-center justify-center animate-scale-in">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Praneeth</h3>
              <p className="text-primary font-medium mb-3">Co-Founder & COO</p>
              <p className="text-muted-foreground text-sm">
                Cambridge Physical Natural Sciences student specializing in ESAT and interview preparation. 
                Expert in building confidence and communication skills for university admissions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Approach */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Learning</h3>
              <p className="text-muted-foreground">
                We understand that every student learns differently. Our tutors adapt their 
                teaching methods to match each student's learning style and pace.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-foreground mb-3">Flexible Scheduling</h3>
              <p className="text-muted-foreground">
                We work around your schedule to provide convenient tutoring sessions that 
                fit into your busy academic and personal life.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-foreground mb-3">Comprehensive Support</h3>
              <p className="text-muted-foreground">
                Beyond test preparation, we provide guidance on university applications, 
                personal statements, and interview techniques.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-foreground mb-3">Continuous Progress</h3>
              <p className="text-muted-foreground">
                Regular assessments and feedback ensure you're making steady progress 
                toward your academic goals.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="mb-6 text-white/90">
                Join students who have achieved their university admission goals with our expert guidance.
              </p>
              <div className="flex justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/team" className="no-underline">Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;