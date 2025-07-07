-- LIVESTOCK EMERGENCY PLANNING SYSTEM SCHEMA
-- Fixed version with correct column references

-- Create user profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    property_name TEXT,
    property_address TEXT,
    property_size_hectares DECIMAL,
    primary_livestock_type TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestock table
CREATE TABLE IF NOT EXISTS public.livestock (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    animal_type TEXT NOT NULL,
    breed TEXT,
    count INTEGER NOT NULL DEFAULT 1,
    age_group TEXT,
    location_paddock TEXT,
    special_needs TEXT,
    identification_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency plans table
CREATE TABLE IF NOT EXISTS public.emergency_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_type TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    trigger_conditions TEXT,
    evacuation_routes TEXT,
    safe_zones TEXT,
    livestock_actions TEXT,
    equipment_needed TEXT,
    contact_list TEXT,
    last_reviewed DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community groups table
CREATE TABLE IF NOT EXISTS public.community_groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    group_type TEXT,
    admin_user_id UUID REFERENCES auth.users(id),
    member_count INTEGER DEFAULT 0,
    public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group memberships table
CREATE TABLE IF NOT EXISTS public.group_memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.community_groups(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, group_id)
);

-- Create community posts table
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.community_groups(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    post_type TEXT DEFAULT 'general',
    urgent BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency alerts table
CREATE TABLE IF NOT EXISTS public.emergency_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    affected_areas TEXT[],
    issued_by UUID REFERENCES auth.users(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resource sharing table
CREATE TABLE IF NOT EXISTS public.resource_sharing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL,
    resource_name TEXT NOT NULL,
    description TEXT,
    availability_type TEXT NOT NULL,
    location TEXT,
    contact_method TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create help requests table
CREATE TABLE IF NOT EXISTS public.help_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    help_type TEXT NOT NULL,
    urgency TEXT NOT NULL,
    location TEXT,
    contact_phone TEXT,
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_sharing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage their own livestock" ON public.livestock
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own emergency plans" ON public.emergency_plans
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public groups" ON public.community_groups
    FOR SELECT USING (public = true);

CREATE POLICY "Users can view group memberships" ON public.group_memberships
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own memberships" ON public.group_memberships
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view community posts" ON public.community_posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create community posts" ON public.community_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view active emergency alerts" ON public.emergency_alerts
    FOR SELECT USING (active = true);

CREATE POLICY "Anyone can view available resources" ON public.resource_sharing
    FOR SELECT USING (available = true);

CREATE POLICY "Users can manage their own resources" ON public.resource_sharing
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view unresolved help requests" ON public.help_requests
    FOR SELECT USING (resolved = false);

CREATE POLICY "Users can manage their own help requests" ON public.help_requests
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_livestock_user_id ON public.livestock(user_id);
CREATE INDEX IF NOT EXISTS idx_emergency_plans_user_id ON public.emergency_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_group_id ON public.community_posts(group_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_user_id ON public.group_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_group_id ON public.group_memberships(group_id);

-- Insert sample community groups
INSERT INTO public.community_groups (name, description, location, group_type, public) VALUES
('Manning Valley Farmers', 'Local farming community in the Manning Valley region', 'Manning Valley, NSW', 'regional', true),
('Cattle Breeders Network', 'Network for cattle breeders across Australia', 'Australia-wide', 'breed-specific', true),
('Emergency Response Team', 'Rapid response team for livestock emergencies', 'Regional', 'emergency', true);
