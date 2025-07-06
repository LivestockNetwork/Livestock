"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, MapPin, User, Shield, Bell } from "lucide-react"

interface OnboardingData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
  }
  locationInfo: {
    address: string
    suburb: string
    state: string
    postcode: string
    propertyType: string
    propertySize: string
  }
  livestockInfo: {
    hasLivestock: boolean
    livestockTypes: string[]
    animalCount: number
    primaryPurpose: string
  }
  emergencyInfo: {
    emergencyContact: string
    emergencyPhone: string
    medicalConditions: string
    specialNeeds: string
  }
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    communityParticipation: boolean
    dataSharing: boolean
  }
}

interface OnboardingState {
  success: boolean
  message: string
  errors: Record<string, string>
  data?: OnboardingData
}

async function submitOnboardingAction(prevState: OnboardingState | null, formData: FormData): Promise<OnboardingState> {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const data: OnboardingData = {
      personalInfo: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
      },
      locationInfo: {
        address: formData.get("address") as string,
        suburb: formData.get("suburb") as string,
        state: formData.get("state") as string,
        postcode: formData.get("postcode") as string,
        propertyType: formData.get("propertyType") as string,
        propertySize: formData.get("propertySize") as string,
      },
      livestockInfo: {
        hasLivestock: formData.get("hasLivestock") === "true",
        livestockTypes: formData.getAll("livestockTypes") as string[],
        animalCount: Number.parseInt(formData.get("animalCount") as string) || 0,
        primaryPurpose: formData.get("primaryPurpose") as string,
      },
      emergencyInfo: {
        emergencyContact: formData.get("emergencyContact") as string,
        emergencyPhone: formData.get("emergencyPhone") as string,
        medicalConditions: formData.get("medicalConditions") as string,
        specialNeeds: formData.get("specialNeeds") as string,
      },
      preferences: {
        notifications: formData.get("notifications") === "true",
        emailUpdates: formData.get("emailUpdates") === "true",
        communityParticipation: formData.get("communityParticipation") === "true",
        dataSharing: formData.get("dataSharing") === "true",
      },
    }

    return {
      success: true,
      message: "Onboarding completed successfully! Welcome to the Livestock Emergency Network.",
      errors: {},
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to complete onboarding. Please try again.",
      errors: { general: "An unexpected error occurred" },
    }
  }
}

export function UserOnboardingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [state, formAction, isPending] = useFormState(submitOnboardingAction, null)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Location & Property</h3>
              <p className="text-gray-600">Tell us about your property</p>
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" name="address" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="suburb">Suburb</Label>
                <Input id="suburb" name="suburb" required />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" name="postcode" required />
              </div>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select name="state" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">New South Wales</SelectItem>
                  <SelectItem value="VIC">Victoria</SelectItem>
                  <SelectItem value="QLD">Queensland</SelectItem>
                  <SelectItem value="WA">Western Australia</SelectItem>
                  <SelectItem value="SA">South Australia</SelectItem>
                  <SelectItem value="TAS">Tasmania</SelectItem>
                  <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                  <SelectItem value="NT">Northern Territory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select name="propertyType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farm">Farm</SelectItem>
                  <SelectItem value="hobby-farm">Hobby Farm</SelectItem>
                  <SelectItem value="rural-residential">Rural Residential</SelectItem>
                  <SelectItem value="grazing">Grazing Property</SelectItem>
                  <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertySize">Property Size (hectares)</Label>
              <Input id="propertySize" name="propertySize" type="number" min="0" step="0.1" />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="h-12 w-12 text-orange-600 mx-auto mb-4 text-2xl">🐄</div>
              <h3 className="text-xl font-semibold">Livestock Information</h3>
              <p className="text-gray-600">Details about your animals</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="hasLivestock" name="hasLivestock" value="true" />
              <Label htmlFor="hasLivestock">I have livestock on my property</Label>
            </div>

            <div>
              <Label>Livestock Types (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Cattle", "Sheep", "Goats", "Pigs", "Horses", "Poultry", "Alpacas", "Other"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} name="livestockTypes" value={type.toLowerCase()} />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="animalCount">Total Number of Animals</Label>
              <Input id="animalCount" name="animalCount" type="number" min="0" />
            </div>

            <div>
              <Label htmlFor="primaryPurpose">Primary Purpose</Label>
              <Select name="primaryPurpose">
                <SelectTrigger>
                  <SelectValue placeholder="Select primary purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial Production</SelectItem>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="hobby">Hobby/Personal Use</SelectItem>
                  <SelectItem value="agistment">Agistment</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Emergency Information</h3>
              <p className="text-gray-600">Important details for emergency situations</p>
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input id="emergencyContact" name="emergencyContact" required />
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input id="emergencyPhone" name="emergencyPhone" type="tel" required />
            </div>

            <div>
              <Label htmlFor="medicalConditions">Medical Conditions (optional)</Label>
              <Input
                id="medicalConditions"
                name="medicalConditions"
                placeholder="Any medical conditions we should be aware of"
              />
            </div>

            <div>
              <Label htmlFor="specialNeeds">Special Needs or Requirements (optional)</Label>
              <Input
                id="specialNeeds"
                name="specialNeeds"
                placeholder="Mobility issues, medication requirements, etc."
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Bell className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Preferences & Consent</h3>
              <p className="text-gray-600">How would you like to stay connected?</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="notifications" name="notifications" value="true" defaultChecked />
                <Label htmlFor="notifications">Receive emergency notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="emailUpdates" name="emailUpdates" value="true" defaultChecked />
                <Label htmlFor="emailUpdates">Receive email updates and newsletters</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="communityParticipation" name="communityParticipation" value="true" />
                <Label htmlFor="communityParticipation">Participate in community discussions</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="dataSharing" name="dataSharing" value="true" />
                <Label htmlFor="dataSharing">Share anonymized data for research purposes</Label>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                By completing this onboarding, you agree to our Terms of Service and Privacy Policy. Your information
                will be used to provide emergency services and community support.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  if (state?.success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome to the Network!</h2>
            <p className="text-green-700 mb-6">{state.message}</p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Check your email for a welcome message</li>
                <li>• Explore the community features</li>
                <li>• Set up your emergency plan</li>
                <li>• Connect with local livestock owners</li>
              </ul>
            </div>

            <Button className="w-full">Go to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Livestock Emergency Network - Onboarding</span>
          <Badge variant="outline">
            Step {currentStep} of {totalSteps}
          </Badge>
        </CardTitle>
        <div className="w-full">
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>

      <CardContent>
        {state?.errors.general && (
          <Alert className="mb-4">
            <AlertDescription>{state.errors.general}</AlertDescription>
          </Alert>
        )}

        <form action={formAction}>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  "Complete Onboarding"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function OnboardingProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  )
}
