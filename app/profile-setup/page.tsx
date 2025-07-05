"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Users, Heart, CheckCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface ProfileData {
  propertyDetails: {
    propertyType: string
    propertySize: string
    description: string
    photos: string[]
  }
  livestock: {
    types: string[]
    details: { [key: string]: { count: number; description: string } }
  }
  equipment: {
    available: string[]
    details: { [key: string]: string }
  }
  services: {
    canOffer: string[]
    needHelp: string[]
  }
  contact: {
    phone: string
    preferredContact: string
    availability: string
  }
}

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState<ProfileData>({
    propertyDetails: {
      propertyType: "",
      propertySize: "",
      description: "",
      photos: [],
    },
    livestock: {
      types: [],
      details: {},
    },
    equipment: {
      available: [],
      details: {},
    },
    services: {
      canOffer: [],
      needHelp: [],
    },
    contact: {
      phone: "",
      preferredContact: "email",
      availability: "",
    },
  })
  const [showComplete, setShowComplete] = useState(false)

  const totalSteps = 4

  const propertyTypes = [
    { id: "cattle-farm", label: "🐄 Cattle Farm", description: "Beef or dairy operation" },
    { id: "horse-property", label: "🐴 Horse Property", description: "Agistment, breeding, riding" },
    { id: "mixed-farm", label: "🚜 Mixed Farm", description: "Crops and livestock" },
    { id: "hobby-farm", label: "🐓 Hobby Farm", description: "Lifestyle property with animals" },
    { id: "cropping", label: "🌾 Cropping", description: "Grain, hay, or other crops" },
    { id: "rural-residential", label: "🏡 Rural Residential", description: "Rural living, small acreage" },
    { id: "town-resident", label: "🏘️ Town Resident", description: "Live in rural town, support community" },
  ]

  const propertySizes = [
    { id: "under-5", label: "Under 5 acres", description: "Small hobby farm or lifestyle block" },
    { id: "5-20", label: "5-20 acres", description: "Small farm or horse property" },
    { id: "20-100", label: "20-100 acres", description: "Medium farm operation" },
    { id: "100-500", label: "100-500 acres", description: "Large farm or station" },
    { id: "500-plus", label: "500+ acres", description: "Major farming operation" },
    { id: "no-property", label: "No rural property", description: "Town resident supporting rural community" },
  ]

  const livestockOptions = [
    { id: "cattle", label: "🐄 Cattle", description: "Beef or dairy cattle" },
    { id: "horses", label: "🐴 Horses", description: "Riding, breeding, or working horses" },
    { id: "sheep", label: "🐑 Sheep", description: "Wool or meat sheep" },
    { id: "goats", label: "🐐 Goats", description: "Meat, dairy, or brush clearing goats" },
    { id: "pigs", label: "🐷 Pigs", description: "Commercial or hobby pig farming" },
    { id: "chickens", label: "🐓 Chickens", description: "Egg layers or meat birds" },
    { id: "alpacas", label: "🦙 Alpacas", description: "Fiber animals or pets" },
    { id: "other", label: "🦆 Other", description: "Ducks, geese, or other livestock" },
  ]

  const equipmentOptions = [
    { id: "truck", label: "🚛 Truck/4WD", description: "Heavy duty vehicle for transport" },
    { id: "trailer", label: "🚚 Livestock Trailer", description: "For moving animals" },
    { id: "tractor", label: "🚜 Tractor", description: "Farm tractor with implements" },
    { id: "generator", label: "⚡ Generator", description: "Backup power supply" },
    { id: "water-pump", label: "💧 Water Pump", description: "For irrigation or emergency water" },
    { id: "chainsaw", label: "🪚 Chainsaw", description: "Tree cutting and maintenance" },
    { id: "welder", label: "🔧 Welder", description: "Metal fabrication and repairs" },
    { id: "post-driver", label: "🔨 Post Driver", description: "Fence post installation" },
    { id: "slasher", label: "🌾 Slasher/Mower", description: "Grass and weed cutting" },
    { id: "spray-unit", label: "💨 Spray Unit", description: "Chemical application equipment" },
  ]

  const serviceOptions = [
    { id: "transport", label: "🚛 Livestock Transport", description: "Moving animals with truck/trailer" },
    { id: "agistment", label: "🌾 Agistment/Grazing", description: "Paddock space for animals" },
    { id: "fencing", label: "🪚 Fencing Work", description: "Building or repairing fences" },
    { id: "machinery", label: "🚜 Machinery Work", description: "Tractor work, slashing, cultivation" },
    { id: "veterinary", label: "🏥 Animal Health", description: "Veterinary services or first aid" },
    { id: "feed-supply", label: "🌾 Feed Supply", description: "Hay, grain, or other feed" },
    { id: "emergency-help", label: "🚨 Emergency Response", description: "Help during disasters or emergencies" },
    { id: "equipment-repair", label: "🔧 Equipment Repair", description: "Mechanical repairs and maintenance" },
    { id: "labor", label: "👥 General Labor", description: "Extra hands for farm work" },
    { id: "coordination", label: "📱 Community Coordination", description: "Organizing community activities" },
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

  const completeProfile = () => {
    setShowComplete(true)
  }

  const addLivestockDetail = (type: string) => {
    setProfileData({
      ...profileData,
      livestock: {
        ...profileData.livestock,
        details: {
          ...profileData.livestock.details,
          [type]: { count: 0, description: "" },
        },
      },
    })
  }

  const updateLivestockDetail = (type: string, field: "count" | "description", value: string | number) => {
    setProfileData({
      ...profileData,
      livestock: {
        ...profileData.livestock,
        details: {
          ...profileData.livestock.details,
          [type]: {
            ...profileData.livestock.details[type],
            [field]: value,
          },
        },
      },
    })
  }

  if (showComplete) {
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
              <h2 className="text-3xl font-bold mb-2">Profile Complete! 🎉</h2>
              <p className="text-xl opacity-90">Your community profile is now set up and ready to go</p>
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
                    <div className="font-semibold text-slate-800">Your profile is now visible</div>
                    <div className="text-sm text-slate-600">
                      Other community members can see what you offer and what help you need
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Start connecting</div>
                    <div className="text-sm text-slate-600">
                      Browse the community feed and start helping neighbors or asking for help
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Get matched with opportunities</div>
                    <div className="text-sm text-slate-600">
                      We'll notify you when someone needs what you offer or has what you need
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
                onClick={() => (window.location.href = "/profile")}
              >
                View My Profile
              </Button>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center">
              <p className="text-sm text-slate-600">
                <strong>You can always update your profile later</strong>
                <br />
                Add more livestock, equipment, or change what services you offer anytime.
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
      {/* Header with clickable logo */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Rural Community Hub</span>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Complete Your Profile</h2>
                <p className="opacity-90">Help your community know what you offer and need</p>
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
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Property</h3>
                <p className="text-slate-600 mb-6">
                  Tell us about your property so we can connect you with the right people
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Property Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {propertyTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={profileData.propertyDetails.propertyType === type.id ? "default" : "outline"}
                          onClick={() =>
                            setProfileData({
                              ...profileData,
                              propertyDetails: { ...profileData.propertyDetails, propertyType: type.id },
                            })
                          }
                          className={`p-4 h-auto text-left ${
                            profileData.propertyDetails.propertyType === type.id
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{type.label}</div>
                            <div className="text-sm opacity-80">{type.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Property Size</label>
                    <div className="space-y-2">
                      {propertySizes.map((size) => (
                        <Button
                          key={size.id}
                          variant={profileData.propertyDetails.propertySize === size.id ? "default" : "outline"}
                          onClick={() =>
                            setProfileData({
                              ...profileData,
                              propertyDetails: { ...profileData.propertyDetails, propertySize: size.id },
                            })
                          }
                          className={`w-full p-3 text-left ${
                            profileData.propertyDetails.propertySize === size.id
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{size.label}</div>
                            <div className="text-sm opacity-80">{size.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Description (Optional)
                    </label>
                    <Textarea
                      placeholder="Tell us about your property - location, features, what makes it special..."
                      value={profileData.propertyDetails.description}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          propertyDetails: { ...profileData.propertyDetails, description: e.target.value },
                        })
                      }
                      className="border-slate-300 rounded-xl"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Livestock */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Livestock</h3>
                <p className="text-slate-600 mb-6">
                  What animals do you have? This helps with transport, agistment, and emergency planning
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Livestock Types</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {livestockOptions.map((animal) => (
                        <Button
                          key={animal.id}
                          variant={profileData.livestock.types.includes(animal.id) ? "default" : "outline"}
                          onClick={() => {
                            const newTypes = profileData.livestock.types.includes(animal.id)
                              ? profileData.livestock.types.filter((t) => t !== animal.id)
                              : [...profileData.livestock.types, animal.id]

                            const newDetails = { ...profileData.livestock.details }

                            if (!profileData.livestock.types.includes(animal.id)) {
                              // Adding new livestock type
                              newDetails[animal.id] = { count: 0, description: "" }
                            } else {
                              // Removing livestock type
                              delete newDetails[animal.id]
                            }

                            setProfileData({
                              ...profileData,
                              livestock: {
                                types: newTypes,
                                details: newDetails,
                              },
                            })
                          }}
                          className={`p-3 h-auto text-center ${
                            profileData.livestock.types.includes(animal.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm">{animal.label}</div>
                            <div className="text-xs opacity-80 mt-1">{animal.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {profileData.livestock.types.length === 0 && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setProfileData({
                          ...profileData,
                          livestock: { types: [], details: {} },
                        })
                      }
                      className="w-full p-4 border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      No livestock - just property/community support
                    </Button>
                  )}

                  {/* Livestock Details */}
                  {profileData.livestock.types.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Livestock Details</label>
                      <div className="space-y-4">
                        {profileData.livestock.types.map((type) => {
                          const animal = livestockOptions.find((a) => a.id === type)
                          return (
                            <div key={type} className="p-4 border border-slate-200 rounded-xl">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="font-semibold text-slate-800">{animal?.label}</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-600 mb-1">Number</label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={profileData.livestock.details[type]?.count || ""}
                                    onChange={(e) =>
                                      updateLivestockDetail(type, "count", Number.parseInt(e.target.value) || 0)
                                    }
                                    className="border-slate-300 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Details (Optional)
                                  </label>
                                  <Input
                                    placeholder="e.g. Angus steers, breeding mares..."
                                    value={profileData.livestock.details[type]?.description || ""}
                                    onChange={(e) => updateLivestockDetail(type, "description", e.target.value)}
                                    className="border-slate-300 rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Equipment */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Equipment</h3>
                <p className="text-slate-600 mb-6">
                  What equipment do you have that you could share or lend to neighbors?
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Available Equipment</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipmentOptions.map((equipment) => (
                        <Button
                          key={equipment.id}
                          variant={profileData.equipment.available.includes(equipment.id) ? "default" : "outline"}
                          onClick={() => {
                            const newEquipment = profileData.equipment.available.includes(equipment.id)
                              ? profileData.equipment.available.filter((e) => e !== equipment.id)
                              : [...profileData.equipment.available, equipment.id]
                            setProfileData({
                              ...profileData,
                              equipment: {
                                ...profileData.equipment,
                                available: newEquipment,
                              },
                            })
                          }}
                          className={`p-3 h-auto text-left ${
                            profileData.equipment.available.includes(equipment.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm">{equipment.label}</div>
                            <div className="text-xs opacity-80">{equipment.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {profileData.equipment.available.length === 0 && (
                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                      <p className="text-slate-600 text-sm">
                        No equipment to share? No problem! You can still help in other ways and access equipment from
                        neighbors.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Services & Contact */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Services & Contact</h3>
                <p className="text-slate-600 mb-6">What can you help with, and what do you need help with?</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Services You Can Offer</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceOptions.map((service) => (
                        <Button
                          key={service.id}
                          variant={profileData.services.canOffer.includes(service.id) ? "default" : "outline"}
                          onClick={() => {
                            const newServices = profileData.services.canOffer.includes(service.id)
                              ? profileData.services.canOffer.filter((s) => s !== service.id)
                              : [...profileData.services.canOffer, service.id]
                            setProfileData({
                              ...profileData,
                              services: {
                                ...profileData.services,
                                canOffer: newServices,
                              },
                            })
                          }}
                          className={`p-3 h-auto text-left text-sm ${
                            profileData.services.canOffer.includes(service.id)
                              ? "bg-teal-500 text-white border-teal-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{service.label}</div>
                            <div className="text-xs opacity-80">{service.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Services You Need Help With
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceOptions.map((service) => (
                        <Button
                          key={service.id}
                          variant={profileData.services.needHelp.includes(service.id) ? "default" : "outline"}
                          onClick={() => {
                            const newServices = profileData.services.needHelp.includes(service.id)
                              ? profileData.services.needHelp.filter((s) => s !== service.id)
                              : [...profileData.services.needHelp, service.id]
                            setProfileData({
                              ...profileData,
                              services: {
                                ...profileData.services,
                                needHelp: newServices,
                              },
                            })
                          }}
                          className={`p-3 h-auto text-left text-sm ${
                            profileData.services.needHelp.includes(service.id)
                              ? "bg-amber-500 text-white border-amber-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{service.label}</div>
                            <div className="text-xs opacity-80">{service.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Contact Preferences</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Phone Number (Optional)
                        </label>
                        <Input
                          type="tel"
                          placeholder="0412 345 678"
                          value={profileData.contact.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              contact: { ...profileData.contact, phone: e.target.value },
                            })
                          }
                          className="border-slate-300 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-2">
                          Preferred Contact Method
                        </label>
                        <div className="flex gap-3">
                          {[
                            { id: "email", label: "📧 Email", icon: Mail },
                            { id: "phone", label: "📱 Phone", icon: Phone },
                            { id: "both", label: "📞 Either", icon: Users },
                          ].map((method) => (
                            <Button
                              key={method.id}
                              variant={profileData.contact.preferredContact === method.id ? "default" : "outline"}
                              onClick={() =>
                                setProfileData({
                                  ...profileData,
                                  contact: { ...profileData.contact, preferredContact: method.id },
                                })
                              }
                              className={`flex-1 ${
                                profileData.contact.preferredContact === method.id
                                  ? "bg-teal-500 text-white border-teal-500"
                                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {method.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Availability (Optional)
                        </label>
                        <Input
                          placeholder="e.g. Weekends, evenings, emergency only..."
                          value={profileData.contact.availability}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              contact: { ...profileData.contact, availability: e.target.value },
                            })
                          }
                          className="border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
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
                    (currentStep === 1 && !profileData.propertyDetails.propertyType) ||
                    (currentStep === 1 && !profileData.propertyDetails.propertySize)
                  }
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={completeProfile}
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
