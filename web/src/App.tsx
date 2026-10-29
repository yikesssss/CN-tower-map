import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import type { Photo } from './types'

type Position = { lat: number; lng: number }

function LocationPicker({
  onPick,
}: {
  onPick: (pos: Position) => void
}) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [picked, setPicked] = useState<Position | null>(null)
  const [caption, setCaption] = useState('')
  const [saving, setSaving] = useState(false)

  function loadPhotos() {
    fetch('/api/photos')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
  }

  async function handleSave() {
    if (!picked) return
    setSaving(true)
    await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: picked.lat, lng: picked.lng, caption }),
    })
    setSaving(false)
    setPicked(null)
    setCaption('')
    loadPhotos()
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  return (
    <>
      <MapContainer
        center={[43.6426, -79.3871]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onPick={setPicked} />
        {photos.map((photo) => (
          <Marker key={photo.id} position={[photo.lat, photo.lng]}>
            <Popup>{photo.caption}</Popup>
          </Marker>
        ))}
        {picked && (
          <Marker position={[picked.lat, picked.lng]}>
            <Popup>New photo location</Popup>
          </Marker>
        )}
      </MapContainer>

      {picked && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            background: 'white',
            padding: 12,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <input
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </>
  )
}

export default App