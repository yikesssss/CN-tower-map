import express from 'express'

const app = express()
const PORT = 3001

const photos = [
    { id: 1, lat: 43.6426, lng: -79.3871, caption: 'The CN Tower from below' },
    { id: 2, lat: 43.6389, lng: -79.3817, caption: 'View from the waterfront' },
    { id: 3, lat: 43.6453, lng: -79.3806, caption: 'Between the buildings' },
]

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.get('/photos', (req, res) => {
    res.json(photos)
})

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
})