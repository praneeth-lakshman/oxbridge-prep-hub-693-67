-- Create payments table to track lesson purchases
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tutor_id TEXT NOT NULL, -- Using text to match profiles.id format
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'gbp',
  exam_type TEXT NOT NULL,
  lesson_quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Students can view their own payments
CREATE POLICY "students_view_own_payments" ON public.payments
  FOR SELECT
  USING (auth.uid() = student_id);

-- Tutors can view payments for their lessons
CREATE POLICY "tutors_view_their_payments" ON public.payments
  FOR SELECT
  USING ((auth.uid())::text = tutor_id);

-- Edge functions can insert and update payments
CREATE POLICY "edge_functions_insert_payments" ON public.payments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "edge_functions_update_payments" ON public.payments
  FOR UPDATE
  USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();