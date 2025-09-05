-- Update RLS policies to allow tutors to see their conversations too

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;

-- Create new policies that work for both clients and tutors
CREATE POLICY "Users can view conversations they're involved in" 
ON public.conversations 
FOR SELECT 
USING (auth.uid() = client_id OR auth.uid()::text = tutor_id);

CREATE POLICY "Users can create conversations as clients" 
ON public.conversations 
FOR INSERT 
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update conversations they're involved in" 
ON public.conversations 
FOR UPDATE 
USING (auth.uid() = client_id OR auth.uid()::text = tutor_id);

-- Update messages policies too
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.messages;

CREATE POLICY "Users can view messages in their conversations" 
ON public.messages 
FOR SELECT 
USING (conversation_id IN (
  SELECT id FROM conversations 
  WHERE (client_id = auth.uid() OR tutor_id = auth.uid()::text)
));

CREATE POLICY "Users can create messages in their conversations" 
ON public.messages 
FOR INSERT 
WITH CHECK (conversation_id IN (
  SELECT id FROM conversations 
  WHERE (client_id = auth.uid() OR tutor_id = auth.uid()::text)
));