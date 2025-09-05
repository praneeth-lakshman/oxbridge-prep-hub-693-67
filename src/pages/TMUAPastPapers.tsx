import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Download, FileText, Calendar, BookOpen, Target, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const TMUAPastPapers = () => {
  const pastPapers = [
    {
      year: 'Specimen',
      papers: [
        { name: 'TMUA Paper 1', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141417/TMUA-early-specimen-paper-1.pdf' },
        { name: 'TMUA Paper 2', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141413/TMUA-early-specimen-paper-2.pdf' },
        { name: 'TMUA Paper 1 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141418/TMUA-early-specimen-paper-1-worked-answers.pdf' },
        { name: 'TMUA Paper 2 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141415/TMUA-early-specimen-paper-2-worked-answers.pdf' },
        { name: 'Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141414/TMUA-early-specimen-paper-answer-keys.pdf' }
      ]
    },
    {
      year: 2023,
      papers: [
        { name: 'TMUA Paper 1', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144109/TMUA-2023-paper-1.pdf' },
        { name: 'TMUA Paper 2', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144111/TMUA-2023-paper-2.pdf' },
        { name: 'TMUA Paper 1 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105227/TMUA-2023-paper-1-worked-answers.pdf' },
        { name: 'TMUA Paper 2 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105226/TMUA-2023-paper-2-worked-answers.pdf' },
        { name: 'Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/04/30144123/TMUA-2023-answer-keys.pdf' }
      ]
    },
    {
      year: 2022,
      papers: [
        { name: 'TMUA Paper 1', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141241/TMUA-2022-paper-1.pdf' },
        { name: 'TMUA Paper 2', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141239/TMUA-2022-paper-2.pdf' },
        { name: 'TMUA Paper 1 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105226/TMUA-2022-paper-1-worked-answers.pdf' },
        { name: 'TMUA Paper 2 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/06/04105227/TMUA-2022-paper-2-worked-answers.pdf' },
        { name: 'Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141242/TMUA-2022-answer-keys.pdf' }
      ]
    },
    {
      year: 2021,
      papers: [
        { name: 'TMUA Paper 1', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141119/TMUA-2021-paper-1.pdf' },
        { name: 'TMUA Paper 2', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141117/TMUA-2021-paper-2.pdf' },
        { name: 'TMUA Paper 1 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141121/TMUA-2021-paper-1-worked-answers.pdf' },
        { name: 'TMUA Paper 2 Mark Scheme', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141118/TMUA-2021-paper-2-worked-answers.pdf' },
        { name: 'Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07141122/TMUA-2021-answer-keys.pdf' }
      ]
    }
  ];

  const studyTips = [
    {
      icon: Target,
      title: "Practice Under Timed Conditions",
      description: "Complete past papers within the 75-minute time limit to build exam stamina and time management skills"
    },
    {
      icon: BookOpen,
      title: "Analyze Mark Schemes",
      description: "Study the marking criteria to understand exactly what examiners are looking for in your responses"
    },
    {
      icon: Calculator,
      title: "Focus on Mathematical Reasoning",
      description: "Pay attention to the problem-solving approaches and mathematical thinking demonstrated in solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            TMUA Past Papers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access official TMUA past papers from recent years to practice and prepare effectively. 
            All papers are from the University of Cambridge Assessment Admissions Testing.
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-200">
              <Link to="/tmua" className="no-underline">
                Back to TMUA Overview
              </Link>
            </Button>
          </div>
        </div>

        {/* Important Information */}
        <Card className="mb-12 shadow-elegant border-l-4 border-l-blue-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-600" />
              How to Use These Past Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 hover:bg-muted/10 transition-colors duration-200 rounded-lg p-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <tip.icon className="h-5 w-5 text-blue-600" />
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
              Each year includes both papers and mark schemes. Download and practice to familiarize yourself with the exam format.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastPapers.map((yearData, index) => (
              <Card key={yearData.year} className="shadow-elegant hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    TMUA {yearData.year}
                  </CardTitle>
                  <CardDescription>
                    {yearData.year === 'Specimen' ? 'Official specimen past paper' : `Official past papers from ${yearData.year}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {yearData.papers.map((paper, paperIndex) => (
                       <div key={paperIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-foreground">{paper.name}</span>
                        </div>
                        <Button size="sm" variant="outline" asChild className="hover:scale-105 transition-transform duration-200">
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
          <Card className="inline-block bg-gradient-hero text-white border-0 hover:scale-[1.02] transition-all duration-300 shadow-elegant hover:shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Help with TMUA Preparation?</h3>
              <p className="mb-6 text-white/90">
                Past papers are just the beginning. Get personalized guidance from Cambridge students 
                who have successfully passed the TMUA and gained admission to top universities.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link to="/team#tmua" className="no-underline">Book TMUA Tutoring</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link 
                    to="/tmua" 
                    className="no-underline"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Learn About TMUA
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

export default TMUAPastPapers;