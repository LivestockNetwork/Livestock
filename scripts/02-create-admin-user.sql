-- MAKE A USER AN ADMIN
-- =============================================
-- Replace 'USER-UUID-HERE' with the actual user ID you want to make an admin
-- You can find this in the Supabase dashboard under Authentication > Users

-- STEP 1: Find your user ID first
-- Go to Supabase Dashboard > Authentication > Users
-- Copy the UUID of the user you want to make admin

-- STEP 2: Replace USER-UUID-HERE below with your actual user ID
SELECT auth.update_user_metadata(
  'USER-UUID-HERE',  -- Replace with actual user ID
  '{
    "app_metadata": {
      "is_admin": true
    }
  }'::jsonb
);

-- STEP 3: Verify the user is now an admin
-- This query will show the user's metadata
SELECT 
  id,
  email,
  raw_app_meta_data,
  raw_user_meta_data
FROM auth.users 
WHERE id = 'USER-UUID-HERE';  -- Replace with actual user ID
