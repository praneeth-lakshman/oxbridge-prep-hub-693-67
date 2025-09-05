-- Enable leaked password protection
UPDATE auth.config 
SET password_requirements = '{"enable_sign_up": true, "enable_confirmed_email": true, "password_strength": "strong", "leaked_password_protection": true}';