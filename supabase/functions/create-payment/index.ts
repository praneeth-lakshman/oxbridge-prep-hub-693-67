import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

try {
  await stripe.balance.retrieve();
  logStep("API key is valid");
} catch (keyError) {
  logStep("API key test failed", keyError);
  throw new Error(`Invalid Stripe API key: ${keyError.message}`);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CONNECT-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY is not set");
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Test API key validity
    try {
      await stripe.balance.retrieve();
      logStep("API key is valid");
    } catch (keyError) {
      logStep("API key test failed", keyError);
      throw new Error(`Invalid Stripe API key: ${keyError.message}`);
    }

    // Create Supabase client
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseService.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Parse request body
    const body = await req.json();
    const { tutorId, examType, lessonQuantity = 1 } = body;
    
    if (!tutorId || !examType) {
      throw new Error("Missing required parameters: tutorId and examType");
    }

    // Get tutor data and their Stripe Connect account
    const { data: tutorProfile, error: tutorError } = await supabaseService
      .from('profiles')
      .select(`
        *,
        connected_accounts (
          stripe_account_id,
          charges_enabled,
          payouts_enabled
        )
      `)
      .eq('id', tutorId)
      .single();

    if (tutorError || !tutorProfile) {
      throw new Error("Tutor not found");
    }

    // Check if tutor has a connected Stripe account
    if (!tutorProfile.connected_accounts || tutorProfile.connected_accounts.length === 0) {
      throw new Error("Tutor has not set up their payment account yet");
    }

    const connectedAccount = tutorProfile.connected_accounts[0];
    if (!connectedAccount.charges_enabled) {
      throw new Error("Tutor's payment account is not ready to receive payments");
    }

    logStep("Connected account verified", { 
      accountId: connectedAccount.stripe_account_id,
      chargesEnabled: connectedAccount.charges_enabled 
    });

    // Get the rate for this exam type
    const examRates = tutorProfile.exam_rates || {};
    let hourlyRate = 30; // Default rate

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

    const platformFeePercent = 0.15; // 15% platform fee
    const tutorAmount = Math.round(hourlyRate * lessonQuantity * 100 * (1 - platformFeePercent));
    const platformFee = Math.round(hourlyRate * lessonQuantity * 100 * platformFeePercent);
    const totalAmount = tutorAmount + platformFee;

    logStep("Payment calculation", { 
      hourlyRate, 
      lessonQuantity, 
      tutorAmount, 
      platformFee, 
      totalAmount 
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create Connect checkout session
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
            unit_amount: hourlyRate * 100,
          },
          quantity: lessonQuantity,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/team#${examType}`,
      
      // STRIPE CONNECT CONFIGURATION
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: connectedAccount.stripe_account_id,
        },
        metadata: {
          tutorId,
          examType,
          lessonQuantity: lessonQuantity.toString(),
          platform_fee: platformFee.toString(),
        },
      },
      
      metadata: {
        tutorId,
        examType,
        lessonQuantity: lessonQuantity.toString(),
        connected_account_id: connectedAccount.stripe_account_id,
      },
    });

    logStep("Connect checkout session created", { sessionId: session.id });

    // Store payment record
    const { error: paymentError } = await supabaseService
      .from('payments')
      .insert({
        student_id: user.id,
        tutor_id: tutorId,
        stripe_session_id: session.id,
        connected_account_id: connectedAccount.stripe_account_id,
        amount: totalAmount,
        platform_fee: platformFee,
        tutor_amount: tutorAmount,
        currency: 'gbp',
        exam_type: examType,
        lesson_quantity: lessonQuantity,
        status: 'pending'
      });

    if (paymentError) {
      throw new Error(`Failed to create payment record: ${paymentError.message}`);
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-connect-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});