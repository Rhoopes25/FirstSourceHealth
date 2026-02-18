require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/index');
const app = express();

app.use(cors());
app.use(express.json());

// GET all articles
app.get('/api/articles', async(req, res) => {
    try {
        const { category, sort } = req.query;
        let query = 'SELECT * FROM articles';
        const params = [];

        if (category && category !== 'recent' && category !== 'popular' && category !== 'for_you') {
            query += ' WHERE category = $1';
            params.push(category);
        }

        if (sort === 'popular') {
            query += ' ORDER BY views DESC';
        } else {
            query += ' ORDER BY published_at DESC';
        }

        query += ' LIMIT 20';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// PUT increment article views
app.put('/api/articles/:id/view', async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE articles SET views = views + 1 WHERE id = $1 RETURNING *', [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update views' });
    }
});

// GET all myths
app.get('/api/myths', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM myths ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch myths' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});