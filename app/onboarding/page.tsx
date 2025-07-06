"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, MapPin, User, Home, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const australianStates = [
  { code: "NSW", name: "New South Wales", emoji: "🏙️" },
  { code: "VIC", name: "Victoria", emoji: "🌿" },
  { code: "QLD", name: "Queensland", emoji: "☀️" },
  { code: "WA", name: "Western Australia", emoji: "🌊" },
  { code: "SA", name: "South Australia", emoji: "🍷" },
  { code: "TAS", name: "Tasmania", emoji: "🏔️" },
  { code: "ACT", name: "Australian Capital Territory", emoji: "🏛️" },
  { code: "NT", name: "Northern Territory", emoji: "🦘" },
]

const propertyTypes = [
  { id: "cattle", name: "Cattle Station", emoji: "🐄", description: "Beef cattle farming" },
  { id: "dairy", name: "Dairy Farm", emoji: "🥛", description: "Dairy cattle operation" },
  { id: "sheep", name: "Sheep Station", emoji: "🐑", description: "Sheep farming for wool/meat" },
  { id: "mixed", name: "Mixed Farming", emoji: "🌾", description: "Crops and livestock" },
  { id: "cropping", name: "Cropping", emoji: "🌽", description: "Grain and crop production" },
  { id: "horse", name: "Horse Stud", emoji: "🐎", description: "Horse breeding/training" },
  { id: "poultry", name: "Poultry Farm", emoji: "🐔", description: "Chicken/egg production" },
  { id: "vineyard", name: "Vineyard", emoji: "🍇", description: "Wine grape production" },
  { id: "orchard", name: "Orchard", emoji: "🍎", description: "Fruit tree farming" },
  { id: "other", name: "Other Rural", emoji: "🏡", description: "Other rural property" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    location: "",
    propertyType: "",
    propertySize: "",
    experience: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const progress = (step / 3) * 100

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user data in localStorage (same as login system)
    const userData = {
      name: formData.name,
      email: formData.email,
      location: `${formData.location}, ${formData.state}`,
      propertyType: propertyTypes.find((p) => p.id === formData.propertyType)?.name || formData.propertyType,
    }

    localStorage.setItem("currentUser", JSON.stringify(userData))
    localStorage.setItem("isLoggedIn", "true")

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.state && formData.location
      case 3:
        return formData.propertyType && formData.propertySize
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌾</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Rural Community Hub</h1>
          <p className="text-gray-600">Connect with your rural community in just 3 steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && (
                <>
                  <User className="h-5 w-5" /> Personal Information
                </>
              )}
              {step === 2 && (
                <>
                  <MapPin className="h-5 w-5" /> Location Details
                </>
              )}
              {step === 3 && (
                <>
                  <Home className="h-5 w-5" /> Property Information
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Where is your property located?"}
              {step === 3 && "What type of rural property do you have?"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0400 000 000"
                  />
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your information is secure and will only be shared with your local rural community members.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="state">State/Territory *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {australianStates.map((state) => (
                      <Button
                        key={state.code}
                        variant={formData.state === state.code ? "default" : "outline"}
                        className="justify-start h-auto p-3"
                        onClick={() => setFormData({ ...formData, state: state.code })}
                      >
                        <span className="mr-2">{state.emoji}</span>
                        <div className="text-left">
                          <div className="font-medium">{state.code}</div>
                          <div className="text-xs opacity-70">{state.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Town/Region *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Mudgee, Central Coast, Hunter Valley"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your nearest town or region to connect with local community members
                  </p>
                </div>

                {formData.state && (
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-teal-800 mb-2">
                      {australianStates.find((s) => s.code === formData.state)?.emoji} Welcome to {formData.state}!
                    </h4>
                    <p className="text-sm text-teal-700">
                      You'll be connected with rural community members in {formData.state} who can help during
                      emergencies and share local knowledge.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Property Information */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Property Type *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {propertyTypes.map((property) => (
                      <Button
                        key={property.id}
                        variant={formData.propertyType === property.id ? "default" : "outline"}
                        className="justify-start h-auto p-3"
                        onClick={() => setFormData({ ...formData, propertyType: property.id })}
                      >
                        <span className="mr-2">{property.emoji}</span>
                        <div className="text-left">
                          <div className="font-medium text-sm">{property.name}</div>
                          <div className="text-xs opacity-70">{property.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertySize">Property Size</Label>
                  <select
                    id="propertySize"
                    value={formData.propertySize}
                    onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select property size</option>
                    <option value="small">Small (Under 50 acres)</option>
                    <option value="medium">Medium (50-500 acres)</option>
                    <option value="large">Large (500-5,000 acres)</option>
                    <option value="station">Station (Over 5,000 acres)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="experience">Rural Experience</Label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select your experience level</option>
                    <option value="new">New to rural life (0-2 years)</option>
                    <option value="some">Some experience (2-10 years)</option>
                    <option value="experienced">Experienced (10+ years)</option>
                    <option value="generational">Generational farmer/grazier</option>
                  </select>
                </div>

                {formData.propertyType && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {propertyTypes.find((p) => p.id === formData.propertyType)?.emoji} Perfect!
                    </h4>
                    <p className="text-sm text-green-700">
                      You'll be connected with other{" "}
                      {propertyTypes.find((p) => p.id === formData.propertyType)?.name.toLowerCase()} operators in your
                      area who understand your specific challenges and opportunities.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Join Community
                      <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
