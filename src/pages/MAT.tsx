import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Clock, Target, CheckCircle, BookOpen, Users, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const MAT = () => {
  const syllabus = [
    "Algebra and polynomials",
    "Functions and Graphs",
    "Geometry and coordinate geometry",
    "Trigonometry",
    "Graph transformations",
    "Exponentials and Logarithms",
    "Differentiation and Applications",
    "Integration Techniques",
    "Sequences and Series"
  ];

  const examStructure = [
    { 
      section: "Multiple Choice Questions", 
      duration: "Part of 2.5 hours", 
      questions: "25 multiple choice questions", 
      focus: "Ten 2-mark, ten 3-mark and five 4-mark questions"
    },
    { 
      section: "Long Answer Questions", 
      duration: "Part of 2.5 hours", 
      questions: "2 questions", 
      focus: "15 marks each - detailed mathematical explanations" 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-6 animate-scale-in">
            <Calculator className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            MAT Preparation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Excel in the Mathematics Admissions Test for Oxford Mathematics, Computer Science, 
            and related courses with our expert tutoring from Oxford Mathematics students.
          </p>
        </div>

        {/* What is MAT */}
        <Card className="mb-12 shadow-elegant animate-fade-in-delay-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary animate-scale-in" />
              What is the MAT?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              The Mathematics Admissions Test (MAT) is a subject-specific admissions test for 
              undergraduate Mathematics and Computer Science courses at the University of Oxford.
            </p>
          </CardContent>
        </Card>

        {/* Exam Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-fade-in-delay-400">
          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary animate-scale-in" />
                Exam Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examStructure.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/40 transition-colors duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h4 className="font-semibold text-primary mb-2">{section.section}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Duration: {section.duration}</p>
                      <p>Format: {section.questions}</p>
                      <p>Details: {section.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary animate-scale-in" />
                Key Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {syllabus.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 animate-fade-in hover:bg-muted/20 transition-colors duration-200 rounded p-1" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CheckCircle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Our MAT Preparation */}
        <Card className="mb-12 animate-fade-in-delay-600 hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary animate-scale-in" />
              Why Choose Our MAT Preparation?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.1s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Advanced Problem Techniques</h4>
                    <p className="text-sm text-muted-foreground">Master the sophisticated mathematical explanations and problem-solving approaches MAT demands</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.2s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Oxford-Focused Success</h4>
                    <p className="text-sm text-muted-foreground">Specialized preparation designed specifically for Oxford Mathematics and Computer Science admissions</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.3s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Structured Approach</h4>
                    <p className="text-sm text-muted-foreground">Systematic preparation covering all MAT sections with focused practice on your chosen course areas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.4s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Time Management Mastery</h4>
                    <p className="text-sm text-muted-foreground">Essential strategies for managing the challenging 2.5-hour exam format effectively</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-delay-600">
          <Card className="bg-gradient-hero text-white border-0 hover:scale-[1.02] transition-all duration-300 shadow-elegant hover:shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in-up">Ready to Conquer the MAT?</h3>
              <p className="mb-6 text-white/90 animate-fade-in-delay-200">
                Join students who have successfully gained admission to Oxford Mathematics with our proven MAT preparation program.
              </p>
              <div className="flex justify-center animate-fade-in-delay-400">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link to="/team#mat" className="no-underline">Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MAT;