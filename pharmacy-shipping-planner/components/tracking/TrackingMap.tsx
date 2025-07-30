'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface TrackingMapProps {
  shipments: Array<{
    id: string
    fromLat?: number
    fromLng?: number
    toLat?: number
    toLng?: number
    patient: { firstName: string; lastName: string }
    status: string
  }>
}

export function TrackingMap({ shipments }: TrackingMapProps) {
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of US
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipments.map((shipment) => {
          if (!shipment.fromLat || !shipment.toLat) return null
          
          return (
            <div key={shipment.id}>
              <Marker position={[shipment.fromLat, shipment.fromLng!]}>
                <Popup>
                  <div>
                    <h3 className="font-semibold">Origin</h3>
                    <p>Pharmacy Location</p>
                  </div>
                </Popup>
              </Marker>
              
              <Marker position={[shipment.toLat, shipment.toLng!]}>
                <Popup>
                  <div>
                    <h3 className="font-semibold">Destination</h3>
                    <p>{shipment.patient.firstName} {shipment.patient.lastName}</p>
                    <p>Status: {shipment.status}</p>
                  </div>
                </Popup>
              </Marker>
              
              <Polyline
                positions={[
                  [shipment.fromLat, shipment.fromLng!],
                  [shipment.toLat, shipment.toLng!]
                ]}
                color="blue"
                weight={2}
                opacity={0.7}
              />
            </div>
          )
        })}
      </MapContainer>
    </div>
  )
}