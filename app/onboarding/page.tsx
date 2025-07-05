"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, MapPin, Users, Heart, CheckCircle } from "lucide-react"

interface OnboardingData {
  location: {
    postcode: string
    town: string
    state: string
    region: string
  }
  propertyType: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    location: { postcode: "", town: "", state: "", region: "" },
    propertyType: "",
    personalInfo: { firstName: "", lastName: "", email: "", phone: "" },
  })
  const [showWelcome, setShowWelcome] = useState(false)
  const [detectedLocation, setDetectedLocation] = useState<any>(null)

  const totalSteps = 3

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

  const propertyTypes = [
    { id: "cattle-farm", label: "🐄 Cattle Farm", description: "Beef or dairy operation" },
    { id: "horse-property", label: "🐴 Horse Property", description: "Agistment, breeding, riding" },
    { id: "mixed-farm", label: "🚜 Mixed Farm", description: "Crops and livestock" },
    { id: "hobby-farm", label: "🐓 Hobby Farm", description: "Lifestyle property with animals" },
    { id: "cropping", label: "🌾 Cropping", description: "Grain, hay, or other crops" },
    { id: "rural-residential", label: "🏡 Rural Residential", description: "Rural living, small acreage" },
    { id: "town-resident", label: "🏘️ Town Resident", description: "Live in rural town, support rural community" },
  ]

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
    return onboardingData.propertyType !== ""
  }

  const isStep3Valid = () => {
    return (
      onboardingData.personalInfo.firstName.trim() !== "" &&
      onboardingData.personalInfo.lastName.trim() !== "" &&
      onboardingData.personalInfo.email.trim() !== "" &&
      onboardingData.personalInfo.phone.trim() !== ""
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
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Check your email</div>
                    <div className="text-sm text-slate-600">
                      We've sent you a welcome email with your community access details
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Access your community platform</div>
                    <div className="text-sm text-slate-600">
                      Connect instantly with {onboardingData.location.region} rural community
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Complete your profile</div>
                    <div className="text-sm text-slate-600">
                      Add more details about what you can offer and need help with
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-white font-bold flex-1"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                onClick={() => (window.location.href = "/community")}
              >
                <Users className="h-5 w-5 mr-2" />
                Enter Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 bg-transparent"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center">
              <p className="text-sm text-slate-600">
                <strong>Need help getting started?</strong>
                <br />
                Call our rural community coordinator: <strong>(02) 1234 5678</strong>
              </p>
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
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Join Your Rural Community</h2>
                <p className="opacity-90">Quick 3-step signup - takes less than 2 minutes</p>
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

            {/* Step 2: Property Type */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">What type of property do you have?</h3>
                <p className="text-slate-600 mb-6">This helps us connect you with similar rural families</p>

                <div className="space-y-3">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={onboardingData.propertyType === type.id ? "default" : "outline"}
                      onClick={() => setOnboardingData({ ...onboardingData, propertyType: type.id })}
                      className={`w-full p-4 h-auto text-left ${
                        onboardingData.propertyType === type.id
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-lg">{type.label}</div>
                        <div className="text-sm opacity-80">{type.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Personal Information */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your contact details</h3>
                <p className="text-slate-600 mb-6">So your local rural community can connect with you</p>

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

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                    <Input
                      type="tel"
                      placeholder="0412 345 678"
                      value={onboardingData.personalInfo.phone}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          personalInfo: { ...onboardingData.personalInfo, phone: e.target.value },
                        })
                      }
                      className="p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                  <p>
                    <strong>Privacy:</strong> Your details are only shared with verified rural community members in your
                    local area. We never sell your information.
                  </p>
                  <p className="mt-2">
                    <strong>Next:</strong> After joining, you can add details about livestock, equipment, and what help
                    you need.
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
                  disabled={(currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid())}
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={completeOnboarding}
                  disabled={!isStep3Valid()}
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
