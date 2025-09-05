import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Download, FileText, Calendar, BookOpen, Target, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const ESATPastPapers = () => {
  const esatPapers = [
    {
      year: 2024,
      papers: [
        { name: 'ESAT Mathematics 1', url: 'https://www.admissionstesting.org/Images/665084-esat-2024-mathematics-1.pdf' },
        { name: 'ESAT Mathematics 2', url: 'https://www.admissionstesting.org/Images/665085-esat-2024-mathematics-2.pdf' },
        { name: 'ESAT Physics', url: 'https://www.admissionstesting.org/Images/665086-esat-2024-physics.pdf' },
        { name: 'ESAT Chemistry', url: 'https://www.admissionstesting.org/Images/665087-esat-2024-chemistry.pdf' },
        { name: 'ESAT Biology', url: 'https://www.admissionstesting.org/Images/665088-esat-2024-biology.pdf' },
        { name: 'ESAT Mark Scheme', url: 'https://www.admissionstesting.org/Images/665089-esat-2024-mark-scheme.pdf' }
      ]
    },
    {
      year: 2023,
      papers: [
        { name: 'ESAT Mathematics 1', url: 'https://www.admissionstesting.org/Images/630340-esat-2023-mathematics-1.pdf' },
        { name: 'ESAT Mathematics 2', url: 'https://www.admissionstesting.org/Images/630341-esat-2023-mathematics-2.pdf' },
        { name: 'ESAT Physics', url: 'https://www.admissionstesting.org/Images/630342-esat-2023-physics.pdf' },
        { name: 'ESAT Chemistry', url: 'https://www.admissionstesting.org/Images/630343-esat-2023-chemistry.pdf' },
        { name: 'ESAT Biology', url: 'https://www.admissionstesting.org/Images/630344-esat-2023-biology.pdf' },
        { name: 'ESAT Mark Scheme', url: 'https://www.admissionstesting.org/Images/630345-esat-2023-mark-scheme.pdf' }
      ]
    },
    {
      year: 2022,
      papers: [
        { name: 'ESAT Mathematics 1', url: 'https://www.admissionstesting.org/Images/587029-esat-2022-mathematics-1.pdf' },
        { name: 'ESAT Mathematics 2', url: 'https://www.admissionstesting.org/Images/587030-esat-2022-mathematics-2.pdf' },
        { name: 'ESAT Physics', url: 'https://www.admissionstesting.org/Images/587031-esat-2022-physics.pdf' },
        { name: 'ESAT Chemistry', url: 'https://www.admissionstesting.org/Images/587032-esat-2022-chemistry.pdf' },
        { name: 'ESAT Biology', url: 'https://www.admissionstesting.org/Images/587033-esat-2022-biology.pdf' },
        { name: 'ESAT Mark Scheme', url: 'https://www.admissionstesting.org/Images/587034-esat-2022-mark-scheme.pdf' }
      ]
    },
    {
      year: 2021,
      papers: [
        { name: 'ESAT Mathematics 1', url: 'https://www.admissionstesting.org/Images/553033-esat-2021-mathematics-1.pdf' },
        { name: 'ESAT Mathematics 2', url: 'https://www.admissionstesting.org/Images/553034-esat-2021-mathematics-2.pdf' },
        { name: 'ESAT Physics', url: 'https://www.admissionstesting.org/Images/553035-esat-2021-physics.pdf' },
        { name: 'ESAT Chemistry', url: 'https://www.admissionstesting.org/Images/553036-esat-2021-chemistry.pdf' },
        { name: 'ESAT Biology', url: 'https://www.admissionstesting.org/Images/553037-esat-2021-biology.pdf' },
        { name: 'ESAT Mark Scheme', url: 'https://www.admissionstesting.org/Images/553038-esat-2021-mark-scheme.pdf' }
      ]
    }
  ];

  const engaaPapers = [
    {
      year: 2023,
      papers: [
        { name: 'ENGAA Question Paper', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07115605/ENGAA_2023_S1_QuestionPaper.pdf' },
        { name: 'ENGAA Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07115610/ENGAA_2023_S1_AnswerKey.pdf' }
      ]
    },
    {
      year: 2022,
      papers: [
        { name: 'ENGAA Question Paper', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07115611/ENGAA_2022_S1_QuestionPaper.pdf' },
        { name: 'ENGAA Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07115612/ENGAA_2022_S1_AnswerKey.pdf' }
      ]
    }
  ];

  const nsaaPapers = [
    {
      year: 2023,
      papers: [
        { name: 'NSAA Question Paper', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07120523/NSAA_2023_S1_QuestionPaper.pdf' },
        { name: 'NSAA Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07120531/NSAA_2023_S1_AnswerKey.pdf' }
      ]
    },
    {
      year: 2022,
      papers: [
        { name: 'NSAA Question Paper', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07120525/NSAA_2022_S1_QuestionPaper.pdf' },
        { name: 'NSAA Answer Key', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/07120531/NSAA_2022_S1_AnswerKey.pdf' }
      ]
    }
  ];

  const studyTips = [
    {
      icon: Target,
      title: "Practice Module Selection",
      description: "Most courses require Mathematics 1 plus two other modules. Practice the specific combination your course requires"
    },
    {
      icon: BookOpen,
      title: "Time Management Across Modules",
      description: "Each module is 40 minutes with 27 questions. Develop strategies for efficient question completion"
    },
    {
      icon: Calculator,
      title: "Subject-Specific Preparation",
      description: "Focus on the scientific reasoning and problem-solving approaches specific to each ESAT module"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            ESAT Past Papers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access historic ENGAA and NSAA past papers that contain questions similar to those found in the ESAT. 
            These papers provide valuable practice for Cambridge Engineering and Natural Sciences preparation.
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link to="/esat" className="no-underline">
                Back to ESAT Overview
              </Link>
            </Button>
          </div>
        </div>

        {/* Important Information */}
        <Card className="mb-12 shadow-elegant border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Info className="h-6 w-6 text-green-600" />
              How to Use These Past Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <tip.icon className="h-5 w-5 text-green-600" />
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


        {/* ENGAA Past Papers */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">ENGAA Past Papers</h2>
            <p className="text-muted-foreground">
              Historic Engineering Admissions Assessment papers containing questions similar to those found in the ESAT.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {engaaPapers.map((yearData, index) => (
              <Card key={yearData.year} className="shadow-elegant hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-5 w-5 text-green-600" />
                    ENGAA {yearData.year}
                  </CardTitle>
                  <CardDescription>
                    Historic Engineering Admissions Assessment from {yearData.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {yearData.papers.map((paper, paperIndex) => (
                      <div key={paperIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-green-600" />
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

        {/* NSAA Past Papers */}
        <div className="space-y-8 mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">NSAA Past Papers</h2>
            <p className="text-muted-foreground">
              Historic Natural Sciences Admissions Assessment papers containing questions similar to those found in the ESAT.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {nsaaPapers.map((yearData, index) => (
              <Card key={yearData.year} className="shadow-elegant hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-5 w-5 text-green-600" />
                    NSAA {yearData.year}
                  </CardTitle>
                  <CardDescription>
                    Historic Natural Sciences Admissions Assessment from {yearData.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {yearData.papers.map((paper, paperIndex) => (
                      <div key={paperIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-green-600" />
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
              <h3 className="text-2xl font-bold mb-4">Ready to Excel in Your ESAT?</h3>
              <p className="mb-6 text-white/90">
                Past papers provide essential practice, but expert guidance ensures success. Get personalized ESAT preparation 
                from Cambridge students who have successfully gained admission to Engineering and Natural Sciences.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/team#esat" className="no-underline">Book ESAT Tutoring</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link 
                    to="/esat" 
                    className="no-underline"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Learn About ESAT
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

export default ESATPastPapers;