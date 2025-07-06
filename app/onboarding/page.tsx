"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Users } from "lucide-react"
import { registerUser } from "@/app/actions/user-registration"

const initialState = {
  success: false,
  message: "",
  user: null,
}

const steps = [
  { id: 1, title: "Personal Details", description: "Basic information about you" },
  { id: 2, title: "Property Information", description: "Details about your rural property" },
  { id: 3, title: "Emergency Planning", description: "Set up your emergency preferences" },
  { id: 4, title: "Community Connection", description: "Connect with your local community" },
]

const australianStates = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
]

const propertyTypes = [
  "Cattle Station",
  "Sheep Farm",
  "Mixed Farming",
  "Dairy Farm",
  "Crop Farm",
  "Horse Stud",
  "Poultry Farm",
  "Other",
]

const emergencyTypes = [
  { id: "bushfire", label: "Bushfire", icon: "🔥" },
  { id: "flood", label: "Flood", icon: "🌊" },
  { id: "storm", label: "Severe Weather", icon: "⛈️" },
  { id: "drought", label: "Drought", icon: "☀️" },
]

export default function OnboardingPage() {
  const [state, formAction] = useFormState(registerUser, initialState)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    propertyName: "",
    propertyType: "",
    location: "",
    state: "",
    postcode: "",
    propertySize: "",
    emergencyTypes: [] as string[],
    hasInsurance: false,
    wantsAlerts: true,
    joinCommunity: true,
    agreedToTerms: false,
  })

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmergencyTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyTypes: prev.emergencyTypes.includes(type)
        ? prev.emergencyTypes.filter((t) => t !== type)
        : [...prev.emergencyTypes, type],
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const submitFormData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => submitFormData.append(key, item))
      } else if (typeof value === "boolean") {
        if (value) submitFormData.append(key, "on")
      } else {
        submitFormData.append(key, value.toString())
      }
    })

    await formAction(submitFormData)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password && formData.confirmPassword
      case 2:
        return formData.propertyName && formData.propertyType && formData.location && formData.state
      case 3:
        return formData.emergencyTypes.length > 0
      case 4:
        return formData.agreedToTerms
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </Link>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h1>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-600 mt-2">{steps[currentStep - 1].description}</p>
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create a strong password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0412 345 678"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Property Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propertyName">Property Name *</Label>
                    <Input
                      id="propertyName"
                      value={formData.propertyName}
                      onChange={(e) => handleInputChange("propertyName", e.target.value)}
                      placeholder="Smith Family Farm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Town/City *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Tamworth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {australianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange("postcode", e.target.value)}
                      placeholder="2340"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertySize">Property Size</Label>
                  <Select
                    value={formData.propertySize}
                    onValueChange={(value) => handleInputChange("propertySize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (&lt; 10 hectares)</SelectItem>
                      <SelectItem value="medium">Medium (10-100 hectares)</SelectItem>
                      <SelectItem value="large">Large (100-1000 hectares)</SelectItem>
                      <SelectItem value="very-large">Very Large (&gt; 1000 hectares)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Planning */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Which emergency types affect your area?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {emergencyTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.emergencyTypes.includes(type.id)
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleEmergencyTypeToggle(type.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <h4 className="font-medium">{type.label}</h4>
                            <p className="text-sm text-gray-600">
                              {type.id === "bushfire" && "Wildfire and grass fire risks"}
                              {type.id === "flood" && "River and flash flooding"}
                              {type.id === "storm" && "Severe weather and storms"}
                              {type.id === "drought" && "Extended dry conditions"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasInsurance"
                      checked={formData.hasInsurance}
                      onCheckedChange={(checked) => handleInputChange("hasInsurance", checked)}
                    />
                    <Label htmlFor="hasInsurance">I have rural/farm insurance coverage</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wantsAlerts"
                      checked={formData.wantsAlerts}
                      onCheckedChange={(checked) => handleInputChange("wantsAlerts", checked)}
                    />
                    <Label htmlFor="wantsAlerts">Send me emergency alerts and weather warnings</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Community Connection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connect with Your Community</h3>
                  <p className="text-gray-600 mb-6">
                    Join your local rural community to share resources, coordinate during emergencies, and support each
                    other.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="joinCommunity"
                      checked={formData.joinCommunity}
                      onCheckedChange={(checked) => handleInputChange("joinCommunity", checked)}
                    />
                    <Label htmlFor="joinCommunity">
                      Join my local community group for {formData.location}, {formData.state}
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked)}
                    />
                    <Label htmlFor="agreedToTerms" className="text-sm leading-relaxed">
                      I agree to the Terms of Service and Privacy Policy. I understand that this platform provides
                      emergency planning tools and community features for rural properties.
                    </Label>
                  </div>
                </div>

                {state?.message && (
                  <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {state.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                      {state.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep} disabled={!canProceed()} className="bg-green-600 hover:bg-green-700">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canProceed()} className="bg-green-600 hover:bg-green-700">
                  Complete Setup
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
