import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Download, FileText, Calendar, BookOpen, Target, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const MATPastPapers = () => {
  const pastPapers = [
    {
      year: 2024,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test24.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions24.pdf' }
      ]
    },
    {
      year: 2023,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test23.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions23.pdf' }
      ]
    },
    {
      year: 2022,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test22.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions22.pdf' }
      ]
    },
    {
      year: 2021,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test21.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions21.pdf' }
      ]
    },
    {
      year: 2020,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test20.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions20.pdf' }
      ]
    },
    {
      year: 2019,
      papers: [
        { name: 'MAT Question Paper', url: 'https://www.maths.ox.ac.uk/system/files/attachments/test19.pdf' },
        { name: 'MAT Solutions', url: 'https://www.maths.ox.ac.uk/system/files/attachments/websolutions19.pdf' }
      ]
    }
  ];

  const studyTips = [
    {
      icon: Target,
      title: "Master Long Answer Techniques",
      description: "Focus on clear mathematical explanations and logical reasoning for the 15-mark long answer questions"
    },
    {
      icon: BookOpen,
      title: "Practice Multiple Choice Speed",
      description: "Build efficiency in tackling the 25 multiple choice questions within the time constraints"
    },
    {
      icon: Calculator,
      title: "Develop Problem-Solving Strategies",
      description: "Study solution approaches to understand the mathematical thinking Oxford expects from candidates"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-6">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            MAT Past Papers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access official MAT past papers from recent years to prepare for Oxford Mathematics and Computer Science admissions. 
            All papers are from the University of Oxford Mathematics Department.
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-200">
              <Link to="/mat" className="no-underline">
                Back to MAT Overview
              </Link>
            </Button>
          </div>
        </div>

        {/* Important Information */}
        <Card className="mb-12 shadow-elegant border-l-4 border-l-purple-600">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              How to Use These Past Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <tip.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Past Papers by Year */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Past Papers by Year</h2>
            <p className="text-muted-foreground">
              Each year includes the question paper and detailed solutions. Practice regularly to build confidence and exam technique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastPapers.map((yearData, index) => (
              <Card key={yearData.year} className="shadow-elegant hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    MAT {yearData.year}
                  </CardTitle>
                  <CardDescription>
                    Official past papers from {yearData.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {yearData.papers.map((paper, paperIndex) => (
                      <div key={paperIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-foreground">{paper.name}</span>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a 
                            href={paper.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="no-underline flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-gradient-hero text-white border-0 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Excel in the MAT?</h3>
              <p className="mb-6 text-white/90">
                Past papers are essential, but personalized guidance makes the difference. Get expert MAT preparation 
                from Oxford Mathematics students who have successfully navigated the admissions process.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/team#mat" className="no-underline">Book MAT Tutoring</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link 
                    to="/mat" 
                    className="no-underline"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Learn About MAT
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MATPastPapers;