-- Insert Vincent's tutor profile manually since it wasn't created during signup
INSERT INTO profiles (id, email, name, university, degree, year, subjects, hourly_rate, user_type, created_at, updated_at)
VALUES (
  'ff3eda61-cccc-455c-b2b0-97391db52514',
  'vincentuk22@gmail.com',
  'Vincent',
  'University of Cambridge',
  'Mathematics',
  '2nd Year',
  '["TMUA", "MAT", "ESAT", "Exam prep"]'::jsonb,
  30,
  'tutor',
  now(),
  now()
);