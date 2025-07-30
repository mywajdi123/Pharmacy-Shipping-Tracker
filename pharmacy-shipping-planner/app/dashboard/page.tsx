'use client'

import { useEffect, useState } from 'react'
import { 
  Package, 
  Users, 
  Truck, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  MapPin,
  Pill,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3,
  Bell,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Target,
  Thermometer,
  Battery
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalShipments: number
  activeShipments: number
  totalPatients: number
  deliveryRate: number
  avgDeliveryTime: string
  costSavings: string
  temperatureAlerts: number
  complianceScore: number
}

interface RecentShipment {
  id: string
  patientName: string
  medication: string
  status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'exception'
  destination: string
  estimatedDelivery: string
  priority: 'normal' | 'urgent' | 'critical'
  temperature: number
  progress: number
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeMetric, setActiveMetric] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with real API calls
  const [stats, setStats] = useState<DashboardStats>({
    totalShipments: 2847,
    activeShipments: 156,
    totalPatients: 1298,
    deliveryRate: 99.2,
    avgDeliveryTime: '18.4 hrs',
    costSavings: '$47,230',
    temperatureAlerts: 3,
    complianceScore: 98.7
  })

  const [recentShipments] = useState<RecentShipment[]>([
    {
      id: 'SH-2024-001',
      patientName: 'Sarah Johnson',
      medication: 'Insulin Glargine 100U/mL',
      status: 'shipped',
      destination: 'New York, NY',
      estimatedDelivery: '2 hours',
      priority: 'critical',
      temperature: 4.2,
      progress: 75
    },
    {
      id: 'SH-2024-002',
      patientName: 'Michael Chen',
      medication: 'Metformin 500mg',
      status: 'preparing',
      destination: 'Los Angeles, CA',
      estimatedDelivery: '6 hours',
      priority: 'normal',
      temperature: 22.1,
      progress: 25
    },
    {
      id: 'SH-2024-003',
      patientName: 'Emily Rodriguez',
      medication: 'Humira Auto-Injector',
      status: 'delivered',
      destination: 'Chicago, IL',
      estimatedDelivery: 'Delivered',
      priority: 'urgent',
      temperature: 5.8,
      progress: 100
    },
    {
      id: 'SH-2024-004',
      patientName: 'David Thompson',
      medication: 'Levothyroxine 75mcg',
      status: 'exception',
      destination: 'Houston, TX',
      estimatedDelivery: 'Delayed',
      priority: 'normal',
      temperature: 28.5,
      progress: 60
    }
  ])

  useEffect(() => {
    setMounted(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Cycle through metrics
    const metricsInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % 4)
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(metricsInterval)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'preparing': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'exception': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'urgent': return <Clock className="w-4 h-4 text-amber-500" />
      default: return <Target className="w-4 h-4 text-gray-400" />
    }
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Loading Dashboard</h3>
            <p className="text-sm text-gray-500">Fetching real-time data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with Search */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PharmShip Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search shipments, patients..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors relative">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {stats.temperatureAlerts}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Active Shipments',
              value: stats.activeShipments,
              change: '+12%',
              trend: 'up',
              icon: Truck,
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-50',
              description: 'Currently in transit'
            },
            {
              title: 'Total Patients',
              value: stats.totalPatients.toLocaleString(),
              change: '+8%',
              trend: 'up',
              icon: Users,
              color: 'from-emerald-500 to-teal-500',
              bgColor: 'bg-emerald-50',
              description: 'Active patient base'
            },
            {
              title: 'Delivery Rate',
              value: `${stats.deliveryRate}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Target,
              color: 'from-purple-500 to-pink-500',
              bgColor: 'bg-purple-50',
              description: 'On-time deliveries'
            },
            {
              title: 'Cost Savings',
              value: stats.costSavings,
              change: '+15%',
              trend: 'up',
              icon: TrendingUp,
              color: 'from-amber-500 to-orange-500',
              bgColor: 'bg-amber-50',
              description: 'This month'
            }
          ].map((metric, index) => {
            const Icon = metric.icon
            const isActive = activeMetric === index
            
            return (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer group ${
                  isActive 
                    ? 'bg-white shadow-2xl shadow-blue-500/20 scale-105 border-2 border-blue-200' 
                    : 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                }`}
                onMouseEnter={() => setActiveMetric(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === 'up' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                </div>
                
                {/* Animated background gradient */}
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-5 animate-pulse`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Quick Actions & Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'New Shipment', href: '/dashboard/shipments/new', icon: Plus, color: 'from-blue-500 to-cyan-500' },
                { label: 'Add Patient', href: '/dashboard/patients/new', icon: Users, color: 'from-emerald-500 to-teal-500' },
                { label: 'Add Medication', href: '/dashboard/medications/new', icon: Pill, color: 'from-purple-500 to-pink-500' },
                { label: 'View Analytics', href: '/dashboard/analytics', icon: BarChart3, color: 'from-amber-500 to-orange-500' }
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">System Health</h3>
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'API Response Time', value: '127ms', status: 'excellent', color: 'emerald' },
                { label: 'Cold Chain Monitoring', value: 'Active', status: 'good', color: 'blue' },
                { label: 'Compliance Check', value: `${stats.complianceScore}%`, status: 'good', color: 'purple' },
                { label: 'System Uptime', value: '99.99%', status: 'excellent', color: 'emerald' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Temperature Alerts */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Temperature Alerts</h3>
              <Thermometer className="w-5 h-5 text-red-500" />
            </div>
            
            <div className="space-y-4">
              {stats.temperatureAlerts > 0 ? (
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Temperature Deviation</p>
                      <p className="text-xs text-red-600 mt-1">
                        Shipment SH-2024-004 temperature: 28.5°C (exceeds 25°C limit)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">All shipments within temperature range</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Shipments with Enhanced UI */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Recent Shipments</h3>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
                <Link 
                  href="/dashboard/shipments"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentShipments.map((shipment, index) => (
              <div key={shipment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Priority & Status */}
                    <div className="flex flex-col items-center space-y-1">
                      {getPriorityIcon(shipment.priority)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    
                    {/* Shipment Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{shipment.id}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Thermometer className="w-3 h-3 mr-1" />
                          {shipment.temperature}°C
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{shipment.patientName} • {shipment.medication}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {shipment.destination}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            shipment.status === 'exception' 
                              ? 'bg-red-500' 
                              : shipment.status === 'delivered'
                              ? 'bg-emerald-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* ETA */}
                    <div className="text-right min-w-0">
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Timer className="w-3 h-3 mr-1" />
                        ETA
                      </div>
                      <p className="text-sm font-medium text-gray-900">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <Link
                      href={`/dashboard/shipments/${shipment.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}