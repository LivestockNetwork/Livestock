"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  Droplets,
  MapPin,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  Share2,
  Home,
} from "lucide-react"

interface FloodWizardData {
  propertyLocation: string
  floodRisk: string
  propertySize: string
  livestock: string[]
  livestockNumbers: { [key: string]: number }
  equipment: string[]
  safeAreas: string[]
  waterSources: string[]
  evacuationRoutes: string
  emergencySupplies: string[]
  communityHelp: string[]
  previousFloods: string
}

export default function FloodWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<FloodWizardData>({
    propertyLocation: "",
    floodRisk: "",
    propertySize: "",
    livestock: [],
    livestockNumbers: {},
    equipment: [],
    safeAreas: [],
    waterSources: [],
    evacuationRoutes: "",
    emergencySupplies: [],
    communityHelp: [],
    previousFloods: "",
  })
  const [showPlan, setShowPlan] = useState(false)

  const totalSteps = 3

  const locationTypes = [
    { id: "river-flat", label: "🏞️ River Flat/Creek", description: "Near waterway, flood prone", risk: "high" },
    { id: "low-lying", label: "🌾 Low-lying Area", description: "Valley floor, drainage area", risk: "medium" },
    { id: "gentle-slope", label: "⛰️ Gentle Slope", description: "Slight elevation, some drainage", risk: "medium" },
    { id: "hilltop", label: "🏔️ Hill/Ridge", description: "Higher ground, good drainage", risk: "low" },
  ]

  const livestockOptions = [
    { id: "cattle", label: "🐄 Cattle", mobility: "low", waterRisk: "high" },
    { id: "horses", label: "🐴 Horses", mobility: "high", waterRisk: "medium" },
    { id: "sheep", label: "🐑 Sheep", mobility: "medium", waterRisk: "high" },
    { id: "goats", label: "🐐 Goats", mobility: "high", waterRisk: "medium" },
    { id: "pigs", label: "🐷 Pigs", mobility: "low", waterRisk: "high" },
    { id: "chickens", label: "🐓 Chickens", mobility: "high", waterRisk: "critical" },
    { id: "alpacas", label: "🦙 Alpacas", mobility: "medium", waterRisk: "medium" },
  ]

  const equipmentOptions = [
    { id: "truck", label: "🚛 4WD/Truck", critical: true, floodUse: "evacuation" },
    { id: "trailer", label: "🚚 Livestock Trailer", critical: true, floodUse: "animal-transport" },
    { id: "boat", label: "🚤 Boat/Dinghy", critical: false, floodUse: "rescue" },
    { id: "generator", label: "⚡ Generator", critical: true, floodUse: "power" },
    { id: "water-pump", label: "💧 Water Pump", critical: true, floodUse: "drainage" },
    { id: "chainsaw", label: "🪚 Chainsaw", critical: false, floodUse: "debris-clearing" },
    { id: "radio", label: "📻 Two-way Radio", critical: true, floodUse: "communication" },
  ]

  const emergencySupplies = [
    { id: "food-3day", label: "🥫 3+ Days Food", description: "Non-perishable for family" },
    { id: "water-3day", label: "💧 3+ Days Water", description: "1 gallon per person per day" },
    { id: "animal-feed", label: "🌾 Animal Feed", description: "3+ days feed for livestock" },
    { id: "first-aid", label: "🏥 First Aid Kit", description: "Human and animal supplies" },
    { id: "medications", label: "💊 Medications", description: "Essential prescriptions" },
    { id: "documents", label: "📄 Important Documents", description: "Waterproof container" },
    { id: "cash", label: "💰 Emergency Cash", description: "ATMs may not work" },
    { id: "fuel", label: "⛽ Extra Fuel", description: "For vehicles and generator" },
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

  const generatePlan = () => {
    setShowPlan(true)
  }

  const getFloodPlan = () => {
    const plan = {
      riskLevel: calculateFloodRisk(),
      immediateActions: getImmediateActions(),
      livestockPlan: getLivestockPlan(),
      evacuationPlan: getEvacuationPlan(),
      suppliesPlan: getSuppliesPlan(),
      communityResources: getCommunityResources(),
      timeline: getFloodTimeline(),
    }
    return plan
  }

  const calculateFloodRisk = () => {
    let risk = 0

    // Location risk
    if (wizardData.propertyLocation === "river-flat") risk += 4
    else if (wizardData.propertyLocation === "low-lying") risk += 3
    else if (wizardData.propertyLocation === "gentle-slope") risk += 2
    else risk += 1

    // Livestock adds complexity
    if (wizardData.livestock.length > 3) risk += 2
    if (wizardData.livestock.includes("chickens")) risk += 1 // Most vulnerable

    // Equipment reduces risk
    if (!wizardData.equipment.includes("truck")) risk += 2
    if (!wizardData.equipment.includes("boat")) risk += 1
    if (wizardData.equipment.includes("radio")) risk -= 1

    // Previous experience
    if (wizardData.previousFloods === "never") risk += 1

    if (risk >= 8) return { level: "EXTREME", color: "red" }
    if (risk >= 6) return { level: "HIGH", color: "red" }
    if (risk >= 4) return { level: "MEDIUM", color: "amber" }
    return { level: "LOW", color: "green" }
  }

  const getImmediateActions = () => {
    const actions = []

    // Location-specific actions
    if (wizardData.propertyLocation === "river-flat") {
      actions.push("🚨 CRITICAL: You're in highest flood risk area - monitor weather constantly")
      actions.push("📱 Set up flood warning alerts for your local river/creek")
    }

    // Livestock-specific actions
    if (wizardData.livestock.includes("chickens")) {
      actions.push("🐓 Chickens: Build elevated coops or have portable carriers ready")
    }
    if (wizardData.livestock.includes("cattle")) {
      actions.push("🐄 Cattle: Identify highest paddocks, clear access routes")
    }
    if (wizardData.livestock.includes("horses")) {
      actions.push("🐴 Horses: Practice loading in wet conditions, have halters accessible")
    }

    // General preparedness
    actions.push("🎒 Pack emergency kit for humans and animals")
    actions.push("⛽ Keep vehicles fueled and ready")
    actions.push("📻 Test communication equipment")
    actions.push("🗺️ Walk evacuation routes in good weather")

    return actions
  }

  const getLivestockPlan = () => {
    return wizardData.livestock.map((animal) => {
      const animalData = livestockOptions.find((opt) => opt.id === animal)
      const count = wizardData.livestockNumbers[animal] || 0

      let plan = ""
      let urgency = ""

      switch (animal) {
        case "chickens":
          plan = "HIGHEST PRIORITY: Chickens drown quickly. Move to elevated areas FIRST when flood warning issued."
          urgency = "Move immediately when flood watch declared"
          break
        case "cattle":
          plan =
            count > 20
              ? "Large herd: Move to highest paddocks early. May need to release if evacuation impossible."
              : "Small herd: Can truck to safety with community help. Identify safe agistment now."
          urgency = "Move when flood watch becomes flood warning"
          break
        case "horses":
          plan = "Good mobility but panic in water. Practice loading. Can swim short distances if necessary."
          urgency = "Move when flood warning issued"
          break
        case "sheep":
          plan = "Vulnerable to panic and drowning. Move to high ground early. Flock together naturally."
          urgency = "Move when flood watch declared"
          break
        default:
          plan = `${animalData?.mobility} mobility, ${animalData?.waterRisk} water risk`
          urgency = "Follow general livestock timeline"
      }

      return {
        animal: animalData?.label || animal,
        count,
        plan,
        urgency,
        waterRisk: animalData?.waterRisk,
      }
    })
  }

  const getEvacuationPlan = () => {
    const locationData = locationTypes.find((loc) => loc.id === wizardData.propertyLocation)

    return {
      riskLevel: locationData?.risk || "unknown",
      routes: wizardData.evacuationRoutes || "Identify multiple routes - floods can cut off primary roads",
      timeline: getEvacuationTimeline(),
      priorities: [
        "1. Human safety ALWAYS comes first",
        "2. Most vulnerable animals (chickens, young animals)",
        "3. Valuable/mobile livestock",
        "4. Equipment that can help community",
        "5. Important documents and supplies",
      ],
      safeZones:
        wizardData.safeAreas.length > 0 ? wizardData.safeAreas : ["No safe zones identified - URGENT priority"],
    }
  }

  const getEvacuationTimeline = () => {
    if (wizardData.propertyLocation === "river-flat") {
      return "URGENT: Start moving livestock when flood WATCH issued (not warning - too late)"
    } else if (wizardData.propertyLocation === "low-lying") {
      return "Start moving when flood WARNING issued, complete before water rises"
    } else {
      return "Monitor conditions, may have more time but don't wait too long"
    }
  }

  const getFloodTimeline = () => {
    return {
      "Flood Watch": {
        action: "START MOVING VULNERABLE ANIMALS",
        time: "24-48 hours before flooding",
        priority: "Chickens, young animals to safety",
      },
      "Flood Warning": {
        action: "EVACUATE ALL LIVESTOCK",
        time: "12-24 hours before flooding",
        priority: "All animals to high ground/safe areas",
      },
      "Emergency Warning": {
        action: "HUMAN EVACUATION ONLY",
        time: "Immediate flooding expected",
        priority: "Save human lives - animals on their own",
      },
    }
  }

  const getSuppliesPlan = () => {
    const available = wizardData.emergencySupplies
    const missing = emergencySupplies.filter((supply) => !available.includes(supply.id))

    return {
      available: emergencySupplies.filter((supply) => available.includes(supply.id)),
      missing: missing,
      recommendations:
        missing.length > 0
          ? `Missing ${missing.length} critical supplies - prioritize getting these`
          : "Good supply coverage - consider helping locals who need supplies",
      animalSpecific: [
        "🐄 Cattle: 3+ days hay/feed in waterproof storage",
        "🐴 Horses: Halters, lead ropes, first aid kit",
        "🐓 Chickens: Portable coops, 7+ days feed (they eat more when stressed)",
        "🐑 Sheep: Marking spray for identification if separated",
      ],
    }
  }

  const getCommunityResources = () => {
    return {
      needed: wizardData.communityHelp,
      canOffer: wizardData.equipment.filter((eq) => equipmentOptions.find((opt) => opt.id === eq)?.critical),
      connections: [
        "Connect with locals on higher ground for emergency agistment",
        "Share contact details with local SES/emergency services",
        "Join local flood warning WhatsApp/Facebook groups",
        "Identify locals with boats for emergency rescue",
        "Coordinate with local evacuation centers",
      ],
    }
  }

  if (showPlan) {
    const plan = getFloodPlan()

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div
            className="p-6 text-white"
            style={{
              background: `linear-gradient(135deg, ${
                plan.riskLevel.color === "red"
                  ? "#3b82f6, #1d4ed8"
                  : plan.riskLevel.color === "amber"
                    ? "#f59e0b, #d97706"
                    : "#10b981, #059669"
              })`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Flood Preparedness Plan</h2>
                <p className="opacity-90">Personalized for your property and livestock</p>
              </div>
            </div>

            <Badge className="bg-white/20 text-white font-bold px-4 py-2">Flood Risk: {plan.riskLevel.level}</Badge>
          </div>

          <CardContent className="p-8 space-y-8">
            {/* Flood Timeline */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                Flood Warning Timeline
              </h3>
              <div className="space-y-4">
                {Object.entries(plan.timeline).map(([stage, details], index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-blue-800">{stage}</div>
                      <div className="text-blue-700 font-semibold">{details.action}</div>
                      <div className="text-sm text-blue-600">{details.time}</div>
                      <div className="text-sm text-slate-600 mt-1">Priority: {details.priority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Actions */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Immediate Actions (Do These NOW)
              </h3>
              <div className="space-y-2">
                {plan.immediateActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Livestock Plan */}
            {plan.livestockPlan.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  Your Livestock Flood Plan
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {plan.livestockPlan.map((livestock, index) => (
                    <Card
                      key={index}
                      className={`border-l-4 ${
                        livestock.waterRisk === "critical"
                          ? "border-red-500"
                          : livestock.waterRisk === "high"
                            ? "border-amber-500"
                            : "border-blue-400"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-bold text-slate-800">
                            {livestock.animal} ({livestock.count})
                          </div>
                          <Badge
                            className={`text-xs ${
                              livestock.waterRisk === "critical"
                                ? "bg-red-100 text-red-700"
                                : livestock.waterRisk === "high"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {livestock.waterRisk} risk
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{livestock.plan}</p>
                        <div className="text-xs font-semibold text-blue-700 bg-blue-50 p-2 rounded">
                          ⏰ {livestock.urgency}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Evacuation Plan */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                Evacuation Strategy
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Your Timeline:</h4>
                  <p className="text-purple-700">{plan.evacuationPlan.timeline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Safe Zones:</h4>
                    <div className="space-y-1">
                      {plan.evacuationPlan.safeZones.map((zone, index) => (
                        <div key={index} className="text-sm text-slate-600 p-2 bg-green-50 rounded">
                          ✅ {zone}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Priority Order:</h4>
                    <div className="space-y-1">
                      {plan.evacuationPlan.priorities.map((priority, index) => (
                        <div key={index} className="text-sm text-slate-600">
                          {priority}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Supplies */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-green-500" />
                Emergency Supplies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ You Have:</h4>
                  <div className="space-y-1">
                    {plan.suppliesPlan.available.map((item, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-green-50 rounded">
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {plan.suppliesPlan.missing.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">❌ Still Need:</h4>
                    <div className="space-y-1">
                      {plan.suppliesPlan.missing.map((item, index) => (
                        <div key={index} className="text-sm text-slate-600 p-2 bg-red-50 rounded">
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{plan.suppliesPlan.recommendations}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-slate-800 mb-2">Animal-Specific Supplies:</h4>
                <div className="space-y-1">
                  {plan.suppliesPlan.animalSpecific.map((item, index) => (
                    <div key={index} className="text-sm text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Resources */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Community Network
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">You Can Offer:</h4>
                  <div className="space-y-1">
                    {plan.communityResources.canOffer.map((item, index) => (
                      <div key={index} className="text-sm text-green-600">
                        ✅ {equipmentOptions.find((eq) => eq.id === item)?.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">You Need Help With:</h4>
                  <div className="space-y-1">
                    {plan.communityResources.needed.map((item, index) => (
                      <div key={index} className="text-sm text-amber-600">
                        🤝 {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Next Steps:</h4>
                <div className="space-y-1">
                  {plan.communityResources.connections.map((connection, index) => (
                    <div key={index} className="text-sm text-green-700">
                      • {connection}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                size="lg"
                className="text-white font-bold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF Plan
              </Button>

              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
                <Share2 className="h-5 w-5 mr-2" />
                Share with Family
              </Button>

              <Button
                size="lg"
                className="text-white font-bold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                onClick={() => {
                  window.location.href = "/onboarding"
                }}
              >
                Connect with Locals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Flood Preparedness Wizard</h2>
              <p className="opacity-90">Get your personalized flood emergency plan</p>
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
          {/* Step 1: Property Location */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Property Location & Experience</h3>
              <p className="text-slate-600 mb-6">Location, past floods shape your plan</p>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 mb-2">Property Location:</h4>
                {locationTypes.map((location) => (
                  <Button
                    key={location.id}
                    variant={wizardData.propertyLocation === location.id ? "default" : "outline"}
                    onClick={() => setWizardData({ ...wizardData, propertyLocation: location.id })}
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.propertyLocation === location.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{location.label}</div>
                        <div className="text-sm opacity-80">{location.description}</div>
                      </div>
                      <Badge
                        className={`${
                          location.risk === "high"
                            ? "bg-red-100 text-red-700"
                            : location.risk === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {location.risk}
                      </Badge>
                    </div>
                  </Button>
                ))}

                <h4 className="font-semibold text-slate-800 mt-4 mb-2">Previous Flood Experience:</h4>
                {[
                  { id: "never", label: "Never experienced flooding", description: "This would be my first flood" },
                  { id: "minor", label: "Minor flooding only", description: "Water around property, no major damage" },
                  {
                    id: "major",
                    label: "Major flooding",
                    description: "Property flooded, livestock affected",
                  },
                  {
                    id: "multiple",
                    label: "Multiple major floods",
                    description: "Experienced several flood events",
                  },
                ].map((experience) => (
                  <Button
                    key={experience.id}
                    variant={wizardData.previousFloods === experience.id ? "default" : "outline"}
                    onClick={() => setWizardData({ ...wizardData, previousFloods: experience.id })}
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.previousFloods === experience.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-sm sm:text-base leading-tight">{experience.label}</div>
                      <div className="text-xs sm:text-sm opacity-80 leading-tight">{experience.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Livestock & Equipment */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Livestock & Equipment</h3>
              <p className="text-slate-600 mb-6">Animals & gear for evacuation</p>

              <h4 className="font-semibold text-slate-800 mb-3">Livestock:</h4>
              <div className="grid grid-cols-2 gap-3">
                {livestockOptions.map((animal) => (
                  <Button
                    key={animal.id}
                    variant={wizardData.livestock.includes(animal.id) ? "default" : "outline"}
                    onClick={() => {
                      const newLivestock = wizardData.livestock.includes(animal.id)
                        ? wizardData.livestock.filter((l) => l !== animal.id)
                        : [...wizardData.livestock, animal.id]
                      setWizardData({ ...wizardData, livestock: newLivestock })
                    }}
                    className={`p-3 h-auto ${
                      wizardData.livestock.includes(animal.id)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{animal.label}</div>
                      <div className="text-xs opacity-80 mt-1">{animal.waterRisk} water risk</div>
                    </div>
                  </Button>
                ))}
              </div>

              {wizardData.livestock.length === 0 && (
                <Button
                  variant="outline"
                  onClick={() => setWizardData({ ...wizardData, livestock: [] })}
                  className="w-full mt-4 border-slate-300 text-slate-700"
                >
                  No animals - just property
                </Button>
              )}

              <h4 className="font-semibold text-slate-800 mt-4 mb-3">Equipment:</h4>
              <div className="space-y-3">
                {equipmentOptions.map((equipment) => (
                  <Button
                    key={equipment.id}
                    variant={wizardData.equipment.includes(equipment.id) ? "default" : "outline"}
                    onClick={() => {
                      const newEquipment = wizardData.equipment.includes(equipment.id)
                        ? wizardData.equipment.filter((e) => e !== equipment.id)
                        : [...wizardData.equipment, equipment.id]
                      setWizardData({ ...wizardData, equipment: newEquipment })
                    }}
                    className={`w-full p-3 text-left flex items-center justify-between ${
                      wizardData.equipment.includes(equipment.id)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{equipment.label}</span>
                      <div className="text-sm opacity-80">For: {equipment.floodUse}</div>
                    </div>
                    {equipment.critical && <Badge className="bg-blue-100 text-blue-700 text-xs">Critical</Badge>}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Emergency Supplies & Community Help */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Emergency supplies & community help</h3>
              <p className="text-slate-600 mb-6">What do you have and what help do you need?</p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Emergency Supplies You Have:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {emergencySupplies.map((supply) => (
                      <Button
                        key={supply.id}
                        variant={wizardData.emergencySupplies.includes(supply.id) ? "default" : "outline"}
                        onClick={() => {
                          const newSupplies = wizardData.emergencySupplies.includes(supply.id)
                            ? wizardData.emergencySupplies.filter((s) => s !== supply.id)
                            : [...wizardData.emergencySupplies, supply.id]
                          setWizardData({ ...wizardData, emergencySupplies: newSupplies })
                        }}
                        className={`p-2 text-xs h-auto ${
                          wizardData.emergencySupplies.includes(supply.id)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {supply.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Community Help Needed:</h4>
                  <div className="space-y-2">
                    {[
                      { id: "transport", label: "🚛 Transport/Trucks for livestock" },
                      { id: "agistment", label: "🌾 Emergency agistment/safe paddocks" },
                      { id: "boat", label: "🚤 Boat for rescue/evacuation" },
                      { id: "high-ground", label: "🏔️ Access to high ground" },
                      { id: "supplies", label: "📦 Emergency supplies sharing" },
                      { id: "coordination", label: "📱 Communication/coordination hub" },
                    ].map((help) => (
                      <Button
                        key={help.id}
                        variant={wizardData.communityHelp.includes(help.id) ? "default" : "outline"}
                        onClick={() => {
                          const newHelp = wizardData.communityHelp.includes(help.id)
                            ? wizardData.communityHelp.filter((h) => h !== help.id)
                            : [...wizardData.communityHelp, help.id]
                          setWizardData({ ...wizardData, communityHelp: newHelp })
                        }}
                        className={`w-full p-3 text-left text-sm ${
                          wizardData.communityHelp.includes(help.id)
                            ? "bg-blue-500 text-white border-blue-500"
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
                  (currentStep === 1 && !wizardData.propertyLocation) ||
                  (currentStep === 1 && !wizardData.previousFloods) ||
                  (currentStep === 2 && wizardData.livestock.length === 0 && wizardData.equipment.length === 0)
                }
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={generatePlan}
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
              >
                <Droplets className="h-4 w-4 mr-2" />
                Generate My Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
