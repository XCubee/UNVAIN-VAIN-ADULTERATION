-- Create storage bucket for food images
INSERT INTO storage.buckets (id, name, public)
VALUES ('food-images', 'food-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow authenticated users to upload their own images
CREATE POLICY "Users can upload their own images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'food-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policy to allow users to view their own images
CREATE POLICY "Users can view their own images" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'food-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policy to allow users to delete their own images
CREATE POLICY "Users can delete their own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'food-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
