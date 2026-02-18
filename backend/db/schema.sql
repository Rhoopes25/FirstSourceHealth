CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  author VARCHAR(100),
  read_time INT,
  views INT DEFAULT 0,
  image_url TEXT,
  published_at TIMESTAMP DEFAULT NOW(),
  category VARCHAR(50),
  tags TEXT[]
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  children_ages INT[],
  interests TEXT[]
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  article_id INT REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS myths (
  id SERIAL PRIMARY KEY,
  myth TEXT NOT NULL,
  fact TEXT NOT NULL,
  category VARCHAR(50),
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);