"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, MapPin, Users, Heart, CheckCircle, Flame, Droplets } from "lucide-react"

interface OnboardingData {
  location: {
    postcode: string
    town: string
    state: string
    region: string
  }
  propertyType: string
  propertySize: string
  livestock: string[]
  equipment: string[]
  canOffer: string[]
  needHelp: string[]
  emergencyInterest: string[]
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
    propertySize: "",
    livestock: [],
    equipment: [],
    canOffer: [],
    needHelp: [],
    emergencyInterest: [],
    personalInfo: { firstName: "", lastName: "", email: "", phone: "" },
  })
  const [showWelcome, setShowWelcome] = useState(false)
  const [detectedLocation, setDetectedLocation] = useState<any>(null)

  const totalSteps = 6

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

  const livestockOptions = [
    { id: "cattle", label: "🐄 Cattle" },
    { id: "horses", label: "🐴 Horses" },
    { id: "sheep", label: "🐑 Sheep" },
    { id: "goats", label: "🐐 Goats" },
    { id: "pigs", label: "🐷 Pigs" },
    { id: "chickens", label: "🐓 Chickens" },
    { id: "alpacas", label: "🦙 Alpacas" },
    { id: "other", label: "🦆 Other" },
  ]

  const equipmentOptions = [
    { id: "truck", label: "🚛 Truck/Ute" },
    { id: "tractor", label: "🚜 Tractor" },
    { id: "trailer", label: "🚚 Livestock Trailer" },
    { id: "generator", label: "⚡ Generator" },
    { id: "pump", label: "💧 Water Pump" },
    { id: "chainsaw", label: "🪚 Chainsaw" },
    { id: "welder", label: "🔧 Welder" },
    { id: "excavator", label: "🏗️ Excavator/Bobcat" },
  ]

  const helpOptions = [
    { id: "transport", label: "🚛 Transport & Trucks", description: "Moving livestock, equipment, supplies" },
    { id: "agistment", label: "🌾 Agistment & Paddocks", description: "Emergency grazing, spelling paddocks" },
    { id: "equipment", label: "⚡ Equipment Sharing", description: "Generators, pumps, tools, machinery" },
    { id: "labor", label: "👥 Extra Hands", description: "Help with mustering, fencing, harvest" },
    { id: "emergency", label: "🚨 Emergency Support", description: "Disaster response, evacuation help" },
    { id: "knowledge", label: "🧠 Local Knowledge", description: "Weather, markets, best practices" },
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
      }
    }
  }

  const completeOnboarding = () => {
    setShowWelcome(true)
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
                    <div className="font-semibold text-slate-800">Introduce yourself</div>
                    <div className="text-sm text-slate-600">Share what you can offer and what help you might need</div>
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
                <p className="opacity-90">Connect with your local rural community</p>
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

            {/* Step 3: Property Size & Livestock */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Tell us about your setup</h3>
                <p className="text-slate-600 mb-6">Property size and animals help match you with relevant locals</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Property Size</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "small", label: "Under 5 acres" },
                        { id: "medium", label: "5-50 acres" },
                        { id: "large", label: "50+ acres" },
                      ].map((size) => (
                        <Button
                          key={size.id}
                          variant={onboardingData.propertySize === size.id ? "default" : "outline"}
                          onClick={() => setOnboardingData({ ...onboardingData, propertySize: size.id })}
                          className={`p-3 text-sm ${
                            onboardingData.propertySize === size.id
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {size.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      What animals do you have? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {livestockOptions.map((animal) => (
                        <Button
                          key={animal.id}
                          variant={onboardingData.livestock.includes(animal.id) ? "default" : "outline"}
                          onClick={() => {
                            const newLivestock = onboardingData.livestock.includes(animal.id)
                              ? onboardingData.livestock.filter((l) => l !== animal.id)
                              : [...onboardingData.livestock, animal.id]
                            setOnboardingData({ ...onboardingData, livestock: newLivestock })
                          }}
                          className={`p-3 text-sm ${
                            onboardingData.livestock.includes(animal.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {animal.label}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setOnboardingData({ ...onboardingData, livestock: [] })
                        nextStep()
                      }}
                      className="w-full mt-3 border-slate-300 text-slate-700"
                    >
                      No animals - just property
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Equipment & What You Can Offer */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">What can you offer the community?</h3>
                <p className="text-slate-600 mb-6">
                  Rural communities work by sharing resources and helping each other
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Equipment & Machinery You Have
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {equipmentOptions.map((equipment) => (
                        <Button
                          key={equipment.id}
                          variant={onboardingData.equipment.includes(equipment.id) ? "default" : "outline"}
                          onClick={() => {
                            const newEquipment = onboardingData.equipment.includes(equipment.id)
                              ? onboardingData.equipment.filter((e) => e !== equipment.id)
                              : [...onboardingData.equipment, equipment.id]
                            setOnboardingData({ ...onboardingData, equipment: newEquipment })
                          }}
                          className={`p-3 text-sm ${
                            onboardingData.equipment.includes(equipment.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {equipment.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Other Ways You Can Help (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "agistment", label: "🌾 Emergency agistment/spelling paddocks" },
                        { id: "transport", label: "🚛 Help with transport/moving livestock" },
                        { id: "labor", label: "👥 Extra hands for mustering, fencing, etc." },
                        { id: "knowledge", label: "🧠 Local knowledge & experience" },
                        { id: "emergency", label: "🚨 Emergency response & coordination" },
                      ].map((help) => (
                        <Button
                          key={help.id}
                          variant={onboardingData.canOffer.includes(help.id) ? "default" : "outline"}
                          onClick={() => {
                            const newOffer = onboardingData.canOffer.includes(help.id)
                              ? onboardingData.canOffer.filter((o) => o !== help.id)
                              : [...onboardingData.canOffer, help.id]
                            setOnboardingData({ ...onboardingData, canOffer: newOffer })
                          }}
                          className={`w-full p-3 text-left text-sm ${
                            onboardingData.canOffer.includes(help.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {help.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: What Help Do You Need */}
            {currentStep === 5 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">What help might you need?</h3>
                <p className="text-slate-600 mb-6">We'll connect you with locals who can help with these things</p>

                <div className="space-y-3">
                  {helpOptions.map((help) => (
                    <Button
                      key={help.id}
                      variant={onboardingData.needHelp.includes(help.id) ? "default" : "outline"}
                      onClick={() => {
                        const newNeed = onboardingData.needHelp.includes(help.id)
                          ? onboardingData.needHelp.filter((n) => n !== help.id)
                          : [...onboardingData.needHelp, help.id]
                        setOnboardingData({ ...onboardingData, needHelp: newNeed })
                      }}
                      className={`w-full p-4 h-auto text-left ${
                        onboardingData.needHelp.includes(help.id)
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{help.label}</div>
                        <div className="text-sm opacity-80">{help.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">Emergency Planning Interest</h4>
                  <p className="text-sm text-blue-700 mb-3">Are you interested in our free emergency planning tools?</p>
                  <div className="flex gap-3">
                    {[
                      { id: "bushfire", label: "🔥 Bushfire Planning", icon: Flame },
                      { id: "flood", label: "🌊 Flood Planning", icon: Droplets },
                    ].map((emergency) => (
                      <Button
                        key={emergency.id}
                        variant={onboardingData.emergencyInterest.includes(emergency.id) ? "default" : "outline"}
                        onClick={() => {
                          const newInterest = onboardingData.emergencyInterest.includes(emergency.id)
                            ? onboardingData.emergencyInterest.filter((e) => e !== emergency.id)
                            : [...onboardingData.emergencyInterest, emergency.id]
                          setOnboardingData({ ...onboardingData, emergencyInterest: newInterest })
                        }}
                        className={`flex-1 p-3 text-sm ${
                          onboardingData.emergencyInterest.includes(emergency.id)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-blue-300 text-blue-700 hover:bg-blue-50"
                        }`}
                      >
                        <emergency.icon className="h-4 w-4 mr-2" />
                        {emergency.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Personal Information */}
            {currentStep === 6 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Almost done! Your contact details</h3>
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
                  disabled={
                    (currentStep === 1 && !onboardingData.location.postcode) ||
                    (currentStep === 2 && !onboardingData.propertyType) ||
                    (currentStep === 3 && !onboardingData.propertySize)
                  }
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={completeOnboarding}
                  disabled={
                    !onboardingData.personalInfo.firstName.trim() ||
                    !onboardingData.personalInfo.lastName.trim() ||
                    !onboardingData.personalInfo.email.trim() ||
                    !onboardingData.personalInfo.phone.trim()
                  }
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
