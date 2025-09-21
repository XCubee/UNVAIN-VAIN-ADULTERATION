# Supabase Database Setup Instructions

To complete the authentication setup, you need to run the SQL scripts in your Supabase dashboard:

## Step 1: Access Supabase SQL Editor
1. Go to your Supabase project dashboard: https://cqjylrelelckdlyzjsmx.supabase.co
2. Navigate to the SQL Editor in the left sidebar

## Step 2: Run SQL Scripts in Order

### Script 1: Create Database Schema
Copy and paste the content from `/app/scripts/001_create_database_schema.sql` into the SQL Editor and run it.

### Script 2: Create Storage Bucket  
Copy and paste the content from `/app/scripts/002_create_storage_bucket.sql` into the SQL Editor and run it.

### Script 3: Create Indexes
Copy and paste the content from `/app/scripts/003_create_indexes.sql` into the SQL Editor and run it.

### Script 4: Sample Data (Optional)
Copy and paste the content from `/app/scripts/004_sample_data.sql` into the SQL Editor and run it.

### Script 5: Cleanup Policies
Copy and paste the content from `/app/scripts/005_cleanup_policies.sql` into the SQL Editor and run it.

## Step 3: Enable Authentication Providers (Optional)

If you want to enable Google OAuth:

1. Go to Authentication → Settings in your Supabase dashboard
2. Scroll to "Auth Providers"
3. Enable Google provider
4. Add your Google OAuth credentials

## Verification

After running the scripts, verify in your Supabase dashboard:
- Tables: `profiles` and `food_tests` should be visible in the Table Editor
- Storage: `food-images` bucket should be visible in the Storage section
- Authentication: Row Level Security should be enabled

## Done!

Your authentication backend is now fully set up and functional!