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
import { Loader2, CheckCircle, AlertCircle, User, MapPin, Shield } from "lucide-react"

// Onboarding action
async function processOnboarding(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const state = formData.get("state") as string
  const propertyType = formData.get("propertyType") as string
  const emergencyTypes = formData.getAll("emergencyTypes") as string[]
  const agreedToTerms = formData.get("agreedToTerms") === "on"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!firstName || !email || !location || !state || !propertyType) {
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

  return {
    success: true,
    message: `Welcome to Rural Community Hub, ${firstName}! Your account has been created.`,
    step: "complete",
    user: {
      firstName,
      lastName,
      email,
      location: `${location}, ${state}`,
      propertyType,
      emergencyTypes,
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
  { id: "bushfire", label: "Bushfire", icon: "🔥" },
  { id: "flood", label: "Flood", icon: "🌊" },
  { id: "storm", label: "Severe Weather", icon: "⛈️" },
  { id: "drought", label: "Drought", icon: "☀️" },
]

export function OnboardingProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

export function UserOnboardingSystem() {
  const [state, formAction] = useFormState(processOnboarding, initialState)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEmergencyTypes, setSelectedEmergencyTypes] = useState<string[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    selectedEmergencyTypes.forEach((type) => {
      formData.append("emergencyTypes", type)
    })

    if (agreedToTerms) {
      formData.append("agreedToTerms", "on")
    }

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
      <Card className="w-full max-w-2xl mx-auto border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Welcome to Rural Community Hub!
          </CardTitle>
          <CardDescription className="text-green-700">
            Your account has been successfully created, {state.user?.firstName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-green-700">Location</Label>
              <p className="font-medium text-green-900">{state.user?.location}</p>
            </div>
            <div>
              <Label className="text-green-700">Property Type</Label>
              <p className="font-medium text-green-900">{state.user?.propertyType}</p>
            </div>
          </div>

          {state.user?.emergencyTypes && state.user.emergencyTypes.length > 0 && (
            <div>
              <Label className="text-green-700">Emergency Preparedness</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {state.user.emergencyTypes.map((type: string) => {
                  const emergencyType = emergencyTypes.find((et) => et.id === type)
                  return (
                    <span key={type} className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                      {emergencyType?.icon} {emergencyType?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">Access Dashboard</Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
              Create Emergency Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Join Rural Community Hub
        </CardTitle>
        <CardDescription>Quick setup to get you connected with your rural community</CardDescription>
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
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
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" type="text" placeholder="John" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text" placeholder="Smith" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
          )}

          {/* Step 2: Location & Property */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location & Property
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

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
                <div className="grid grid-cols-2 gap-3 mt-3">
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
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{type.icon}</span>
                        <span className="font-medium text-sm">{type.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="agreedToTerms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} required />
                <Label htmlFor="agreedToTerms" className="text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy. I understand that this platform provides emergency
                  planning tools and community features for rural properties.
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
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !agreedToTerms}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Export the main component as default
export default UserOnboardingSystem
