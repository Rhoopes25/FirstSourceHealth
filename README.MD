# FirstSource Health

## App Summary
FirstSource Health is a web application designed to give parents fast, reliable medical information they can actually trust. Many parents turn to unreliable sources like social media or forums when their child is sick or they have a health concern — FirstSource Health solves this by providing content sourced directly from medical professionals. The platform features a library of expert-written health articles, a Myth vs. Fact page that debunks common medical misconceptions with verified sources, and an AI assistant trained on medical documents rather than unverified internet content. Our goal is to reduce health misinformation and give parents confidence when making decisions about their child's wellbeing. FirstSource Health is built to be simple, accessible, and trustworthy for any parent navigating the often confusing world of pediatric health.

---

## Tech Stack

**Frontend**
- React with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)

**Backend**
- Node.js
- Express.js
- pg (PostgreSQL client)
- dotenv (environment variables)
- nodemon (development server)

**Database**
- PostgreSQL 17

---

## Architecture Diagram
```
+-------------------+       HTTP Requests        +-------------------+
|                   |  ----------------------->  |                   |
|   User (Browser)  |                            |  React Frontend   |
|                   |  <-----------------------  |  (Vite + TS)      |
+-------------------+       UI Updates           +-------------------+
                                                          |
                                                          | fetch() API calls
                                                          | (http://localhost:3000)
                                                          v
                                                 +-------------------+
                                                 |  Express Backend  |
                                                 |  (Node.js)        |
                                                 |  /api/articles    |
                                                 |  /api/myths       |
                                                 +-------------------+
                                                          |
                                                          | SQL Queries
                                                          v
                                                 +-------------------+
                                                 |   PostgreSQL 17   |
                                                 |   Database        |
                                                 |   (firstsource    |
                                                 |    health)        |
                                                 +-------------------+
```

---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18+) — verify with `node -v`
- [npm](https://www.npmjs.com/) — verify with `npm -v`
- [PostgreSQL 17](https://www.postgresql.org/download/) — verify with `psql --version`

> **Mac users:** If `psql` is not found, add it to your PATH:
> ```bash
> echo 'export PATH="/Library/PostgreSQL/17/bin:$PATH"' >> ~/.zshrc
> source ~/.zshrc
> ```

---

## Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Rhoopes25/FirstSourceHealth.git
cd FirstSourceHealth
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure environment variables
In the `backend` folder, create a `.env` file:
```bash
cd ../backend
cp .env.example .env
```
Fill in your PostgreSQL credentials:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=firstsourcehealth
DB_PASSWORD=yourpassword
DB_PORT=5432
PORT=3000
```

### 5. Create the database
```bash
psql -U postgres -c "CREATE DATABASE firstsourcehealth;"
```

### 6. Run the schema and seed scripts
From the **backend** directory (so the `db/` path resolves correctly):
```bash
psql -U postgres -d firstsourcehealth -f db/schema.sql
psql -U postgres -d firstsourcehealth -f db/seed.sql
```

---

## Running the Application

You will need two terminal windows open simultaneously.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
The server will start at `http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Open your browser and go to the URL shown (typically `http://localhost:5173`)

---

## Verifying the Vertical Slice

The working feature is the **article view counter**. When a user clicks on any article card, the view count increments in the database and updates in the UI immediately.

**To verify:**

1. Start both the backend and frontend as described above
2. Navigate to the **Articles** page
3. Note the current view count on any article card (shown as an eye icon with a number)
4. Click the article card
5. The view count will increment by 1 in the UI immediately
6. Refresh the page — the updated view count persists, confirming the change was saved to the database

**To verify directly in the database:**
```bash
psql -U postgres -d firstsourcehealth -c "SELECT id, title, views FROM articles;"
```
Click an article, then run the query again — the views column will show the incremented value.