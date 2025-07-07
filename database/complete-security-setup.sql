-- EMERGENCY RESPONSE APP - COMPLETE DATABASE SECURITY SETUP
-- Execute this entire script in your Supabase SQL Editor

-- =============================================
-- SECTION 1: EMERGENCY ALERTS POLICIES
-- =============================================

-- Policy for viewing alerts (anyone can view active alerts)
DROP POLICY IF EXISTS "Anyone can view active emergency alerts" ON emergency_alerts;
CREATE POLICY "Anyone can view active emergency alerts"
ON emergency_alerts FOR SELECT
USING (active = true);

-- Policy for creating alerts (only authenticated users with admin role can create)
DROP POLICY IF EXISTS "Only admins can create emergency alerts" ON emergency_alerts;
CREATE POLICY "Only admins can create emergency alerts"
ON emergency_alerts FOR INSERT
WITH CHECK ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin');

-- Policy for updating alerts (only admins can update)
DROP POLICY IF EXISTS "Only admins can update emergency alerts" ON emergency_alerts;
CREATE POLICY "Only admins can update emergency alerts"
ON emergency_alerts FOR UPDATE 
USING ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin') 
WITH CHECK ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin');

-- Policy for deleting alerts (only admins can delete)
DROP POLICY IF EXISTS "Only admins can delete emergency alerts" ON emergency_alerts;
CREATE POLICY "Only admins can delete emergency alerts"
ON emergency_alerts FOR DELETE 
USING ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin');

-- =============================================
-- SECTION 2: EMERGENCY PLANS POLICIES
-- =============================================

-- Policy for viewing emergency plans (users can only see their own)
DROP POLICY IF EXISTS "Users can view their own emergency plans" ON emergency_plans;
CREATE POLICY "Users can view their own emergency plans"
ON emergency_plans FOR SELECT
USING (user_id = (select auth.uid()));

-- Policy for creating emergency plans (users can only create for themselves)
DROP POLICY IF EXISTS "Users can create their own emergency plans" ON emergency_plans;
CREATE POLICY "Users can create their own emergency plans"
ON emergency_plans FOR INSERT
WITH CHECK (user_id = (select auth.uid()));

-- Policy for updating emergency plans (users can only update their own)
DROP POLICY IF EXISTS "Users can update their own emergency plans" ON emergency_plans;
CREATE POLICY "Users can update their own emergency plans"
ON emergency_plans FOR UPDATE 
USING (user_id = (select auth.uid())) 
WITH CHECK (user_id = (select auth.uid()));

-- Policy for deleting emergency plans (users can only delete their own)
DROP POLICY IF EXISTS "Users can delete their own emergency plans" ON emergency_plans;
CREATE POLICY "Users can delete their own emergency plans"
ON emergency_plans FOR DELETE 
USING (user_id = (select auth.uid()));

-- =============================================
-- SECTION 3: COMMUNITY POSTS POLICIES
-- =============================================

-- Policy for viewing community posts (anyone can view all posts)
DROP POLICY IF EXISTS "Anyone can view community posts" ON community_posts;
CREATE POLICY "Anyone can view community posts"
ON community_posts FOR SELECT
USING (true);

-- Policy for creating community posts (authenticated users can create)
DROP POLICY IF EXISTS "Authenticated users can create community posts" ON community_posts;
CREATE POLICY "Authenticated users can create community posts"
ON community_posts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Policy for updating community posts (users can only update their own)
DROP POLICY IF EXISTS "Users can update their own community posts" ON community_posts;
CREATE POLICY "Users can update their own community posts"
ON community_posts FOR UPDATE 
USING (user_id = (select auth.uid())) 
WITH CHECK (user_id = (select auth.uid()));

-- Policy for deleting community posts (users can only delete their own, admins can delete any)
DROP POLICY IF EXISTS "Users can delete their own community posts" ON community_posts;
CREATE POLICY "Users can delete their own community posts"
ON community_posts FOR DELETE 
USING (user_id = (select auth.uid()) OR ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin'));

-- =============================================
-- SECTION 4: USER PROFILES POLICIES
-- =============================================

-- Policy for viewing user profiles (users can see their own, admins can see all)
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
ON user_profiles FOR SELECT
USING (id = (select auth.uid()) OR ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin'));

-- Policy for creating user profiles (users can only create their own)
DROP POLICY IF EXISTS "Users can create their own profile" ON user_profiles;
CREATE POLICY "Users can create their own profile"
ON user_profiles FOR INSERT
WITH CHECK (id = (select auth.uid()));

-- Policy for updating user profiles (users can only update their own)
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
ON user_profiles FOR UPDATE 
USING (id = (select auth.uid())) 
WITH CHECK (id = (select auth.uid()));

-- Policy for deleting user profiles (users can only delete their own, admins can delete any)
DROP POLICY IF EXISTS "Users can delete their own profile" ON user_profiles;
CREATE POLICY "Users can delete their own profile"
ON user_profiles FOR DELETE 
USING (id = (select auth.uid()) OR ((auth.jwt() ->> 'app_metadata')::jsonb ? 'is_admin'));

-- =============================================
-- SECTION 5: PERFORMANCE INDEXES
-- =============================================

-- Create indexes for foreign keys to improve performance
CREATE INDEX IF NOT EXISTS idx_emergency_plans_user_id ON emergency_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);

-- =============================================
-- SECTION 6: MAKE A USER AN ADMIN
-- =============================================

-- Replace 'USER-UUID-HERE' with the actual user ID you want to make an admin
-- You can find this in the Supabase dashboard under Authentication > Users
-- UNCOMMENT AND MODIFY THE LINE BELOW WHEN READY:

-- SELECT supabase_auth.update_user_metadata(
--   'USER-UUID-HERE',  -- Replace with actual user ID
--   '{
--     "app_metadata": {
--       "is_admin": true
--     }
--   }'::jsonb
-- );
