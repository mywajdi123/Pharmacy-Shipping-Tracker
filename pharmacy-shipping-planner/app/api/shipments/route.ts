import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        patient: true,
        items: {
          include: {
            medication: true
          }
        },
        createdBy: {
          select: {
            name: true,
            email: true
          }
        },
        tasks: true,
        trackingEvents: {
          orderBy: {
            timestamp: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(shipments)
  } catch (error) {
    console.error('Error fetching shipments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Generate shipment number
    const shipmentNumber = `SH${Date.now()}`
    
    const shipment = await prisma.shipment.create({
      data: {
        shipmentNumber,
        status: data.status || 'PENDING',
        priority: data.priority || 'NORMAL',
        shippingMethod: data.shippingMethod,
        carrier: data.carrier,
        fromAddress: data.fromAddress,
        toAddress: data.toAddress,
        toCity: data.toCity,
        toState: data.toState,
        toZipCode: data.toZipCode,
        notes: data.notes,
        patientId: data.patientId,
        createdById: session.user.id,
        items: {
          create: data.items.map((item: any) => ({
            medicationId: item.medicationId,
            quantity: item.quantity,
            instructions: item.instructions
          }))
        }
      },
      include: {
        patient: true,
        items: {
          include: {
            medication: true
          }
        },
        createdBy: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(shipment, { status: 201 })
  } catch (error) {
    console.error('Error creating shipment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}