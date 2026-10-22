import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Photo } from './types'

function App() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetch('/api/photos')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
  }, [])

  return (
    <MapContainer
      center={[43.6426, -79.3871]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {photos.map((photo) => (
        <Marker key={photo.id} position={[photo.lat, photo.lng]}>
          <Popup>{photo.caption}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default App