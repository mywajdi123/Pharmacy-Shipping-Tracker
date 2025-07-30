'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Package, MapPin, Clock, Shield, Truck, Users, BarChart3, Zap, ChevronRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Package,
      title: "Smart Shipment Tracking",
      description: "AI-powered logistics with real-time updates and predictive delivery estimates",
      color: "from-blue-500 to-cyan-400",
      stats: "99.8% accuracy"
    },
    {
      icon: MapPin,
      title: "Global Route Optimization",
      description: "Dynamic routing algorithms that save 30% on shipping costs",
      color: "from-purple-500 to-pink-400",
      stats: "2.3M+ routes optimized"
    },
    {
      icon: Shield,
      title: "Pharmaceutical Compliance",
      description: "FDA-compliant cold chain monitoring with blockchain verification",
      color: "from-emerald-500 to-teal-400",
      stats: "100% compliance rate"
    }
  ]

  const stats = [
    { label: "Shipments Processed", value: "2.3M+", change: "+23%" },
    { label: "Average Delivery Time", value: "18hrs", change: "-45%" },
    { label: "Cost Savings", value: "$4.2M", change: "+67%" },
    { label: "Customer Satisfaction", value: "99.8%", change: "+12%" }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              PharmShip Pro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
                  <span className="text-sm text-cyan-300 font-medium">Next-Gen Pharmacy Logistics</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                    Ship Smarter,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Deliver Faster
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Revolutionary AI-powered pharmacy shipping platform that reduces costs by 45%, 
                  ensures 99.8% compliance, and delivers medications 2x faster than traditional methods.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Launch Dashboard
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="text-sm text-gray-400 bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <strong className="text-cyan-400">Demo Access:</strong> admin@pharmacy.com / admin123
              </div>
            </div>

            {/* Right Column - Interactive Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer group ${
                      activeCard === index 
                        ? 'bg-white/10 border-white/30 shadow-2xl scale-105' 
                        : 'bg-white/5 border-white/10 hover:bg-white/8'
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300 mb-3 leading-relaxed">{feature.description}</p>
                        <div className="text-sm font-semibold text-cyan-400">{feature.stats}</div>
                      </div>
                    </div>
                    
                    {activeCard === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl animate-pulse" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                  <div className="text-sm text-green-400 font-semibold">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Features Row */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, label: "Real-time Tracking" },
                { icon: Users, label: "Patient Management" },
                { icon: BarChart3, label: "Advanced Analytics" },
                { icon: Clock, label: "24/7 Monitoring" }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}