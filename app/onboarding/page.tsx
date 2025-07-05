"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Users, Heart, CheckCircle, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface OnboardingData {
  location: {
    postcode: string
    town: string
    state: string
    region: string
  }
  personalInfo: {
    firstName: string
    lastName: string
    email: string
  }
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    location: { postcode: "", town: "", state: "", region: "" },
    personalInfo: { firstName: "", lastName: "", email: "" },
  })
  const [showWelcome, setShowWelcome] = useState(false)
  const [detectedLocation, setDetectedLocation] = useState<any>(null)

  const totalSteps = 2

  // Mock location detection based on postcode
  const detectLocation = (postcode: string) => {
    const locationMap: { [key: string]: any } = {
      "2430": { town: "Taree", state: "NSW", region: "Manning Valley", members: 450 },
      "2431": { town: "Wingham", state: "NSW", region: "Manning Valley", members: 450 },
      "2421": { town: "Gloucester", state: "NSW", region: "Manning Valley", members: 450 },
      "2325": { town: "Muswellbrook", state: "NSW", region: "Hunter Valley", members: 380 },
      "2330": { town: "Singleton", state: "NSW", region: "Hunter Valley", members: 380 },
      "2650": { town: "Wagga Wagga", state: "NSW", region: "Riverina", members: 520 },
      "2678": { town: "Griffith", state: "NSW", region: "Riverina", members: 520 },
      "4350": { town: "Toowoomba", state: "QLD", region: "Darling Downs", members: 290 },
      "4570": { town: "Gympie", state: "QLD", region: "Wide Bay", members: 180 },
    }

    return locationMap[postcode] || null
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

  const handlePostcodeChange = (postcode: string) => {
    setOnboardingData({
      ...onboardingData,
      location: { ...onboardingData.location, postcode },
    })

    if (postcode.length === 4) {
      const detected = detectLocation(postcode)
      if (detected) {
        setDetectedLocation(detected)
        setOnboardingData({
          ...onboardingData,
          location: {
            postcode,
            town: detected.town,
            state: detected.state,
            region: detected.region,
          },
        })
      } else {
        setDetectedLocation(null)
        // Still allow progression for unknown postcodes
        setOnboardingData({
          ...onboardingData,
          location: {
            postcode,
            town: "Your Area",
            state: "Australia",
            region: "Rural Community",
          },
        })
      }
    }
  }

  const completeOnboarding = () => {
    setShowWelcome(true)
  }

  // Validation functions
  const isStep1Valid = () => {
    return onboardingData.location.postcode.length === 4
  }

  const isStep2Valid = () => {
    return (
      onboardingData.personalInfo.firstName.trim() !== "" &&
      onboardingData.personalInfo.lastName.trim() !== "" &&
      onboardingData.personalInfo.email.trim() !== ""
    )
  }

  if (showWelcome) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
      >
        <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div
            className="p-8 text-white text-center"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Your Rural Community!</h2>
              <p className="text-xl opacity-90">
                You're now connected with {detectedLocation?.members || "200+"}+ rural families in{" "}
                {onboardingData.location.region}
              </p>
            </div>
          </div>

          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">What would you like to do next?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Entry Option */}
                <Card
                  className="border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer"
                  onClick={() => (window.location.href = "/community")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Jump Right In</h4>
                    <p className="text-slate-600 mb-4">
                      Start connecting with your local rural community right away. You can complete your profile
                      anytime.
                    </p>
                    <Button
                      size="lg"
                      className="text-white font-bold w-full"
                      style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Enter Community
                    </Button>
                  </CardContent>
                </Card>

                {/* Complete Profile Option */}
                <Card
                  className="border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer"
                  onClick={() => (window.location.href = "/profile-setup")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Complete Your Profile</h4>
                    <p className="text-slate-600 mb-4">
                      Add details about your property, livestock, and what help you can offer or need.
                    </p>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full font-bold bg-transparent"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Set Up Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-xl text-center">
              <h4 className="font-bold text-slate-800 mb-2">✅ You're all set!</h4>
              <p className="text-sm text-slate-600 mb-3">
                We've sent a welcome email to <strong>{onboardingData.personalInfo.email}</strong>
              </p>
              <p className="text-xs text-slate-500">
                You can always complete your profile later from your account settings.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                className="text-slate-500 hover:text-slate-700"
                onClick={() => (window.location.href = "/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Header with clickable logo */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Rural Community Hub</span>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Join Your Rural Community</h2>
                <p className="opacity-90">Quick 2-step signup - takes less than 1 minute</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-white/20 text-white">
                Step {currentStep} of {totalSteps}
              </Badge>
              <div className="text-sm opacity-80">{Math.round((currentStep / totalSteps) * 100)}% Complete</div>
            </div>

            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Where are you located?</h3>
                <p className="text-slate-600 mb-6">We'll connect you with your local rural community</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Postcode</label>
                    <Input
                      type="text"
                      placeholder="e.g. 2430"
                      value={onboardingData.location.postcode}
                      onChange={(e) => handlePostcodeChange(e.target.value)}
                      className="text-lg p-4 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                      maxLength={4}
                    />
                  </div>

                  {detectedLocation && (
                    <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">Great! We found your community:</span>
                      </div>
                      <div className="text-green-700">
                        <div className="font-bold text-lg">
                          {detectedLocation.town}, {detectedLocation.state}
                        </div>
                        <div className="text-sm">
                          {detectedLocation.region} • {detectedLocation.members}+ active members
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingData.location.postcode.length === 4 && !detectedLocation && (
                    <div className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-amber-600" />
                        <span className="font-semibold text-amber-800">We're expanding to your area!</span>
                      </div>
                      <div className="text-amber-700 text-sm">
                        We don't have an active community in this postcode yet, but we'll help you start one. You'll be
                        one of the founding members!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Basic Contact Info */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your basic details</h3>
                <p className="text-slate-600 mb-6">Just the essentials to get you connected</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <Input
                        type="text"
                        placeholder="John"
                        value={onboardingData.personalInfo.firstName}
                        onChange={(e) =>
                          setOnboardingData({
                            ...onboardingData,
                            personalInfo: { ...onboardingData.personalInfo, firstName: e.target.value },
                          })
                        }
                        className="p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <Input
                        type="text"
                        placeholder="Smith"
                        value={onboardingData.personalInfo.lastName}
                        onChange={(e) =>
                          setOnboardingData({
                            ...onboardingData,
                            personalInfo: { ...onboardingData.personalInfo, lastName: e.target.value },
                          })
                        }
                        className="p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={onboardingData.personalInfo.email}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          personalInfo: { ...onboardingData.personalInfo, email: e.target.value },
                        })
                      }
                      className="p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-xl text-sm text-slate-700">
                  <p className="font-semibold text-green-800 mb-2">✅ That's it! You're almost in.</p>
                  <p>
                    After joining, you can optionally add details about your property, livestock, and what help you
                    need.
                    <strong> But you can start connecting right away!</strong>
                  </p>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                  <p>
                    <strong>Privacy:</strong> Your details are only shared with verified rural community members in your
                    local area. We never sell your information.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-slate-300 text-slate-700 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={completeOnboarding}
                  disabled={!isStep2Valid()}
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
