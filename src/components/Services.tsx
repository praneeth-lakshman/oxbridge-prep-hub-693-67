import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'TMUA',
      description: 'Test of Mathematics for University Admission preparation for Cambridge Economics and other courses.',
      icon: Calculator,
      link: '/tmua',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'MAT',
      description: 'Mathematics Admissions Test preparation for Oxford Mathematics and related courses.',
      icon: Calculator,
      link: '/mat',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'ESAT',
      description: 'Engineering and Science Admissions Test preparation for Cambridge Engineering and Natural Sciences.',
      icon: Calculator,
      link: '/esat',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Interview Preparation',
      description: 'Mock interviews and coaching to excel in Oxbridge and Imperial admission interviews.',
      icon: MessageCircle,
      link: '/interview-prep',
      color: 'bg-red-50 text-red-600'
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Our Tutoring Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay-200">
            Comprehensive preparation for all major entrance exams and admission requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title} 
                className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-scale-in border-0 bg-gradient-card"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group" asChild>
                    <Link to={service.link} className="no-underline">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;