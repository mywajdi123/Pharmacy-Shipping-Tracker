import { Prisma } from '@prisma/client'

export type ShipmentWithDetails = Prisma.ShipmentGetPayload<{
  include: {
    patient: true
    items: {
      include: {
        medication: true
      }
    }
    createdBy: true
    tasks: true
    trackingEvents: true
  }
}>

export type PatientWithShipments = Prisma.PatientGetPayload<{
  include: {
    shipments: true
  }
}>

export interface TrackingInfo {
  status: string
  location?: string
  timestamp: Date
  description: string
}

export interface GeocodingResult {
  lat: number
  lng: number
  address: string
}