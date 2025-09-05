import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Clock, CheckCircle, BookOpen, Users, Target, CheckSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ESAT = () => {
  const mathSyllabus = [
    "Units",
    "Number", 
    "Ratio and proportion",
    "Algebra",
    "Geometry",
    "Statistics",
    "Probability"
  ];

  const math2Syllabus = [
    "Algebra and functions",
    "Sequences and series", 
    "Trigonometry",
    "Coordinate geometry",
    "Exponentials and logarithms",
    "Differentiation and Integration",
    "Graphs of functions"
  ];

  const biologySyllabus = [
    "Cells",
    "Movement across membranes",
    "Cell division and sex determination",
    "Inheritance",
    "DNA",
    "Gene technologies",
    "Variation",
    "Enzymes",
    "Animal and plant physiology",
    "Ecosystems"
  ];

  const chemistrySyllabus = [
    "Atomic structure",
    "The periodic table",
    "Chemical reactions, formulae and equations",
    "Quantitative chemistry",
    "Redox",
    "Chemical bonding, structure and properties",
    "Group chemistry"
  ];

  const chemistrySyllabusRight = [
    "Separation techniques",
    "Acids, bases and salts",
    "Rates of reaction",
    "Energetics",
    "Electrolysis",
    "Organic chemistry",
    "Metals",
    "Particle theory",
    "Chemical tests",
    "Air and water"
  ];

  const physicsSyllabus = [
    "Electricity",
    "Magnetism",
    "Mechanics",
    "Thermal physics",
    "Matter",
    "Waves",
    "Radioactivity"
  ];

  const examStructure = [
    { 
      section: "Mathematics 1", 
      duration: "40 minutes", 
      questions: "27 multiple choice", 
      hasSyllabus: true,
      syllabusType: "math1"
    },
    { section: "Mathematics 2", duration: "40 minutes", questions: "27 multiple choice", hasSyllabus: true, syllabusType: "math2" },
    { section: "Physics", duration: "40 minutes", questions: "27 multiple choice", hasSyllabus: true, syllabusType: "physics" },
    { section: "Chemistry", duration: "40 minutes", questions: "27 multiple choice", hasSyllabus: true, syllabusType: "chemistry" },
    { section: "Biology", duration: "40 minutes", questions: "27 multiple choice", hasSyllabus: true, syllabusType: "biology" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6 animate-scale-in">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            ESAT Preparation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the Engineering and Science Admissions Test with expert guidance from 
            Cambridge students who have successfully passed the exam.
          </p>
        </div>

        {/* What is ESAT */}
        <Card className="mb-12 shadow-elegant animate-fade-in-delay-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary animate-scale-in" />
              What is the ESAT?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-6">
              The Engineering and Science Admissions Test (ESAT) is a pre-interview admissions test 
              for undergraduate Engineering, Computer Science, and Natural Sciences courses at the 
              University of Cambridge, and other science-related courses at participating universities.
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Departments/courses that require the ESAT:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.1s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">Cambridge - Engineering, Natural Sciences, Veterinary Medicine</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.15s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">Imperial College London - Physics, Engineering</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded p-2" style={{ animationDelay: '0.2s' }}>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">UCL - Electronic and Electrical Engineering</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Note, other courses may encourage the ESAT: find out more details{" "}
                <a href="https://esat-tmua.ac.uk/about-the-tests/esat-test/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors duration-200">here</a>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Exam Structure */}
        <Card className="mb-12 animate-fade-in-delay-400 hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary animate-scale-in" />
              Exam Structure
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Most courses will require candidates to answer Mathematics 1 and two further modules.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examStructure.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="font-semibold text-primary mb-2">{section.section}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Duration: {section.duration}</p>
                    <p>Format: {section.questions}</p>
                     {section.hasSyllabus && (
                       <div className="mt-3">
                         <p className="font-medium text-foreground mb-2">Syllabus Coverage:</p>
                         {section.syllabusType === "chemistry" ? (
                           <div className="grid grid-cols-2 gap-x-4">
                             <div className="space-y-1">
                               {chemistrySyllabus.map((topic, topicIndex) => (
                                 <div key={topicIndex} className="flex items-center gap-2 hover:bg-muted/20 transition-colors duration-200 rounded p-1">
                                   <CheckCircle className="h-4 w-4 shrink-0 text-yellow-500" />
                                   <span className="text-xs">{topic}</span>
                                 </div>
                               ))}
                             </div>
                             <div className="space-y-1">
                               {chemistrySyllabusRight.map((topic, topicIndex) => (
                                 <div key={topicIndex} className="flex items-center gap-2 hover:bg-muted/20 transition-colors duration-200 rounded p-1">
                                   <CheckCircle className="h-4 w-4 shrink-0 text-yellow-500" />
                                   <span className="text-xs">{topic}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         ) : (
                           <div className="space-y-1">
                             {(section.syllabusType === "math1" ? mathSyllabus : 
                               section.syllabusType === "math2" ? math2Syllabus : 
                               section.syllabusType === "physics" ? physicsSyllabus :
                               biologySyllabus).map((topic, topicIndex) => (
                               <div key={topicIndex} className="flex items-center gap-2 hover:bg-muted/20 transition-colors duration-200 rounded p-1">
                                 <CheckCircle className="h-4 w-4 shrink-0 text-yellow-500" />
                                 <span className="text-xs">{topic}</span>
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Our ESAT Preparation */}
        <Card className="mb-12 animate-fade-in-delay-600 hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary animate-scale-in" />
              Why Choose Our ESAT Preparation?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.1s' }}>
                 <CheckSquare className="h-5 w-5 shrink-0 text-green-500 animate-scale-in" />
                 <div>
                  <h4 className="font-semibold">Targeted Practice</h4>
                  <p className="text-sm text-muted-foreground">Focus on the specific problem-solving techniques and thinking skills that ESAT demands</p>
                </div>
              </div>
               <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.2s' }}>
                 <CheckSquare className="h-5 w-5 shrink-0 text-green-500 animate-scale-in" />
                 <div>
                  <h4 className="font-semibold">Personalized Approach</h4>
                  <p className="text-sm text-muted-foreground">Tailored preparation plans that address your specific strengths and areas for improvement</p>
                </div>
              </div>
               <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.3s' }}>
                 <CheckSquare className="h-5 w-5 shrink-0 text-green-500 animate-scale-in" />
                 <div>
                  <h4 className="font-semibold">Exam Strategy Mastery</h4>
                  <p className="text-sm text-muted-foreground">Learn time management, question analysis, and strategic approaches to maximize your score</p>
                </div>
              </div>
               <div className="flex items-start gap-3 animate-fade-in hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3" style={{ animationDelay: '0.4s' }}>
                 <CheckSquare className="h-5 w-5 shrink-0 text-green-500 animate-scale-in" />
                 <div>
                  <h4 className="font-semibold">Recent Exam Experience</h4>
                  <p className="text-sm text-muted-foreground">Benefit from fresh insights and up-to-date knowledge of current ESAT formats and expectations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-delay-600">
          <Card className="bg-gradient-hero text-white border-0 hover:scale-[1.02] transition-all duration-300 shadow-elegant hover:shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in-up">Ready to Excel in Your ESAT?</h3>
              <p className="mb-6 text-white/90 animate-fade-in-delay-200">
                Join our proven ESAT preparation program and boost your chances of admission to Cambridge Engineering, Computer Science, and Natural Sciences.
              </p>
              <div className="flex justify-center animate-fade-in-delay-400">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link to="/team#esat" className="no-underline">Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ESAT;
