'use client'

import { useEffect, useState } from 'react'
import { Package, Users, Truck, AlertCircle, TrendingUp, MapPin, Clock, DollarSign, Activity, Zap, Shield, BarChart3 } from 'lucide-react'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    shipments: 0,
    active: 0,
    patients: 0,
    urgent: 0
  })

  // Animation for counting up numbers
  useEffect(() => {
    setMounted(true)
    const targets = {
      shipments: 2847,
      active: 156,
      patients: 1293,
      urgent: 7
    }

    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let current = {
      shipments: 0,
      active: 0,
      patients: 0,
      urgent: 0
    }

    const timer = setInterval(() => {
      current.shipments += targets.shipments / steps
      current.active += targets.active / steps
      current.patients += targets.patients / steps
      current.urgent += targets.urgent / steps

      setAnimatedStats({
        shipments: Math.floor(current.shipments),
        active: Math.floor(current.active),
        patients: Math.floor(current.patients),
        urgent: Math.floor(current.urgent)
      })

      if (current.shipments >= targets.shipments) {
        clearInterval(timer)
        setAnimatedStats(targets)
      }
    }, increment)

    return () => clearInterval(timer)
  }, [])

  const metrics = [
    {
      title: "Revenue Growth",
      value: "+23.4%",
      change: "+4.2% from last month",
      color: "from-emerald-500 to-teal-400",
      icon: TrendingUp
    },
    {
      title: "Delivery Time",
      value: "18.3hrs",
      change: "-2.1hrs improvement",
      color: "from-blue-500 to-cyan-400",
      icon: Clock
    },
    {
      title: "Cost Savings",
      value: "$847K",
      change: "+67% this quarter",
      color: "from-purple-500 to-violet-400",
      icon: DollarSign
    },
    {
      title: "Compliance Rate",
      value: "99.8%",
      change: "+0.3% this month",
      color: "from-pink-500 to-rose-400",
      icon: Shield
    }
  ]

  const recentShipments = [
    {
      id: "SH-2024-001",
      patient: "Sarah Johnson",
      medication: "Insulin Humalog",
      status: "In Transit",
      priority: "Urgent",
      destination: "Los Angeles, CA",
      eta: "2 hours",
      progress: 75
    },
    {
      id: "SH-2024-002",
      patient: "Michael Chen",
      medication: "Metformin XR",
      status: "Preparing",
      priority: "Normal",
      destination: "Seattle, WA",
      eta: "Tomorrow",
      progress: 25
    },
    {
      id: "SH-2024-003",
      patient: "Emma Davis",
      medication: "Lisinopril",
      status: "Delivered",
      priority: "Normal",
      destination: "Phoenix, AZ",
      eta: "Completed",
      progress: 100
    }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Mission Control
                </h1>
                <p className="text-gray-400 mt-1">Real-time pharmacy operations dashboard</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">All Systems Operational</span>
                </div>
                
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Shipments",
                value: animatedStats.shipments.toLocaleString(),
                icon: Package,
                color: "from-blue-500 to-cyan-400",
                change: "+12.5%",
                bgPattern: "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
              },
              {
                title: "Active Shipments",
                value: animatedStats.active.toLocaleString(),
                icon: Truck,
                color: "from-emerald-500 to-teal-400",
                change: "+8.2%",
                bgPattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
              },
              {
                title: "Registered Patients",
                value: animatedStats.patients.toLocaleString(),
                icon: Users,
                color: "from-purple-500 to-violet-400",
                change: "+15.7%",
                bgPattern: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)"
              },
              {
                title: "Urgent Shipments",
                value: animatedStats.urgent.toLocaleString(),
                icon: AlertCircle,
                color: "from-red-500 to-pink-400",
                change: "-23.1%",
                bgPattern: "radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)"
              }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className="relative group hover:scale-105 transition-all duration-300"
                >
                  <div 
                    className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden"
                    style={{ background: `${stat.bgPattern}, rgba(255, 255, 255, 0.05)` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-gray-300 text-sm font-medium">{stat.title}</h3>
                      <div className="text-3xl font-bold text-white">
                        {stat.value}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Metrics */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Metrics */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Performance Metrics</h2>
                  <div className="flex space-x-2">
                    {metrics.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMetric(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          selectedMetric === index ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {metrics.map((metric, index) => {
                    const Icon = metric.icon
                    const isActive = selectedMetric === index
                    return (
                      <div 
                        key={index}
                        className={`transition-all duration-500 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                        }`}
                        style={{ display: isActive ? 'block' : 'none' }}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
                            <p className="text-gray-400 text-sm">{metric.change}</p>
                          </div>
                        </div>
                        
                        <div className="text-4xl font-bold text-white mb-4">{metric.value}</div>
                        
                        {/* Animated Progress Bar */}
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 animate-pulse`}
                            style={{ width: `${65 + index * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: "New Shipment", icon: Package, color: "from-blue-500 to-cyan-400" },
                    { label: "Add Patient", icon: Users, color: "from-purple-500 to-violet-400" },
                    { label: "Track Package", icon: MapPin, color: "from-emerald-500 to-teal-400" },
                    { label: "Generate Report", icon: BarChart3, color: "from-pink-500 to-rose-400" }
                  ].map((action, index) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={index}
                        className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium">{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
                <div className="space-y-4">
                  {[
                    { service: "API Gateway", status: "Operational", uptime: "99.9%" },
                    { service: "Database", status: "Operational", uptime: "99.8%" },
                    { service: "Tracking Service", status: "Operational", uptime: "99.7%" },
                    { service: "Notification System", status: "Maintenance", uptime: "98.2%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'Operational' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                        }`}></div>
                        <span className="text-gray-300 text-sm">{item.service}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{item.uptime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Shipments */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Live Shipment Tracking</h2>
              <div className="flex items-center space-x-2 text-cyan-400">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Real-time Updates</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentShipments.map((shipment, index) => (
                <div 
                  key={index}
                  className="relative p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{shipment.id}</h3>
                        <p className="text-gray-400 text-sm">{shipment.patient}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shipment.status === 'Delivered' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        shipment.status === 'In Transit' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {shipment.status}
                      </span>
                      {shipment.priority === 'Urgent' && (
                        <div className="mt-1">
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded text-xs font-medium">
                            URGENT
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-400">Medication:</span>
                      <p className="text-white font-medium">{shipment.medication}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Destination:</span>
                      <p className="text-white font-medium">{shipment.destination}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-xs">Progress</span>
                      <span className="text-cyan-400 text-xs font-medium">ETA: {shipment.eta}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${shipment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}