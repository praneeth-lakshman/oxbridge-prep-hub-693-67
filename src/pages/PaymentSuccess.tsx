import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Get payment details from database
        const { data: payment, error } = await supabase
          .from('payments')
          .select(`
            *,
            tutor:profiles!payments_tutor_id_fkey (
              name,
              university,
              degree
            )
          `)
          .eq('stripe_session_id', sessionId)
          .single();

        if (error) {
          console.error('Error fetching payment:', error);
          return;
        }

        setPaymentData(payment);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sessionId || !paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <h1 className="text-xl font-bold text-foreground mb-4">Payment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find your payment details. Please check your email for confirmation.
            </p>
            <Button asChild>
              <Link to="/team">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tutors
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { tutor } = paymentData;
  const totalAmount = (paymentData.amount / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your lesson booking has been confirmed
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Tutor</h3>
                <p className="text-muted-foreground">{tutor?.name || 'Tutor'}</p>
                <p className="text-sm text-muted-foreground">
                  {tutor?.degree} Student at {tutor?.university}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Lesson Details</h3>
                <p className="text-muted-foreground">
                  {paymentData.exam_type.toUpperCase()} Tutoring
                </p>
                <p className="text-sm text-muted-foreground">
                  {paymentData.lesson_quantity} lesson{paymentData.lesson_quantity > 1 ? 's' : ''} • £{totalAmount}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Your tutor will contact you within 24 hours to schedule your lessons</li>
                <li>• You'll receive a confirmation email with all the details</li>
                <li>• Use the chat feature below to communicate with your tutor</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to={`/chat/${paymentData.tutor_id}`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Your Tutor
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tutors
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-primary hover:text-primary-foreground">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;