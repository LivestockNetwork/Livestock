-- ADMIN USER SETUP
-- Run this AFTER you have created your first user account

-- Step 1: Find your user ID
-- Go to Supabase Dashboard > Authentication > Users
-- Copy the UUID of the user you want to make admin

-- Step 2: Replace 'YOUR-USER-ID-HERE' with the actual UUID and run this:
SELECT supabase_auth.update_user_metadata(
  'YOUR-USER-ID-HERE',  -- Replace with your actual user ID
  '{
    "app_metadata": {
      "is_admin": true
    }
  }'::jsonb
);

-- Step 3: Verify the admin user was created
SELECT id, email, raw_app_meta_data 
FROM auth.users 
WHERE raw_app_meta_data->>'is_admin' = 'true';
