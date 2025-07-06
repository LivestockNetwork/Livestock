"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, MapPin, Home, Users, Heart, CheckCircle } from "lucide-react"

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    location: "",
    propertyType: "",
    primaryInterest: "",
    helpAvailable: "",
  })

  const totalSteps = 4

  const locationOptions = [
    { value: "nsw-hunter", label: "NSW - Hunter Valley" },
    { value: "nsw-central-coast", label: "NSW - Central Coast" },
    { value: "nsw-mid-north-coast", label: "NSW - Mid North Coast" },
    { value: "nsw-northern-rivers", label: "NSW - Northern Rivers" },
    { value: "nsw-new-england", label: "NSW - New England" },
    { value: "nsw-central-west", label: "NSW - Central West" },
    { value: "nsw-riverina", label: "NSW - Riverina" },
    { value: "nsw-south-coast", label: "NSW - South Coast" },
    { value: "qld-darling-downs", label: "QLD - Darling Downs" },
    { value: "qld-wide-bay", label: "QLD - Wide Bay" },
    { value: "qld-central-queensland", label: "QLD - Central Queensland" },
    { value: "qld-north-queensland", label: "QLD - North Queensland" },
    { value: "vic-goulburn-valley", label: "VIC - Goulburn Valley" },
    { value: "vic-western-district", label: "VIC - Western District" },
    { value: "vic-gippsland", label: "VIC - Gippsland" },
    { value: "wa-wheatbelt", label: "WA - Wheatbelt" },
    { value: "wa-great-southern", label: "WA - Great Southern" },
    { value: "sa-riverland", label: "SA - Riverland" },
    { value: "sa-limestone-coast", label: "SA - Limestone Coast" },
    { value: "tas-north", label: "TAS - North" },
    { value: "tas-south", label: "TAS - South" },
    { value: "other", label: "Other region" },
  ]

  const propertyOptions = [
    { value: "cattle-small", label: "Cattle (Small - under 100 head)" },
    { value: "cattle-medium", label: "Cattle (Medium - 100-500 head)" },
    { value: "cattle-large", label: "Cattle (Large - 500+ head)" },
    { value: "sheep-small", label: "Sheep (Small - under 500 head)" },
    { value: "sheep-medium", label: "Sheep (Medium - 500-2000 head)" },
    { value: "sheep-large", label: "Sheep (Large - 2000+ head)" },
    { value: "mixed-livestock", label: "Mixed Livestock" },
    { value: "dairy", label: "Dairy Farm" },
    { value: "cropping-small", label: "Cropping (Small - under 200ha)" },
    { value: "cropping-medium", label: "Cropping (Medium - 200-1000ha)" },
    { value: "cropping-large", label: "Cropping (Large - 1000ha+)" },
    { value: "horticulture", label: "Horticulture/Fruit Growing" },
    { value: "viticulture", label: "Viticulture/Wine Grapes" },
    { value: "horse-stud", label: "Horse Stud/Breeding" },
    { value: "lifestyle-small", label: "Lifestyle Block (under 10ha)" },
    { value: "lifestyle-medium", label: "Lifestyle Block (10-50ha)" },
    { value: "rural-residential", label: "Rural Residential" },
    { value: "other", label: "Other Rural Property" },
  ]

  const interestOptions = [
    { value: "emergency-prep", label: "Emergency Preparedness & Safety" },
    { value: "community-events", label: "Community Events & Social" },
    { value: "equipment-sharing", label: "Equipment Sharing & Hire" },
    { value: "livestock-advice", label: "Livestock Management & Advice" },
    { value: "crop-farming", label: "Crop Farming & Techniques" },
    { value: "weather-climate", label: "Weather & Climate Information" },
    { value: "market-prices", label: "Market Prices & Trading" },
    { value: "local-services", label: "Local Services & Contractors" },
    { value: "agistment", label: "Agistment & Grazing" },
    { value: "rural-lifestyle", label: "Rural Lifestyle & Living" },
    { value: "environmental", label: "Environmental & Sustainability" },
    { value: "all-topics", label: "All Topics - I'm interested in everything!" },
  ]

  const helpOptions = [
    { value: "equipment-tractor", label: "Tractor & Heavy Equipment" },
    { value: "equipment-tools", label: "Tools & Small Equipment" },
    { value: "transport-livestock", label: "Livestock Transport" },
    { value: "transport-general", label: "General Transport & Delivery" },
    { value: "agistment-cattle", label: "Cattle Agistment" },
    { value: "agistment-sheep", label: "Sheep Agistment" },
    { value: "agistment-horses", label: "Horse Agistment" },
    { value: "labor-harvest", label: "Harvest & Seasonal Labor" },
    { value: "labor-general", label: "General Farm Labor" },
    { value: "knowledge-livestock", label: "Livestock Knowledge & Advice" },
    { value: "knowledge-crops", label: "Crop Knowledge & Advice" },
    { value: "emergency-support", label: "Emergency Support & Assistance" },
    { value: "local-knowledge", label: "Local Area Knowledge" },
    { value: "social-support", label: "Social Support & Friendship" },
    { value: "not-sure", label: "Not sure yet - still exploring" },
  ]

  const updateProfileData = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    const currentFieldValue = getCurrentFieldValue()
    if (!currentFieldValue) {
      toast({
        title: "Please make a selection",
        description: "Choose an option before continuing",
        variant: "destructive",
      })
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const getCurrentFieldValue = () => {
    switch (currentStep) {
      case 1:
        return profileData.location
      case 2:
        return profileData.propertyType
      case 3:
        return profileData.primaryInterest
      case 4:
        return profileData.helpAvailable
      default:
        return ""
    }
  }

  const completeSetup = async () => {
    if (!profileData.helpAvailable) {
      toast({
        title: "Please make a selection",
        description: "Choose an option before completing setup",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate saving profile data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile Complete! 🎉",
        description: "Welcome to your rural community. Redirecting to your dashboard...",
      })

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                Where are you located?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                This helps us connect you with nearby rural families
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="location" className="text-sm font-medium text-slate-700 block">
                Select your region
              </Label>
              <Select value={profileData.location} onValueChange={(value) => updateProfileData("location", value)}>
                <SelectTrigger className="h-12 w-full text-left">
                  <SelectValue placeholder="Choose your region..." />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <Home className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                What's your property type?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                This helps us show you relevant information and connections
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="propertyType" className="text-sm font-medium text-slate-700 block">
                Select your property type
              </Label>
              <Select
                value={profileData.propertyType}
                onValueChange={(value) => updateProfileData("propertyType", value)}
              >
                <SelectTrigger className="h-12 w-full text-left">
                  <SelectValue placeholder="Choose your property type..." />
                </SelectTrigger>
                <SelectContent>
                  {propertyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                What interests you most?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                We'll prioritize showing you relevant posts and discussions
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="primaryInterest" className="text-sm font-medium text-slate-700 block">
                Select your primary interest
              </Label>
              <Select
                value={profileData.primaryInterest}
                onValueChange={(value) => updateProfileData("primaryInterest", value)}
              >
                <SelectTrigger className="h-12 w-full text-left">
                  <SelectValue placeholder="Choose what interests you most..." />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                How can you help others?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Rural communities are strongest when we help each other
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="helpAvailable" className="text-sm font-medium text-slate-700 block">
                What help can you offer?
              </Label>
              <Select
                value={profileData.helpAvailable}
                onValueChange={(value) => updateProfileData("helpAvailable", value)}
              >
                <SelectTrigger className="h-12 w-full text-left">
                  <SelectValue placeholder="Choose how you can help..." />
                </SelectTrigger>
                <SelectContent>
                  {helpOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">🇦🇺 You're Ready!</h3>
              <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                Once you complete setup, you'll have full access to your rural community network with emergency tools,
                local connections, and resource sharing.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 sm:py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-slate-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800">Complete Your Profile</CardTitle>
            <CardDescription className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Just 4 quick questions to personalize your experience
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 pt-6 border-t border-slate-200 gap-4">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="px-4 sm:px-6 bg-transparent flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="px-4 sm:px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex-shrink-0"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={completeSetup}
                  disabled={isLoading}
                  className="px-6 sm:px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex-shrink-0"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Completing Setup...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Don't worry - you can change these settings anytime in your profile
          </p>
        </div>
      </div>
    </div>
  )
}
