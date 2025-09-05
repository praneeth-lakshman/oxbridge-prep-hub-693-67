import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Clock, Target, CheckCircle, BookOpen, Users, CheckSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const TMUA = () => {
  const syllabus = [
    "Algebra and Functions",
    "Geometry and coordinate geometry", 
    "Sequences and Series",
    "Trigonometry",
    "Exponentials and Logarithms",
    "Differentiation",
    "Integration",
    "Logic and proofs",
    "Graphs of functions",
    "Number and units",
    "Ratio and proportion",
    "Probability and Statistics"
  ];

  const examStructure = [
    { section: "Paper 1", duration: "75 minutes", questions: "20 multiple choice", focus: "Mathematical thinking" },
    { section: "Paper 2", duration: "75 minutes", questions: "20 multiple choice", focus: "Mathematical reasoning" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6 animate-scale-in">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            TMUA Preparation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the Test of Mathematics for University Admission with expert guidance from 
            Cambridge students who have successfully passed the exam.
          </p>
        </div>

        {/* What is TMUA */}
        <Card className="mb-12 shadow-elegant animate-fade-in-delay-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary animate-scale-in" />
              What is the <a href="https://esat-tmua.ac.uk/about-the-tests/tmua-test/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors duration-200">TMUA</a>?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-6">
              The Test of Mathematics for University Admission (TMUA) is a pre-interview admissions test 
              for undergraduate Mathematics and Mathematics-related courses at several universities.
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Departments/courses that require the TMUA:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.1s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                  <span className="text-sm">Cambridge - Economics, Computer Science</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.15s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                  <span className="text-sm">LSE - Economics, Econometrics and Mathematical Economics</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.2s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                  <span className="text-sm">Imperial College - Computer Science, Mathematics, Economics, Finance and Data Science</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.25s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                  <span className="text-sm">University of Warwick - Computer Science, Economics, Mathematics, Discrete Mathematics</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.3s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                  <span className="text-sm">UCL - Economics</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Note, other courses may encourage the TMUA: find out more details{" "}
                <a href="https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/06/24160159/UAT-UK-Full-Course-List-2026-Entry.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors duration-200">here</a>.
              </p>
            </div>
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
                {examStructure.map((paper, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/40 transition-colors duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h4 className="font-semibold text-primary mb-2">{paper.section}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Duration: {paper.duration}</p>
                      <p>Format: {paper.questions}</p>
                      <p>Focus: {paper.focus}</p>
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
                Syllabus Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {syllabus.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 animate-fade-in hover:bg-muted/20 transition-colors duration-200 rounded p-1" style={{ animationDelay: `${index * 0.03}s` }}>
                    <CheckCircle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Our TMUA Preparation */}
        <Card className="mb-12 animate-fade-in-delay-600 hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary animate-scale-in" />
              Why Choose Our TMUA Preparation?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.1s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Mathematical Reasoning Focus</h4>
                    <p className="text-sm text-muted-foreground">Master the unique mathematical thinking and reasoning skills that TMUA specifically tests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.2s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Comprehensive Coverage</h4>
                    <p className="text-sm text-muted-foreground">Full preparation for both Paper 1 and Paper 2 with targeted practice for each section</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.3s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Effective Study Methods</h4>
                    <p className="text-sm text-muted-foreground">Learn proven techniques for tackling TMUA's challenging multiple-choice format efficiently</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.4s' }}>
                  <CheckSquare className="h-5 w-5 text-green-500 mt-0.5 animate-scale-in" />
                  <div>
                    <h4 className="font-semibold">Success-Oriented Approach</h4>
                    <p className="text-sm text-muted-foreground">Strategies developed by students who achieved the scores needed for top university admission</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-delay-600">
          <Card className="inline-block bg-gradient-hero text-white border-0 hover:scale-[1.02] transition-all duration-300 shadow-elegant hover:shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in-up">Ready to Excel in Your TMUA?</h3>
              <p className="mb-6 text-white/90 animate-fade-in-delay-200">
                Join our proven TMUA preparation program and boost your chances of admission to Cambridge Economics and other top courses.
              </p>
              <div className="flex justify-center animate-fade-in-delay-400">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link to="/team#tmua" className="no-underline">Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TMUA;