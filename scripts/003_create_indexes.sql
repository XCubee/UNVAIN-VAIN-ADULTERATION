-- Additional indexes for better performance

-- Index for faster user profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles(full_name);

-- Composite index for food tests filtering
CREATE INDEX IF NOT EXISTS idx_food_tests_user_category ON public.food_tests(user_id, category);
CREATE INDEX IF NOT EXISTS idx_food_tests_user_status ON public.food_tests(user_id, result_status);

-- Index for date range queries
CREATE INDEX IF NOT EXISTS idx_food_tests_user_date ON public.food_tests(user_id, created_at DESC);

-- Index for search functionality
CREATE INDEX IF NOT EXISTS idx_food_tests_item_name ON public.food_tests(item_name);

-- Partial index for recent tests (last 30 days)
CREATE INDEX IF NOT EXISTS idx_food_tests_recent ON public.food_tests(user_id, created_at) 
WHERE created_at > NOW() - INTERVAL '30 days';
