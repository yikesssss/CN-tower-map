import 'dotenv/config'
import express from 'express'
import pg from 'pg'

const app = express()
app.use(express.json())
const PORT = 3001

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.get('/photos', async (req, res) => {
    const result = await pool.query(
        'SELECT id, lat, lng, caption FROM photos ORDER BY id'
    )
    res.json(result.rows)
})

app.post('/photos', async (req, res) => {
    const { lat, lng, caption } = req.body

    if (typeof lat !== 'number' || typeof lng !== 'number') {
        return res.status(400).json({ error: 'lat and lng must be numbers' })
    }

    const result = await pool.query(
        'INSERT INTO photos (lat, lng, caption) VALUES ($1, $2, $3) RETURNING id, lat, lng, caption',
        [lat, lng, caption ?? '']
    )
    res.status(201).json(result.rows[0])
})

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
})