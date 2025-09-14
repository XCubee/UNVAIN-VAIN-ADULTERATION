# Purity Lens - Food Purity Detection App

Purity Lens is a comprehensive web application that uses AI to analyze photos of food items to detect adulteration and ensure food purity. Built with Next.js, Supabase, and modern web technologies.

## Features

- **User Authentication**: Secure login/signup with email and password
- **Food Categories**: Organized testing for different food types (dairy, pulses, spices, honey, vegetables, meat)
- **AI-Powered Analysis**: Upload photos for intelligent food purity detection
- **Real-time Results**: Get instant analysis with confidence scores and recommendations
- **Test History**: Track all your food tests with detailed reports
- **User Profiles**: Manage personal information and preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage for image uploads
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd purity-lens-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API to get your project URL and anon key
   - The following environment variables should already be configured in your v0 project:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **Run database migrations**
   Execute the SQL scripts in the `scripts/` folder in your Supabase SQL editor in this order:
   
   a. **001_create_database_schema.sql** - Creates the main database tables and RLS policies
   b. **002_create_storage_bucket.sql** - Sets up image storage bucket and policies

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Supabase Setup Instructions

### Step 1: Database Schema Setup

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `scripts/001_create_database_schema.sql`
4. Click "Run" to execute the script

This will create:
- `profiles` table for user information
- `food_tests` table for storing test results
- Row Level Security (RLS) policies
- Automatic profile creation trigger

### Step 2: Storage Setup

1. In the SQL Editor, copy and paste the contents of `scripts/002_create_storage_bucket.sql`
2. Click "Run" to execute the script

This will create:
- `food-images` storage bucket
- Storage policies for secure image uploads

### Step 3: Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure the following settings:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/home` 
3. Enable email authentication (should be enabled by default)

### Step 4: Storage Configuration

1. Go to Storage in your Supabase dashboard
2. Verify that the `food-images` bucket was created
3. The bucket should be public with the policies we created

## Database Schema

### Tables

#### `profiles`
- `id` (UUID, Primary Key) - References auth.users(id)
- `full_name` (TEXT) - User's full name
- `phone` (TEXT) - User's phone number
- `created_at` (TIMESTAMP) - Account creation time
- `updated_at` (TIMESTAMP) - Last profile update

#### `food_tests`
- `id` (UUID, Primary Key) - Unique test identifier
- `user_id` (UUID, Foreign Key) - References auth.users(id)
- `category` (TEXT) - Food category (milk-dairy, pulses, etc.)
- `item_name` (TEXT) - Specific food item name
- `test_type` (TEXT) - Type of test performed
- `image_url` (TEXT) - URL of uploaded image
- `result_status` (TEXT) - Test result (pure, adulterated, inconclusive)
- `confidence_score` (INTEGER) - AI confidence percentage (0-100)
- `adulterants_detected` (TEXT[]) - Array of detected adulterants
- `recommendations` (TEXT) - Analysis recommendations
- `created_at` (TIMESTAMP) - Test creation time

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Profile Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Food Tests
- `GET /api/tests` - Get user's test history
- `POST /api/tests` - Create new test result
- `GET /api/tests/stats` - Get user's test statistics

### Image Processing
- `POST /api/upload` - Upload food image
- `POST /api/analyze` - Analyze uploaded image

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── category/          # Food category pages
│   ├── history/           # Test history pages
│   ├── home/              # Home dashboard
│   ├── profile/           # User profile pages
│   ├── test/              # Testing instruction pages
│   ├── upload/            # Photo upload pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility libraries
│   └── supabase/         # Supabase client configuration
├── scripts/               # Database migration scripts
└── middleware.ts          # Next.js middleware for auth
\`\`\`

## Security Features

- **Row Level Security (RLS)**: All database tables use RLS to ensure users can only access their own data
- **Authentication Middleware**: Protects routes that require authentication
- **Secure File Uploads**: Images are stored securely with user-specific access policies
- **Input Validation**: All API endpoints validate input data

## Development Notes

### AI Analysis
The current implementation uses simulated AI analysis for demonstration purposes. In production, you would integrate with actual AI services like:
- Google Vision API
- AWS Rekognition
- Custom ML models
- Specialized food analysis APIs

### Image Storage
Images are stored in Supabase Storage with automatic cleanup policies. Consider implementing:
- Image compression before upload
- Automatic deletion of old images
- CDN integration for better performance

### Performance Optimizations
- Images are optimized using Next.js Image component
- Database queries use proper indexing
- API responses are cached where appropriate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation above
- Review the code comments
- Open an issue in the repository
