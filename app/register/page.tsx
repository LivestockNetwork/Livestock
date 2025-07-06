"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, ArrowRight, CheckCircle, MapPin, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    region: "",
    postcode: "",
    propertyType: "",
    emergencyContact: "",
    emergencyPhone: "",
    hasLivestock: false,
    livestockTypes: [] as string[],
    agreedToTerms: false,
    wantsUpdates: true,
  })

  const australianStates = [
    { value: "nsw", label: "New South Wales" },
    { value: "vic", label: "Victoria" },
    { value: "qld", label: "Queensland" },
    { value: "wa", label: "Western Australia" },
    { value: "sa", label: "South Australia" },
    { value: "tas", label: "Tasmania" },
    { value: "act", label: "Australian Capital Territory" },
    { value: "nt", label: "Northern Territory" },
  ]

  const propertyTypes = [
    "Cattle Station",
    "Sheep Farm",
    "Mixed Farming",
    "Crop Farm",
    "Dairy Farm",
    "Horse Stud",
    "Rural Residential",
    "Other",
  ]

  const livestockOptions = ["Cattle", "Sheep", "Horses", "Pigs", "Goats", "Poultry", "Other"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLivestockChange = (livestock: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      livestockTypes: checked
        ? [...prev.livestockTypes, livestock]
        : prev.livestockTypes.filter((l) => l !== livestock),
    }))
  }

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        )
      case 2:
        return formData.state && formData.postcode && formData.propertyType
      case 3:
        return formData.emergencyContact && formData.emergencyPhone && formData.agreedToTerms
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Make sure all fields are filled out correctly before continuing.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast({
        title: "Please complete all required fields",
        description: "Make sure all fields are filled out correctly.",
        variant: "destructive",
      })
      return
    }

    // Store user data in localStorage for demo
    const userData = {
      ...formData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
      isVerified: false,
    }

    localStorage.setItem("currentUser", JSON.stringify(userData))

    // Store in users list
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    existingUsers.push(userData)
    localStorage.setItem("users", JSON.stringify(existingUsers))

    toast({
      title: "Registration successful!",
      description: "Welcome to Rural Community Hub. You can now access your dashboard.",
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Rural Community Hub</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Connect with rural Australia and create your emergency plan</p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-full h-1 mx-4 ${step > stepNumber ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Location & Property</span>
            <span>Emergency Details</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && (
                  <>
                    <User className="h-5 w-5" /> Personal Information
                  </>
                )}
                {step === 2 && (
                  <>
                    <MapPin className="h-5 w-5" /> Location & Property Details
                  </>
                )}
                {step === 3 && (
                  <>
                    <Shield className="h-5 w-5" /> Emergency Preparedness
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Let's start with your basic information"}
                {step === 2 && "Tell us about your location and property"}
                {step === 3 && "Set up your emergency contacts and preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="0400 000 000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a strong password"
                      />
                    </div>
                    <div>
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

                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <Alert variant="destructive">
                      <AlertDescription>Passwords do not match</AlertDescription>
                    </Alert>
                  )}
                </>
              )}

              {/* Step 2: Location & Property */}
              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State/Territory *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
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
                    <div>
                      <Label htmlFor="postcode">Postcode *</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange("postcode", e.target.value)}
                        placeholder="2000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="region">Region/Town</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleInputChange("region", e.target.value)}
                      placeholder="e.g., Hunter Valley, Gippsland"
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange("propertyType", value)}
                    >
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

                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="hasLivestock"
                        checked={formData.hasLivestock}
                        onCheckedChange={(checked) => handleInputChange("hasLivestock", checked)}
                      />
                      <Label htmlFor="hasLivestock">I have livestock on my property</Label>
                    </div>

                    {formData.hasLivestock && (
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Livestock Types</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {livestockOptions.map((livestock) => (
                            <div key={livestock} className="flex items-center space-x-2">
                              <Checkbox
                                id={livestock}
                                checked={formData.livestockTypes.includes(livestock)}
                                onCheckedChange={(checked) => handleLivestockChange(livestock, checked as boolean)}
                              />
                              <Label htmlFor={livestock} className="text-sm">
                                {livestock}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Emergency Details */}
              {step === 3 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        placeholder="Contact person's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wantsUpdates"
                        checked={formData.wantsUpdates}
                        onCheckedChange={(checked) => handleInputChange("wantsUpdates", checked)}
                      />
                      <Label htmlFor="wantsUpdates">I want to receive emergency alerts and community updates</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked)}
                      />
                      <Label htmlFor="agreedToTerms">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-green-600 hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        *
                      </Label>
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your information is secure and will only be used for emergency planning and community
                      coordination. We never share your personal details without your consent.
                    </AlertDescription>
                  </Alert>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                {step < 3 ? (
                  <Button onClick={nextStep} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex items-center gap-2">
                    Complete Registration
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
