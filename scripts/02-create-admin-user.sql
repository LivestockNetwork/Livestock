-- MAKE A USER AN ADMIN
-- Replace 'USER-UUID-HERE' with the actual user ID you want to make an admin
-- You can find this in the Supabase dashboard under Authentication > Users

-- STEP 1: First register a user account through your app
-- STEP 2: Go to Supabase Dashboard > Authentication > Users
-- STEP 3: Copy the user ID (UUID)
-- STEP 4: Replace 'USER-UUID-HERE' below with your actual user ID
-- STEP 5: Run this script

SELECT auth.update_user_set_role('USER-UUID-HERE', 'admin');

-- Alternative method if the above doesn't work:
UPDATE auth.users 
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'),
  '{is_admin}',
  'true'
)
WHERE id = 'USER-UUID-HERE';

-- Verify the admin user was created
SELECT id, email, raw_app_meta_data 
FROM auth.users 
WHERE id = 'USER-UUID-HERE';
