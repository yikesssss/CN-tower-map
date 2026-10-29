import 'dotenv/config'
import express from 'express'
import pg from 'pg'

const app = express()
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

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
})