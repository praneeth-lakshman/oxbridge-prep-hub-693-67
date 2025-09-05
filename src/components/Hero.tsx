import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Oxbridge & Imperial
            <span className="block text-accent">Entrance Exam Tutoring</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-delay-200">
            Achieve your dream of studying at Oxford, Cambridge, or Imperial with personalized tutoring 
            from current students who've successfully navigated the admissions process.
          </p>
          <div className="flex justify-center animate-fade-in-delay-400">
            <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/team">
                Meet Our Tutors <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center text-white animate-fade-in-delay-400 group">
            <Award className="h-12 w-12 mx-auto mb-4 text-accent transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
            <p className="text-white/80">Current students from Oxford, Cambridge & Imperial</p>
          </div>
          <div className="text-center text-white animate-fade-in-delay-600 group">
            <Users className="h-12 w-12 mx-auto mb-4 text-accent transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Personalized Approach</h3>
            <p className="text-white/80">Tailored tutoring for each student's needs</p>
          </div>
          <div className="text-center text-white animate-fade-in-delay-600 group">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-accent transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
            <p className="text-white/80">Track record of successful admissions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;