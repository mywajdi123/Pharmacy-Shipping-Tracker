import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, Truck, AlertCircle } from 'lucide-react'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Fetch dashboard statistics
  const [
    totalShipments,
    activeShipments,
    totalPatients,
    urgentShipments
  ] = await Promise.all([
    prisma.shipment.count(),
    prisma.shipment.count({
      where: {
        status: {
          in: ['PREPARING', 'READY_TO_SHIP', 'SHIPPED', 'IN_TRANSIT']
        }
      }
    }),
    prisma.patient.count(),
    prisma.shipment.count({
      where: {
        priority: 'URGENT',
        status: {
          not: 'DELIVERED'
        }
      }
    })
  ])

  const recentShipments = await prisma.shipment.findMany({
    take: 5,
    include: {
      patient: true,
      items: {
        include: {
          medication: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShipments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeShipments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Shipments</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{urgentShipments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
            <CardDescription>Latest shipments in your pharmacy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{shipment.shipmentNumber}</h3>
                    <p className="text-sm text-gray-600">
                      {shipment.patient.firstName} {shipment.patient.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {shipment.items.length} medication(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'PREPARING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}