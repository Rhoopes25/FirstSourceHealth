/*
  # FirstSource Health Database Schema

  ## Overview
  Creates the core database structure for FirstSource Health, a health guidance platform for parents.

  ## New Tables
  
  ### 1. `user_profiles`
  Stores extended user profile information beyond authentication.
  - `id` (uuid, primary key) - References auth.users
  - `full_name` (text) - User's full name
  - `children_ages` (text[]) - Array of children's ages for personalization
  - `interests` (text[]) - Health topics of interest
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `articles`
  Health articles repository with categorization.
  - `id` (uuid, primary key) - Unique article identifier
  - `title` (text) - Article title
  - `excerpt` (text) - Brief summary/preview
  - `content` (text) - Full article content
  - `category` (text) - Article category (pediatric_care, nutrition, safety, etc.)
  - `tags` (text[]) - Search and filtering tags
  - `author` (text) - Article author name
  - `read_time` (integer) - Estimated reading time in minutes
  - `views` (integer) - View count for popularity tracking
  - `image_url` (text) - Article thumbnail/header image
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `chat_history`
  Stores DocGPT conversation history for users.
  - `id` (uuid, primary key) - Unique chat message identifier
  - `user_id` (uuid, foreign key) - References user_profiles
  - `message` (text) - Message content
  - `is_user` (boolean) - True if user message, false if AI response
  - `session_id` (uuid) - Groups messages into conversation sessions
  - `created_at` (timestamptz) - Message timestamp

  ### 4. `user_article_interactions`
  Tracks user engagement with articles for personalization.
  - `id` (uuid, primary key) - Unique interaction identifier
  - `user_id` (uuid, foreign key) - References user_profiles
  - `article_id` (uuid, foreign key) - References articles
  - `viewed` (boolean) - Article was viewed
  - `bookmarked` (boolean) - Article was bookmarked
  - `created_at` (timestamptz) - Interaction timestamp

  ## Security
  - RLS enabled on all tables
  - Users can only access their own profile data and chat history
  - Articles are publicly readable
  - Only authenticated users can create chat history and interactions
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  children_ages text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  author text NOT NULL,
  read_time integer DEFAULT 5,
  views integer DEFAULT 0,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_user boolean NOT NULL,
  session_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history"
  ON chat_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create user_article_interactions table
CREATE TABLE IF NOT EXISTS user_article_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  viewed boolean DEFAULT false,
  bookmarked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

ALTER TABLE user_article_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interactions"
  ON user_article_interactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions"
  ON user_article_interactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interactions"
  ON user_article_interactions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_session ON chat_history(user_id, session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_user_interactions ON user_article_interactions(user_id, article_id);

-- Insert sample articles
INSERT INTO articles (title, excerpt, content, category, tags, author, read_time, views, image_url) VALUES
  (
    'Understanding Your Newborn''s Sleep Patterns',
    'Learn about normal sleep patterns in newborns and how to establish healthy sleep habits from the start.',
    'Newborns typically sleep 14-17 hours per day in short bursts. Understanding these patterns can help parents set realistic expectations...',
    'pediatric_care',
    ARRAY['sleep', 'newborn', 'infant care'],
    'Dr. Sarah Mitchell',
    8,
    1250,
    'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg'
  ),
  (
    'First Aid Essentials for Parents',
    'A comprehensive guide to handling common childhood injuries and emergencies at home.',
    'Every parent should know basic first aid. This guide covers everything from minor cuts to recognizing serious symptoms...',
    'safety',
    ARRAY['first aid', 'safety', 'emergency'],
    'Dr. Michael Chen',
    12,
    2100,
    'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
  ),
  (
    'Introducing Solid Foods: A Step-by-Step Guide',
    'When and how to start your baby on solid foods, including tips for preventing allergies.',
    'Starting solid foods is an exciting milestone. Most babies are ready between 4-6 months when they show signs of readiness...',
    'nutrition',
    ARRAY['nutrition', 'baby food', 'weaning'],
    'Dr. Emily Rodriguez',
    10,
    1800,
    'https://images.pexels.com/photos/6393342/pexels-photo-6393342.jpeg'
  ),
  (
    'Recognizing Signs of Dehydration in Children',
    'Learn the warning signs of dehydration and when to seek medical attention.',
    'Dehydration can occur quickly in children. Key signs include decreased urination, dry mouth, lethargy, and sunken eyes...',
    'pediatric_care',
    ARRAY['hydration', 'symptoms', 'health'],
    'Dr. James Wilson',
    6,
    950,
    'https://images.pexels.com/photos/6942025/pexels-photo-6942025.jpeg'
  ),
  (
    'Vaccine Schedule: What Parents Need to Know',
    'A complete guide to recommended childhood vaccinations and their importance.',
    'Vaccines protect children from serious diseases. This comprehensive guide covers the CDC-recommended schedule...',
    'pediatric_care',
    ARRAY['vaccines', 'immunization', 'preventive care'],
    'Dr. Sarah Mitchell',
    15,
    3200,
    'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg'
  ),
  (
    'Managing Common Childhood Fevers',
    'When to worry about a fever and effective ways to keep your child comfortable.',
    'Fevers are common in childhood and usually not dangerous. Learn when to monitor at home versus seeking medical care...',
    'pediatric_care',
    ARRAY['fever', 'symptoms', 'illness'],
    'Dr. Michael Chen',
    7,
    1600,
    'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg'
  ),
  (
    'Building Strong Immunity Through Nutrition',
    'Foods and nutrients that support your child''s immune system.',
    'A balanced diet rich in vitamins and minerals helps children fight off infections. Focus on colorful fruits and vegetables...',
    'nutrition',
    ARRAY['immune system', 'nutrition', 'healthy eating'],
    'Dr. Emily Rodriguez',
    9,
    1400,
    'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg'
  ),
  (
    'Screen Time Guidelines for Different Ages',
    'Evidence-based recommendations for managing screen time from infancy through adolescence.',
    'The American Academy of Pediatrics provides clear guidelines for screen time. For children under 18 months, avoid screens...',
    'development',
    ARRAY['screen time', 'development', 'technology'],
    'Dr. James Wilson',
    11,
    2800,
    'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg'
  )
ON CONFLICT DO NOTHING;
