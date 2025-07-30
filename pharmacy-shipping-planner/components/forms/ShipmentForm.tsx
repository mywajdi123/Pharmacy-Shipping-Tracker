'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Thermometer, 
  Shield, 
  Truck,
  Plus,
  Search,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  X,
  Loader2,
  Zap,
  Target,
  ChevronRight,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

interface Medication {
  id: string
  name: string
  strength: string
  form: string
  manufacturer: string
  requiresColdChain: boolean
  temperatureRange: string
}

interface ShipmentFormData {
  patientId: string
  medicationId: string
  quantity: number
  priority: 'normal' | 'urgent' | 'critical'
  shippingMethod: 'standard' | 'express' | 'overnight' | 'same-day'
  specialInstructions: string
  deliveryDate: string
  requiresSignature: boolean
  temperatureMonitoring: boolean
  insuranceValue: number
}

export default function ShipmentForm() {
  const [formData, setFormData] = useState<ShipmentFormData>({
    patientId: '',
    medicationId: '',
    quantity: 1,
    priority: 'normal',
    shippingMethod: 'standard',
    specialInstructions: '',
    deliveryDate: '',
    requiresSignature: true,
    temperatureMonitoring: false,
    insuranceValue: 0
  })

  const [patients, setPatients] = useState<Patient[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)
  const [patientSearch, setPatientSearch] = useState('')
  const [medicationSearch, setMedicationSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    setPatients([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 123-4567',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.c@email.com',
        phone: '(555) 987-6543',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        phone: '(555) 456-7890',
        address: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601'
      },
      {
        id: '4',
        name: 'David Thompson',
        email: 'david.t@email.com',
        phone: '(555) 321-0987',
        address: '321 Elm Dr',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001'
      }
    ])

    setMedications([
      {
        id: '1',
        name: 'Insulin Glargine',
        strength: '100U/mL',
        form: 'Injectable',
        manufacturer: 'Sanofi',
        requiresColdChain: true,
        temperatureRange: '2-8°C'
      },
      {
        id: '2',
        name: 'Metformin',
        strength: '500mg',
        form: 'Tablet',
        manufacturer: 'Teva',
        requiresColdChain: false,
        temperatureRange: '15-30°C'
      },
      {
        id: '3',
        name: 'Humira',
        strength: '40mg/0.8mL',
        form: 'Auto-Injector',
        manufacturer: 'AbbVie',
        requiresColdChain: true,
        temperatureRange: '2-8°C'
      },
      {
        id: '4',
        name: 'Levothyroxine',
        strength: '75mcg',
        form: 'Tablet',
        manufacturer: 'Mylan',
        requiresColdChain: false,
        temperatureRange: '20-25°C'
      },
      {
        id: '5',
        name: 'Ozempic',
        strength: '1mg/mL',
        form: 'Injectable Pen',
        manufacturer: 'Novo Nordisk',
        requiresColdChain: true,
        temperatureRange: '2-8°C'
      }
    ])
  }, [])

  // Update selected patient and medication when IDs change
  useEffect(() => {
    if (formData.patientId) {
      const patient = patients.find(p => p.id === formData.patientId)
      setSelectedPatient(patient || null)
    }
  }, [formData.patientId, patients])

  useEffect(() => {
    if (formData.medicationId) {
      const medication = medications.find(m => m.id === formData.medicationId)
      setSelectedMedication(medication || null)
      if (medication?.requiresColdChain) {
        setFormData(prev => ({ ...prev, temperatureMonitoring: true }))
      }
    }
  }, [formData.medicationId, medications])

  // Calculate estimated cost based on selections
  useEffect(() => {
    let baseCost = 15.99
    
    if (formData.shippingMethod === 'express') baseCost += 10
    if (formData.shippingMethod === 'overnight') baseCost += 25
    if (formData.shippingMethod === 'same-day') baseCost += 50
    
    if (formData.priority === 'urgent') baseCost += 5
    if (formData.priority === 'critical') baseCost += 15
    
    if (formData.temperatureMonitoring) baseCost += 12
    if (formData.requiresSignature) baseCost += 3
    
    setEstimatedCost(baseCost)
  }, [formData.shippingMethod, formData.priority, formData.temperatureMonitoring, formData.requiresSignature])

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearch.toLowerCase())
  )

  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
    medication.manufacturer.toLowerCase().includes(medicationSearch.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Validate form
    const newErrors: Record<string, string> = {}
    
    if (!formData.patientId) newErrors.patientId = 'Please select a patient'
    if (!formData.medicationId) newErrors.medicationId = 'Please select a medication'
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1'
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Please select a delivery date'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Error creating shipment:', error)
      alert('Failed to create shipment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.patientId) newErrors.patientId = 'Please select a patient'
      if (!formData.medicationId) newErrors.medicationId = 'Please select a medication'
    }
    
    if (step === 2) {
      if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1'
      if (!formData.deliveryDate) newErrors.deliveryDate = 'Please select a delivery date'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  const resetForm = () => {
    setFormData({
      patientId: '',
      medicationId: '',
      quantity: 1,
      priority: 'normal',
      shippingMethod: 'standard',
      specialInstructions: '',
      deliveryDate: '',
      requiresSignature: true,
      temperatureMonitoring: false,
      insuranceValue: 0
    })
    setStep(1)
    setSelectedPatient(null)
    setSelectedMedication(null)
    setPatientSearch('')
    setMedicationSearch('')
    setIsSubmitted(false)
    setErrors({})
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red'
      case 'urgent': return 'amber'
      default: return 'blue'
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      normal: 'bg-blue-100 text-blue-800',
      urgent: 'bg-amber-100 text-amber-800',
      critical: 'bg-red-100 text-red-800'
    }
    return colors[priority as keyof typeof colors] || colors.normal
  }

  const getShippingMethodIcon = (method: string) => {
    switch (method) {
      case 'same-day': return <Zap className="w-5 h-5" />
      case 'overnight': return <Target className="w-5 h-5" />
      case 'express': return <Truck className="w-5 h-5" />
      default: return <Package className="w-5 h-5" />
    }
  }

  const getShippingDetails = (method: string) => {
    switch (method) {
      case 'standard': return { time: '3-5 days', cost: '$15.99' }
      case 'express': return { time: '2-3 days', cost: '$25.99' }
      case 'overnight': return { time: '1 day', cost: '$40.99' }
      case 'same-day': return { time: '4-8 hours', cost: '$65.99' }
      default: return { time: '3-5 days', cost: '$15.99' }
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipment Created!</h1>
          <p className="text-gray-600 mb-8">
            Your medication shipment has been successfully created and will be processed shortly.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking ID:</span>
                <span className="font-mono font-semibold">#MED-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{selectedPatient?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medication:</span>
                <span className="font-semibold">{selectedMedication?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Cost:</span>
                <span className="font-bold text-emerald-600">${estimatedCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-200"
          >
            Create Another Shipment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Create New Shipment
              </h1>
              <p className="text-gray-600">Set up a new medication delivery</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[
              { step: 1, title: 'Patient & Medication', icon: User },
              { step: 2, title: 'Shipping Details', icon: Truck },
              { step: 3, title: 'Review & Submit', icon: CheckCircle }
            ].map((item, index) => {
              const Icon = item.icon
              const isActive = step === item.step
              const isCompleted = step > item.step
              
              return (
                <div key={item.step} className="flex items-center">
                  <div className={`
                    flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                      : isCompleted 
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-gray-500 border border-gray-200'
                    }
                  `}>
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${isActive || isCompleted ? 'bg-white/20' : 'bg-gray-100'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  {index < 2 && (
                    <div className={`w-8 h-px ${step > item.step ? 'bg-emerald-500' : 'bg-gray-300'} mx-2`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Patient & Medication Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Patient Selection */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Select Patient</h3>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, patientId: patient.id }))
                          setSelectedPatient(patient)
                          setErrors(prev => ({ ...prev, patientId: '' }))
                        }}
                        className={`
                          p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                          ${formData.patientId === patient.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.email}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {patient.city}, {patient.state} {patient.zipCode}
                            </p>
                          </div>
                          {formData.patientId === patient.id && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.patientId && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.patientId}
                    </p>
                  )}
                </div>
              </div>

              {/* Medication Selection */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Select Medication</h3>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search medications..."
                      value={medicationSearch}
                      onChange={(e) => setMedicationSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredMedications.map((medication) => (
                      <div
                        key={medication.id}
                        onClick={() => {
                          setFormData(prev => ({ 
                            ...prev, 
                            medicationId: medication.id,
                            temperatureMonitoring: medication.requiresColdChain
                          }))
                          setSelectedMedication(medication)
                          setErrors(prev => ({ ...prev, medicationId: '' }))
                        }}
                        className={`
                          p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                          ${formData.medicationId === medication.id
                            ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/10'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-900">{medication.name}</p>
                              {medication.requiresColdChain && (
                                <div className="flex items-center px-2 py-1 bg-blue-100 rounded-full">
                                  <Thermometer className="w-3 h-3 text-blue-600 mr-1" />
                                  <span className="text-xs font-medium text-blue-600">Cold Chain</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{medication.strength} • {medication.form}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {medication.manufacturer} • {medication.temperatureRange}
                            </p>
                          </div>
                          {formData.medicationId === medication.id && (
                            <CheckCircle className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.medicationId && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.medicationId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Details */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Options */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Shipping Options</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors.quantity && (
                        <p className="text-red-600 text-sm flex items-center mt-1">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.quantity}
                        </p>
                      )}
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'normal', label: 'Normal', color: 'blue' },
                          { value: 'urgent', label: 'Urgent', color: 'amber' },
                          { value: 'critical', label: 'Critical', color: 'red' }
                        ].map((priority) => (
                          <button
                            key={priority.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, priority: priority.value as ShipmentFormData['priority'] }))}
                            className={`
                              p-3 border rounded-xl text-sm font-medium transition-all duration-200
                              ${formData.priority === priority.value
                                ? priority.color === 'blue' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                                : priority.color === 'amber' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-lg'
                                : 'border-red-500 bg-red-50 text-red-700 shadow-lg'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                              }
                            `}
                          >
                            {priority.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                      <div className="space-y-3">
                        {[
                          { value: 'standard', label: 'Standard', time: '3-5 days', cost: '$15.99' },
                          { value: 'express', label: 'Express', time: '2-3 days', cost: '$25.99' },
                          { value: 'overnight', label: 'Overnight', time: '1 day', cost: '$40.99' },
                          { value: 'same-day', label: 'Same Day', time: '4-8 hours', cost: '$65.99' }
                        ].map((method) => (
                          <div
                            key={method.value}
                            onClick={() => setFormData(prev => ({ ...prev, shippingMethod: method.value as ShipmentFormData['shippingMethod'] }))}
                            className={`
                              p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                              ${formData.shippingMethod === method.value
                                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`
                                  w-10 h-10 rounded-lg flex items-center justify-center
                                  ${formData.shippingMethod === method.value ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
                                `}>
                                  {getShippingMethodIcon(method.value)}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{method.label}</p>
                                  <p className="text-sm text-gray-500">{method.time}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">{method.cost}</p>
                                {formData.shippingMethod === method.value && (
                                  <CheckCircle className="w-5 h-5 text-blue-500 ml-auto mt-1" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-6">
                  {/* Delivery Date */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Delivery Schedule</h3>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Date</label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.deliveryDate && (
                        <p className="text-red-600 text-sm flex items-center mt-1">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.deliveryDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Special Options */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Special Requirements</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Temperature Monitoring */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Temperature Monitoring</p>
                            <p className="text-sm text-gray-500">Real-time temperature tracking (+$12)</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, temperatureMonitoring: !prev.temperatureMonitoring }))}
                          className={`
                            w-12 h-6 rounded-full transition-colors duration-200 flex items-center
                            ${formData.temperatureMonitoring ? 'bg-blue-500' : 'bg-gray-300'}
                          `}
                        >
                          <div className={`
                            w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200
                            ${formData.temperatureMonitoring ? 'translate-x-6' : 'translate-x-0.5'}
                          `} />
                        </button>
                      </div>

                      {/* Signature Required */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="font-medium text-gray-900">Signature Required</p>
                            <p className="text-sm text-gray-500">Secure delivery confirmation (+$3)</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, requiresSignature: !prev.requiresSignature }))}
                          className={`
                            w-12 h-6 rounded-full transition-colors duration-200 flex items-center
                            ${formData.requiresSignature ? 'bg-emerald-500' : 'bg-gray-300'}
                          `}
                        >
                          <div className={`
                            w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200
                            ${formData.requiresSignature ? 'translate-x-6' : 'translate-x-0.5'}
                          `} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cost Estimate */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Cost Estimate</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${estimatedCost.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Total shipping cost</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base shipping:</span>
                        <span>$15.99</span>
                      </div>
                      {formData.shippingMethod !== 'standard' && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{formData.shippingMethod} upgrade:</span>
                          <span>+${
                            formData.shippingMethod === 'express' ? '10.00' :
                            formData.shippingMethod === 'overnight' ? '25.00' :
                            formData.shippingMethod === 'same-day' ? '50.00' : '0.00'
                          }</span>
                        </div>
                      )}
                      {formData.priority !== 'normal' && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{formData.priority} priority:</span>
                          <span>+${formData.priority === 'urgent' ? '5.00' : '15.00'}</span>
                        </div>
                      )}
                      {formData.temperatureMonitoring && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Temperature monitoring:</span>
                          <span>+$12.00</span>
                        </div>
                      )}
                      {formData.requiresSignature && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Signature required:</span>
                          <span>+$3.00</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Special Instructions</h3>
                    </div>
                    <textarea
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Any special delivery instructions..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Review Your Shipment</h3>
                    <p className="text-gray-600">Please verify all details before submitting</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Patient & Medication Info */}
                  <div className="space-y-6">
                    {/* Patient Details */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <User className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-gray-900">Patient Information</h4>
                      </div>
                      {selectedPatient && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold text-lg text-gray-900">{selectedPatient.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                              <Mail className="w-4 h-4" />
                              <span>{selectedPatient.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                              <Phone className="w-4 h-4" />
                              <span>{selectedPatient.phone}</span>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedPatient.address}</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-6">
                              {selectedPatient.city}, {selectedPatient.state} {selectedPatient.zipCode}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Medication Details */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Package className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-gray-900">Medication Details</h4>
                      </div>
                      {selectedMedication && (
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-lg text-gray-900">{selectedMedication.name}</p>
                              {selectedMedication.requiresColdChain && (
                                <div className="flex items-center px-2 py-1 bg-blue-100 rounded-full">
                                  <Thermometer className="w-3 h-3 text-blue-600 mr-1" />
                                  <span className="text-xs font-medium text-blue-600">Cold Chain</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600">{selectedMedication.strength} • {selectedMedication.form}</p>
                            <p className="text-sm text-gray-500">
                              Manufactured by {selectedMedication.manufacturer}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Quantity:</span> {formData.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Storage:</span> {selectedMedication.temperatureRange}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-6">
                    {/* Shipping Options */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Truck className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Shipping Details</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Priority Level:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(formData.priority)}`}>
                            {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Shipping Method:</span>
                          <div className="flex items-center space-x-2">
                            {getShippingMethodIcon(formData.shippingMethod)}
                            <span className="font-medium">
                              {formData.shippingMethod.charAt(0).toUpperCase() + formData.shippingMethod.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Delivery Time:</span>
                          <span className="font-medium">{getShippingDetails(formData.shippingMethod).time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Delivery Date:</span>
                          <span className="font-medium">{new Date(formData.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Services */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-gray-900">Special Services</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">Temperature Monitoring</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            formData.temperatureMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {formData.temperatureMonitoring ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span className="text-gray-600">Signature Required</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            formData.requiresSignature ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {formData.requiresSignature ? 'Required' : 'Optional'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Final Cost</h4>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">${estimatedCost.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Total shipping cost</p>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {formData.specialInstructions && (
                      <div className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <h4 className="font-semibold text-gray-900">Special Instructions</h4>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{formData.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Shipment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Create Shipment</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}