# Livestock Emergency System - Complete Setup Guide

## Step 1: Fix Environment Variables

### Create .env.local file
Create a file named `.env.local` (with a dot at the beginning) in your project root directory:

\`\`\`
# .env.local file (place in project root, NOT in a subdirectory)
NEXT_PUBLIC_SUPABASE_URL=https://tkybamlkjbrgugzeqfxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
\`\`\`

### Get your Supabase keys:
1. Go to https://supabase.com/dashboard
2. Select your project (tkybamlkjbrgugzeqfxw)
3. Go to **Project Settings > API**
4. Copy the **"anon public"** key (starts with "eyJh...")
5. Copy the **"service_role"** key (starts with "eyJh...")
6. Replace the placeholder values in your .env.local file

## Step 2: Database Security Setup

1. **Copy the SQL script** from `scripts/01-complete-security-setup.sql`
2. **Open Supabase Dashboard** → SQL Editor
3. **Paste and run the script** - this sets up all Row Level Security policies
4. **Verify setup** - the script includes verification queries at the end

## Step 3: Create Admin User

1. **Register your first user** through the app at `/working-auth`
2. **Go to Supabase Dashboard** → Authentication → Users
3. **Copy your user ID** (the UUID)
4. **Edit the script** `scripts/02-create-admin-user.sql` and replace `USER-UUID-HERE` with your actual user ID
5. **Run the admin script** in Supabase SQL Editor

## Step 4: Test the System

1. **Test authentication** at `/working-auth`
2. **Access admin panel** at `/admin` (only works if you're an admin)
3. **Create emergency alerts** through the admin dashboard
4. **Test user permissions** - regular users should only see their own data

## Step 5: Deploy

1. **Add environment variables** to your deployment:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Deploy the application** using the Deploy button in v0

## Common Issues & Solutions

### "Load failed" error
- **Cause**: Missing or incorrect environment variables
- **Fix**: Ensure .env.local is in project root with correct Supabase keys

### Can't access admin panel
- **Cause**: User is not marked as admin
- **Fix**: Run the admin setup SQL script with your user ID

### Database connection issues
- **Cause**: Incorrect Supabase URL or keys
- **Fix**: Double-check your environment variables match your Supabase project

### Build errors
- **Cause**: Missing dependencies or TypeScript errors
- **Fix**: All files are now provided with complete implementations

## Features Included

- ✅ **User Authentication** with Supabase Auth
- ✅ **Row Level Security** - users can only access their own data
- ✅ **Admin Dashboard** - create and manage emergency alerts
- ✅ **Emergency Plans** - users can create personal emergency plans
- ✅ **Community Posts** - users can share information
- ✅ **Mobile Responsive** - works on all devices

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Admin-only access** for emergency alert management
- **User-specific data** - users can only see/edit their own records
- **Secure authentication** with Supabase Auth

Your livestock emergency planning system is now fully functional and secure! 🚀
