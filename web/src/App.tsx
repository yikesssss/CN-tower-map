import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet"
import type {Photo} from './types'

const photos: Photo[] = [
  { id: 1, lat: 43.6426, lng: -79.3871, caption: 'The CN Tower from below' },
  { id: 2, lat: 43.6389, lng: -79.3817, caption: 'View from the waterfront' },
  { id: 3, lat: 43.6453, lng: -79.3806, caption: 'Between the buildings' },
]

function App() {
  return(
    <MapContainer
      center={[43.6426, -79.3871]} 
      zoom={15}
      style={{height: '100%', width: '100%'}}
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