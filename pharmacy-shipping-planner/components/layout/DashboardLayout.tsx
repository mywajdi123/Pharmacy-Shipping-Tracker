'use client'

import { ReactNode, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Package, 
  Users, 
  Pill, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  MapPin,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  Shield,
  Activity,
  CreditCard,
  User,
  HelpCircle
} from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: Home, 
      current: pathname === '/dashboard',
      badge: null
    },
    { 
      name: 'Shipments', 
      href: '/dashboard/shipments', 
      icon: Package, 
      current: pathname.startsWith('/dashboard/shipments'),
      badge: '12'
    },
    { 
      name: 'Patients', 
      href: '/dashboard/patients', 
      icon: Users, 
      current: pathname.startsWith('/dashboard/patients'),
      badge: null
    },
    { 
      name: 'Medications', 
      href: '/dashboard/medications', 
      icon: Pill, 
      current: pathname.startsWith('/dashboard/medications'),
      badge: null
    },
    { 
      name: 'Tracking', 
      href: '/dashboard/tracking', 
      icon: MapPin, 
      current: pathname.startsWith('/dashboard/tracking'),
      badge: null
    },
    { 
      name: 'Analytics', 
      href: '/dashboard/analytics', 
      icon: BarChart3, 
      current: pathname.startsWith('/dashboard/analytics'),
      badge: 'New'
    }
  ]

  const bottomNavigation = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PharmShip Pro
                </h1>
                <p className="text-xs text-gray-500">Professional Edition</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.email || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">Pharmacy Manager</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${item.current
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:bg-white/60 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${item.current ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${item.current 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'New' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-700'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            {bottomNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-white/60 hover:text-gray-900 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            
            <button
              onClick={() => signOut()}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-700 rounded-lg hover:bg-red-50 hover:text-red-900 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-700 mr-3" />
              Sign Out
            </button>
          </div>

          {/* Upgrade Banner */}
          <div className="m-4 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-xs opacity-90 mb-3">
              Get advanced analytics, unlimited shipments, and priority support.
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 lg:border-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-500" />
                </button>
                
                {/* Breadcrumb */}
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">Dashboard</span>
                  {pathname !== '/dashboard' && (
                    <>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-900 font-medium capitalize">
                        {pathname.split('/').pop()?.replace('-', ' ')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Quick Search - Hidden on mobile */}
                <div className="hidden md:block relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Quick search..."
                    className="w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-sm"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {session?.user?.email || 'Admin User'}
                        </p>
                        <p className="text-xs text-gray-500">Pharmacy Manager</p>
                      </div>
                      
                      <div className="py-2">
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <User className="w-4 h-4 mr-3 text-gray-500" />
                          Profile Settings
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <CreditCard className="w-4 h-4 mr-3 text-gray-500" />
                          Billing
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Shield className="w-4 h-4 mr-3 text-gray-500" />
                          Security
                        </a>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={() => signOut()}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Status Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span>System Healthy</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Secure Connection</span>
              </div>
            </div>
            <div>
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  )
}