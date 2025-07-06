"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, AlertCircle, User, MapPin, Shield, ArrowLeft, ArrowRight } from "lucide-react"

// Updated onboarding action
async function processUpdatedOnboarding(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const location = formData.get("location") as string
  const state = formData.get("state") as string
  const postcode = formData.get("postcode") as string
  const propertyType = formData.get("propertyType") as string
  const propertySize = formData.get("propertySize") as string
  const emergencyTypes = formData.getAll("emergencyTypes") as string[]
  const hasInsurance = formData.get("hasInsurance") === "on"
  const wantsAlerts = formData.get("wantsAlerts") === "on"
  const agreedToTerms = formData.get("agreedToTerms") === "on"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!name || !email || !location || !state || !propertyType) {
    return {
      success: false,
      message: "Please fill in all required fields",
      step: "incomplete",
    }
  }

  if (!agreedToTerms) {
    return {
      success: false,
      message: "You must agree to the terms and conditions",
      step: "incomplete",
    }
  }

  // Simulate successful onboarding
  return {
    success: true,
    message: `Welcome to Rural Community Hub, ${name}! Your comprehensive profile has been created.`,
    step: "complete",
    user: {
      name,
      email,
      phone,
      location: `${location}, ${state} ${postcode}`,
      propertyType,
      propertySize,
      emergencyTypes,
      hasInsurance,
      wantsAlerts,
    },
  }
}

const initialState = {
  success: false,
  message: "",
  step: "start",
  user: null,
}

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
  "Rural Residential",
  "Other",
]

const emergencyTypes = [
  { id: "bushfire", label: "Bushfire", icon: "🔥", description: "Wildfire and grass fire risks" },
  { id: "flood", label: "Flood", icon: "🌊", description: "River and flash flooding" },
  { id: "storm", label: "Severe Weather", icon: "⛈️", description: "Storms and severe weather" },
  { id: "drought", label: "Drought", icon: "☀️", description: "Extended dry conditions" },
  { id: "cyclone", label: "Cyclone", icon: "🌀", description: "Tropical cyclones" },
  { id: "hail", label: "Hail", icon: "🧊", description: "Hailstorms" },
]

export default function UserOnboardingUpdated() {
  const [state, formAction] = useFormState(processUpdatedOnboarding, initialState)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEmergencyTypes, setSelectedEmergencyTypes] = useState<string[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [hasInsurance, setHasInsurance] = useState(false)
  const [wantsAlerts, setWantsAlerts] = useState(true)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    // Add selected emergency types
    selectedEmergencyTypes.forEach((type) => {
      formData.append("emergencyTypes", type)
    })

    // Add checkbox values
    if (agreedToTerms) formData.append("agreedToTerms", "on")
    if (hasInsurance) formData.append("hasInsurance", "on")
    if (wantsAlerts) formData.append("wantsAlerts", "on")

    await formAction(formData)
    setIsLoading(false)
  }

  const handleEmergencyTypeToggle = (type: string) => {
    setSelectedEmergencyTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (state.success && state.step === "complete") {
    return (
      <Card className="w-full max-w-3xl mx-auto border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6" />
            Welcome to Rural Community Hub!
          </CardTitle>
          <CardDescription className="text-green-700">
            Your comprehensive profile has been created, {state.user?.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-green-700">Contact Information</Label>
                <p className="font-medium text-green-900">{state.user?.name}</p>
                {state.user?.email && <p className="text-sm text-green-800">{state.user.email}</p>}
                {state.user?.phone && <p className="text-sm text-green-800">{state.user.phone}</p>}
              </div>
              <div>
                <Label className="text-green-700">Location</Label>
                <p className="font-medium text-green-900">{state.user?.location}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-green-700">Property Details</Label>
                <p className="font-medium text-green-900">{state.user?.propertyType}</p>
                {state.user?.propertySize && <p className="text-sm text-green-800">Size: {state.user.propertySize}</p>}
              </div>
              <div>
                <Label className="text-green-700">Insurance Status</Label>
                <p className="font-medium text-green-900">
                  {state.user?.hasInsurance ? "✅ Insured" : "❌ Not Insured"}
                </p>
              </div>
            </div>
          </div>

          {state.user?.emergencyTypes && state.user.emergencyTypes.length > 0 && (
            <div>
              <Label className="text-green-700">Emergency Preparedness</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {state.user.emergencyTypes.map((type: string) => {
                  const emergencyType = emergencyTypes.find((et) => et.id === type)
                  return (
                    <span key={type} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      {emergencyType?.icon} {emergencyType?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          <Alert className="border-green-300 bg-green-100">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {state.user?.wantsAlerts
                ? "✅ You'll receive emergency alerts and community updates"
                : "📧 You can enable alerts anytime in your settings"}
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">Access Dashboard</Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
              Create Emergency Plan
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
              Join Community
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Join Rural Community Hub
        </CardTitle>
        <CardDescription>Complete setup to access emergency planning and community features</CardDescription>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" type="text" placeholder="John Smith" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="0412 345 678" />
              </div>
            </div>
          )}

          {/* Step 2: Location & Property */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location & Property Details
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Town/City *</Label>
                  <Input id="location" name="location" type="text" placeholder="Tamworth" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Territory *</Label>
                  <Select name="state" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
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
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" name="postcode" type="text" placeholder="2340" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select name="propertyType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your property type" />
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

                <div className="space-y-2">
                  <Label htmlFor="propertySize">Property Size</Label>
                  <Select name="propertySize">
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
            </div>
          )}

          {/* Step 3: Emergency Preparedness */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Emergency Preparedness
              </h3>

              <div>
                <Label className="text-base">Which emergency types affect your area?</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {emergencyTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedEmergencyTypes.includes(type.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleEmergencyTypeToggle(type.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{type.icon}</span>
                        <div>
                          <h4 className="font-medium text-sm">{type.label}</h4>
                          <p className="text-xs text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasInsurance" checked={hasInsurance} onCheckedChange={setHasInsurance} />
                  <Label htmlFor="hasInsurance">I have rural/farm insurance coverage</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="wantsAlerts" checked={wantsAlerts} onCheckedChange={setWantsAlerts} />
                  <Label htmlFor="wantsAlerts">Send me emergency alerts and weather warnings</Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Agreement */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Complete Your Registration
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">You're almost done!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Review your information and agree to our terms to complete your registration.
                </p>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Emergency Types:</strong> {selectedEmergencyTypes.length} selected
                  </p>
                  <p>
                    <strong>Insurance:</strong> {hasInsurance ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Alerts:</strong> {wantsAlerts ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="agreedToTerms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} required />
                <Label htmlFor="agreedToTerms" className="text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy. I understand that this platform provides emergency
                  planning tools and community features for rural properties. I consent to receiving emergency
                  notifications and community updates as selected above.
                </Label>
              </div>
            </div>
          )}

          {state?.message && (
            <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {state.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                {state.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !agreedToTerms} className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
