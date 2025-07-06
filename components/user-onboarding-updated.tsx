"use client"

import type React from "react"
import { Heart } from "lucide-react" // Import Heart icon

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Users,
  AlertTriangle,
  MapPin,
  Shield,
  Settings,
  Loader2,
} from "lucide-react"
import { saveUserOnboardingData, type UserOnboardingData } from "@/app/actions/user-onboarding"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  content: React.ReactNode
  completed: boolean
  required: boolean
}

export function UserOnboardingSystemWithBackend() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<UserOnboardingData>({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",

    // Step 2: Location
    postcode: "",
    suburb: "",
    state: "",
    propertyName: "",

    // Step 3: Profile
    propertyType: "",
    propertySize: "",
    livestock: [],
    equipment: [],
    skills: [],

    // Step 4: Community
    helpOffer: "",
    helpNeed: "",
    emergencyContact: "",

    // Step 5: Preferences
    notifications: {
      emergency: true,
      community: true,
      equipment: false,
      livestock: false,
    },
    privacy: "local",
  })

  const updateFormData = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleArrayUpdate = (field: keyof UserOnboardingData, item: string, checked: boolean) => {
    const currentArray = formData[field] as string[]
    if (checked) {
      updateFormData(field, [...currentArray, item])
    } else {
      updateFormData(
        field,
        currentArray.filter((i) => i !== item),
      )
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Basic Info
        return !!(formData.firstName && formData.lastName && formData.email && formData.password)
      case 1: // Location
        return !!(formData.postcode && formData.suburb && formData.state)
      case 2: // Profile
        return !!formData.propertyType
      case 3: // Community
        return true // Optional step
      case 4: // Preferences
        return true // Has defaults
      default:
        return true
    }
  }

  const completeOnboarding = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const result = await saveUserOnboardingData(formData)

      if (result.success) {
        setSubmitSuccess(result.message || "Welcome to Rural Community Hub!")
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "/community"
        }, 2000)
      } else {
        setSubmitError(result.error || "Failed to complete onboarding")
      }
    } catch (error) {
      console.error("Onboarding error:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "basic-info",
      title: "Let's Get You Started",
      description: "Tell us about yourself",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="Smith"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Mobile Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="0412 345 678"
            />
          </div>

          <div>
            <Label htmlFor="password">Create Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              placeholder="Choose a secure password"
              required
            />
          </div>

          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="text-sm text-teal-700">
              <strong>Why we need this:</strong> Your contact details help locals reach you during emergencies and for
              community coordination. We never share your information without permission.
            </p>
          </div>
        </div>
      ),
      completed: validateStep(0),
      required: true,
    },
    {
      id: "location",
      title: "Where Are You Located?",
      description: "Help us connect you with your local community",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              value={formData.postcode}
              onChange={(e) => updateFormData("postcode", e.target.value)}
              placeholder="2430"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="suburb">Suburb/Town *</Label>
              <Input
                id="suburb"
                value={formData.suburb}
                onChange={(e) => updateFormData("suburb", e.target.value)}
                placeholder="Taree"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">NSW</SelectItem>
                  <SelectItem value="QLD">QLD</SelectItem>
                  <SelectItem value="VIC">VIC</SelectItem>
                  <SelectItem value="WA">WA</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="TAS">TAS</SelectItem>
                  <SelectItem value="NT">NT</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="propertyName">Property Name (Optional)</Label>
            <Input
              id="propertyName"
              value={formData.propertyName}
              onChange={(e) => updateFormData("propertyName", e.target.value)}
              placeholder="e.g., Riverside Farm, Smith Station"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Finding your community:</strong> We'll connect you with rural locals within 50km who share your
              challenges and can help when needed.
            </p>
          </div>
        </div>
      ),
      completed: validateStep(1),
      required: true,
    },
    {
      id: "profile",
      title: "Tell Us About Your Place",
      description: "Help your community understand how to help you",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="propertyType">Property Type *</Label>
            <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cattle">Cattle Property</SelectItem>
                <SelectItem value="sheep">Sheep Property</SelectItem>
                <SelectItem value="mixed-livestock">Mixed Livestock</SelectItem>
                <SelectItem value="cropping">Cropping</SelectItem>
                <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                <SelectItem value="horse">Horse Property</SelectItem>
                <SelectItem value="hobby-farm">Hobby Farm</SelectItem>
                <SelectItem value="other">Other Rural Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="propertySize">Property Size</Label>
            <Select value={formData.propertySize} onValueChange={(value) => updateFormData("propertySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10">Under 10 hectares</SelectItem>
                <SelectItem value="10-50">10-50 hectares</SelectItem>
                <SelectItem value="50-200">50-200 hectares</SelectItem>
                <SelectItem value="200-500">200-500 hectares</SelectItem>
                <SelectItem value="500-1000">500-1000 hectares</SelectItem>
                <SelectItem value="over-1000">Over 1000 hectares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-semibold">Livestock (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {["Cattle", "Sheep", "Horses", "Pigs", "Poultry", "Goats", "Alpacas", "Other"].map((animal) => (
                <div key={animal} className="flex items-center space-x-2">
                  <Checkbox
                    id={animal.toLowerCase()}
                    checked={formData.livestock.includes(animal.toLowerCase())}
                    onCheckedChange={(checked) => handleArrayUpdate("livestock", animal.toLowerCase(), !!checked)}
                  />
                  <Label htmlFor={animal.toLowerCase()} className="text-sm">
                    {animal}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold">Equipment You Have (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {["Tractor", "Header/Harvester", "Truck", "Trailer", "Slasher", "Seeder", "Spray Rig", "Other"].map(
                (equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment.toLowerCase().replace("/", "-")}
                      checked={formData.equipment.includes(equipment.toLowerCase())}
                      onCheckedChange={(checked) => handleArrayUpdate("equipment", equipment.toLowerCase(), !!checked)}
                    />
                    <Label htmlFor={equipment.toLowerCase().replace("/", "-")} className="text-sm">
                      {equipment}
                    </Label>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      ),
      completed: validateStep(2),
      required: true,
    },
    {
      id: "community",
      title: "Community Support",
      description: "How can you help and be helped?",
      icon: Heart,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="helpOffer">What help can you offer to locals?</Label>
            <Textarea
              id="helpOffer"
              value={formData.helpOffer}
              onChange={(e) => updateFormData("helpOffer", e.target.value)}
              placeholder="e.g., Tractor work, transport, agistment, emergency shelter, local knowledge..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="helpNeed">What help might you need from locals?</Label>
            <Textarea
              id="helpNeed"
              value={formData.helpNeed}
              onChange={(e) => updateFormData("helpNeed", e.target.value)}
              placeholder="e.g., Equipment hire, emergency evacuation, temporary agistment, harvest help..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact (Name & Phone)</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => updateFormData("emergencyContact", e.target.value)}
              placeholder="e.g., Mary Smith - 0412 345 678"
            />
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Building resilience together:</strong> Rural communities are strongest when we know who can help
              and who might need help. This information helps coordinate support during emergencies and everyday
              challenges.
            </p>
          </div>
        </div>
      ),
      completed: validateStep(3),
      required: false,
    },
    {
      id: "preferences",
      title: "Final Settings",
      description: "Customize your experience",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Notification Preferences</Label>
            <div className="space-y-3">
              {[
                { key: "emergency", label: "Emergency Alerts", desc: "Urgent community emergencies and disasters" },
                { key: "community", label: "Community Updates", desc: "New posts and community activity" },
                { key: "equipment", label: "Equipment Sharing", desc: "Equipment available for hire/share" },
                { key: "livestock", label: "Livestock Sales", desc: "Livestock for sale in your area" },
              ].map((notification) => (
                <div key={notification.key} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Checkbox
                    id={notification.key}
                    checked={formData.notifications[notification.key as keyof typeof formData.notifications]}
                    onCheckedChange={(checked) => updateFormData(`notifications.${notification.key}`, checked)}
                  />
                  <div>
                    <Label htmlFor={notification.key} className="font-medium">
                      {notification.label}
                    </Label>
                    <p className="text-sm text-slate-600">{notification.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="privacy">Who can see your profile?</Label>
            <Select value={formData.privacy} onValueChange={(value) => updateFormData("privacy", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local community only (50km radius)</SelectItem>
                <SelectItem value="state">Entire state</SelectItem>
                <SelectItem value="australia">All of Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {submitError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{submitError}</AlertDescription>
            </Alert>
          )}

          {submitSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{submitSuccess}</AlertDescription>
            </Alert>
          )}

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>You're almost ready!</strong> Once you complete setup, you'll be connected with your local rural
              community and can start sharing, helping, and building relationships.
            </p>
          </div>
        </div>
      ),
      completed: validateStep(4),
      required: false,
    },
  ]

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    setShowOnboarding(false)
  }

  if (!showOnboarding) {
    return null
  }

  const currentOnboardingStep = onboardingSteps[currentStep]
  const completedSteps = onboardingSteps.filter((step) => step.completed).length
  const totalSteps = onboardingSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Getting Started</DialogTitle>
            <Button variant="ghost" size="sm" onClick={skipOnboarding}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={progressPercentage} className="flex-1" />
            <span className="text-sm text-slate-600">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? "bg-teal-500 text-white"
                      : step.completed
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className={`w-8 h-0.5 ${step.completed ? "bg-green-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentOnboardingStep.icon className="h-5 w-5 text-teal-600" />
                {currentOnboardingStep.title}
              </CardTitle>
              <p className="text-slate-600">{currentOnboardingStep.description}</p>
            </CardHeader>
            <CardContent>{currentOnboardingStep.content}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={skipOnboarding}>
                Skip Setup
              </Button>
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              {currentStep === onboardingSteps.length - 1 ? (
                <Button
                  onClick={completeOnboarding}
                  disabled={isSubmitting || !validateStep(currentStep)}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Join Community
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
