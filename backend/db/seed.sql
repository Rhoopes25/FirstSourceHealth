-- Articles
INSERT INTO articles (title, excerpt, author, read_time, views, image_url, published_at, category, tags) VALUES
(
  'Understanding Your Child''s First Year',
  'A comprehensive guide to the developmental milestones in your baby''s first 12 months.',
  'Dr. Sarah Johnson',
  5, 1200,
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800',
  NOW(), 'pediatric_care', ARRAY['newborn', 'development', 'milestones']
),
(
  'Nutrition Tips for Growing Kids',
  'Learn how to build healthy eating habits that will last a lifetime for your children.',
  'Dr. Michael Chen',
  4, 980,
  'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800',
  NOW() - INTERVAL '2 days', 'nutrition', ARRAY['nutrition', 'kids', 'healthy eating']
),
(
  'When to Call the Pediatrician',
  'Know the signs and symptoms that warrant an immediate call to your child''s doctor.',
  'Dr. Emily Rodriguez',
  6, 1500,
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
  NOW() - INTERVAL '4 days', 'pediatric_care', ARRAY['health', 'pediatric', 'emergency']
),
(
  'Sleep Training Methods Explained',
  'An honest breakdown of the most popular sleep training approaches for infants.',
  'Dr. Lisa Park',
  7, 2100,
  'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800',
  NOW() - INTERVAL '6 days', 'sleep', ARRAY['sleep', 'newborn', 'parenting']
);

-- Users
INSERT INTO users (email, password) VALUES
('sarah@example.com', 'hashed_password_1'),
('james@example.com', 'hashed_password_2'),
('emma@example.com', 'hashed_password_3');

-- User Profiles
INSERT INTO user_profiles (user_id, full_name, children_ages, interests) VALUES
(1, 'Sarah Mitchell', ARRAY[2, 5], ARRAY['nutrition', 'sleep', 'development']),
(2, 'James Carter', ARRAY[1], ARRAY['pediatric_care', 'milestones']),
(3, 'Emma Thompson', ARRAY[3, 7, 10], ARRAY['nutrition', 'pediatric_care']);

-- Bookmarks
INSERT INTO bookmarks (user_id, article_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 4);

-- Myths
INSERT INTO myths (myth, fact, category, source) VALUES
(
  'Feed a cold, starve a fever.',
  'Your body needs nutrients and hydration whether you have a cold or fever. Eating and drinking fluids helps recovery either way.',
  'general',
  'Mayo Clinic'
),
(
  'Vaccines cause autism.',
  'Extensive research involving millions of children has found no link between vaccines and autism. The original study claiming this was retracted due to fraud.',
  'vaccines',
  'CDC'
),
(
  'You should wait 30 minutes after eating before swimming.',
  'There is no medical evidence that swimming after eating causes cramps or drowning. Light activity after meals is generally fine.',
  'general',
  'American Red Cross'
),
(
  'Antibiotics can treat the flu.',
  'The flu is caused by a virus, and antibiotics only work against bacteria. Taking antibiotics unnecessarily contributes to antibiotic resistance.',
  'medication',
  'WHO'
),
(
  'Kids will outgrow their allergies.',
  'While some children do outgrow certain allergies like milk or egg, others such as peanut or tree nut allergies tend to be lifelong.',
  'allergies',
  'American Academy of Allergy, Asthma & Immunology'
);