-- Remove the single hourly_rate column and add exam_rates as JSONB
ALTER TABLE public.profiles DROP COLUMN IF EXISTS hourly_rate;

-- Add exam_rates column to store rates per exam type
ALTER TABLE public.profiles ADD COLUMN exam_rates JSONB DEFAULT '{}';

-- Update existing profiles with default rates structure
UPDATE public.profiles 
SET exam_rates = '{"TMUA": 30, "MAT": 30, "ESAT": 30, "interview-prep": 35}'
WHERE user_type = 'tutor' AND exam_rates = '{}';

-- Add a comment to document the structure
COMMENT ON COLUMN public.profiles.exam_rates IS 'JSON object storing hourly rates per exam type, e.g. {"TMUA": 30, "MAT": 35, "ESAT": 40, "interview-prep": 45}';