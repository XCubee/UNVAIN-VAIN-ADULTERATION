-- Additional cleanup and maintenance policies

-- Function to clean up old test images (older than 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_images()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete food test records older than 1 year
  DELETE FROM public.food_tests 
  WHERE created_at < NOW() - INTERVAL '1 year';
  
  -- Note: In production, you'd also want to delete the corresponding images from storage
  -- This would require a more complex function that interacts with Supabase Storage
END;
$$;

-- Create a function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE(
  total_tests BIGINT,
  pure_tests BIGINT,
  adulterated_tests BIGINT,
  recent_tests BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_tests,
    COUNT(*) FILTER (WHERE result_status = 'pure') as pure_tests,
    COUNT(*) FILTER (WHERE result_status = 'adulterated') as adulterated_tests,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as recent_tests
  FROM public.food_tests 
  WHERE user_id = user_uuid;
END;
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
