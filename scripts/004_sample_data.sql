-- Sample data for testing (optional)
-- This script adds sample test data for demonstration purposes
-- Only run this if you want to populate the database with test data

-- Note: Replace the user_id values with actual user IDs from your auth.users table
-- You can get user IDs by running: SELECT id FROM auth.users;

-- Sample food test data
INSERT INTO public.food_tests (
  user_id,
  category,
  item_name,
  test_type,
  image_url,
  result_status,
  confidence_score,
  adulterants_detected,
  recommendations,
  created_at
) VALUES
  -- Replace 'YOUR_USER_ID_HERE' with actual user ID
  (
    'YOUR_USER_ID_HERE',
    'milk-dairy',
    'Milk',
    'visual_analysis',
    'https://example.com/sample-milk.jpg',
    'pure',
    94,
    '{}',
    'Safe for consumption; Store properly to maintain quality',
    NOW() - INTERVAL '2 days'
  ),
  (
    'YOUR_USER_ID_HERE',
    'spices',
    'Turmeric Powder',
    'visual_analysis',
    'https://example.com/sample-turmeric.jpg',
    'adulterated',
    87,
    '{"Artificial coloring", "Starch"}',
    'Avoid consumption; Consider purchasing from a different source; Report to local authorities',
    NOW() - INTERVAL '5 days'
  ),
  (
    'YOUR_USER_ID_HERE',
    'honey',
    'Raw Honey',
    'visual_analysis',
    'https://example.com/sample-honey.jpg',
    'pure',
    96,
    '{}',
    'Excellent quality product; Safe for consumption',
    NOW() - INTERVAL '1 week'
  );

-- Note: Remember to replace 'YOUR_USER_ID_HERE' with actual user IDs before running this script
