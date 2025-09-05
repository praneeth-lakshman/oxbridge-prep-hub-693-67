import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    console.log("Full request details:", {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
      url: req.url
    });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY is not set");
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified");

    // Create Supabase client with service role key for database writes
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header provided");
      throw new Error("No authorization header provided - user must be logged in");
    }
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseService.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const body = await req.json();
    logStep("Raw request body", body);
    const { tutorId, examType, lessonQuantity = 1 } = body;
    
    if (!tutorId || !examType) {
      logStep("ERROR: Missing required parameters", { tutorId, examType });
      throw new Error("Missing required parameters: tutorId and examType");
    }
    logStep("Request data parsed", { tutorId, examType, lessonQuantity });

    // Get tutor data and rates
    const { data: tutorProfile, error: tutorError } = await supabaseService
      .from('profiles')
      .select('*')
      .eq('id', tutorId)
      .single();

    if (tutorError || !tutorProfile) {
      throw new Error("Tutor not found");
    }
    logStep("Tutor profile found", { tutorName: tutorProfile.name });

    // Get the rate for this exam type
    const examRates = tutorProfile.exam_rates || {};
    let hourlyRate = 30; // Default rate

    // Map exam type to rate key
    const examKeyMap: { [key: string]: string } = {
      'tmua': 'TMUA',
      'mat': 'MAT',
      'esat': 'ESAT',
      'interview-prep': 'Interview prep'
    };

    const rateKey = examKeyMap[examType] || examType.toUpperCase();
    if (examRates[rateKey]) {
      hourlyRate = examRates[rateKey];
    }
    logStep("Rate determined", { examType, rateKey, hourlyRate });

    const totalAmount = hourlyRate * lessonQuantity * 100; // Convert to pence
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer found");
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${examType.toUpperCase()} Tutoring with ${tutorProfile.name}`,
              description: `${lessonQuantity} lesson${lessonQuantity > 1 ? 's' : ''} - £${hourlyRate}/hour`,
            },
            unit_amount: hourlyRate * 100, // Convert to pence
          },
          quantity: lessonQuantity,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/team#${examType}`,
      metadata: {
        tutorId,
        examType,
        lessonQuantity: lessonQuantity.toString(),
      },
    });
    logStep("Checkout session created", { sessionId: session.id });

    // Store payment record in database
    const { error: paymentError } = await supabaseService
      .from('payments')
      .insert({
        student_id: user.id,
        tutor_id: tutorId,
        stripe_session_id: session.id,
        amount: totalAmount,
        currency: 'gbp',
        exam_type: examType,
        lesson_quantity: lessonQuantity,
        status: 'pending'
      });

    if (paymentError) {
      logStep("Payment record creation failed", { error: paymentError });
      throw new Error(`Failed to create payment record: ${paymentError.message}`);
    }
    logStep("Payment record created successfully");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});