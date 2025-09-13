-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_tests table to store test results
CREATE TABLE IF NOT EXISTS public.food_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  test_type TEXT NOT NULL,
  image_url TEXT,
  result_status TEXT NOT NULL CHECK (result_status IN ('pure', 'adulterated', 'inconclusive')),
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  adulterants_detected TEXT[],
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_tests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for food_tests
CREATE POLICY "food_tests_select_own" ON public.food_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "food_tests_insert_own" ON public.food_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "food_tests_update_own" ON public.food_tests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "food_tests_delete_own" ON public.food_tests
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_food_tests_user_id ON public.food_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_food_tests_created_at ON public.food_tests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_food_tests_category ON public.food_tests(category);
