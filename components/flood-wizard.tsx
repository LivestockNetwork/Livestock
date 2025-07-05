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
  propertyInfo: {
    location: string
    experience: string
    size: string
  }
  livestock: string[]
  equipment: string[]
  emergencyPlan: {
    supplies: string[]
    communityHelp: string[]
  }
}

export default function FloodWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<FloodWizardData>({
    propertyInfo: { location: "", experience: "", size: "" },
    livestock: [],
    equipment: [],
    emergencyPlan: { supplies: [], communityHelp: [] },
  })
  const [showPlan, setShowPlan] = useState(false)

  const totalSteps = 3

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
    const riskLevel =
      wizardData.propertyInfo.location === "river-flat"
        ? "HIGH"
        : wizardData.propertyInfo.location === "low-lying"
          ? "MEDIUM"
          : "LOW"
    const hasLivestock = wizardData.livestock.length > 0
    const hasBoat = wizardData.equipment.includes("boat")

    return {
      riskLevel: { level: riskLevel, color: riskLevel === "HIGH" ? "red" : riskLevel === "LOW" ? "green" : "amber" },
      immediateActions: [
        "🌊 Sign up for flood warning alerts in your area",
        "📱 Download emergency alert apps",
        wizardData.propertyInfo.location === "river-flat"
          ? "🚨 CRITICAL: Monitor river levels daily"
          : "🏠 Clear drains and gutters around property",
        hasLivestock ? "🐄 Identify highest paddocks and practice moving animals" : "🚗 Keep vehicle fueled and ready",
        "💧 Store emergency water (floods can contaminate supply)",
        "📋 Have emergency contact list ready",
      ],
      evacuationPlan: {
        timeline:
          wizardData.propertyInfo.location === "river-flat"
            ? "URGENT: Start moving livestock when flood WATCH issued (not warning - too late)"
            : wizardData.propertyInfo.location === "low-lying"
              ? "Start moving when flood WARNING issued"
              : "Monitor conditions, may have more time but don't wait too long",
        priorities: [
          "1. Human safety ALWAYS comes first",
          "2. Most vulnerable animals (chickens, young animals)",
          "3. Valuable/mobile livestock",
          "4. Equipment that can help community",
          "5. Important documents and supplies",
        ],
      },
      equipmentStatus: {
        critical: ["truck", "trailer", "boat", "generator", "water-pump"],
        available: wizardData.equipment,
        missing: ["truck", "trailer", "boat", "generator", "water-pump"].filter(
          (eq) => !wizardData.equipment.includes(eq),
        ),
      },
      supplies: {
        available: wizardData.emergencyPlan.supplies,
        critical: ["food-3day", "water-3day", "first-aid", "medications", "fuel"],
      },
      communityHelp: wizardData.emergencyPlan.communityHelp,
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
              background: `linear-gradient(135deg, ${plan.riskLevel.color === "red" ? "#3b82f6, #1d4ed8" : plan.riskLevel.color === "amber" ? "#f59e0b, #d97706" : "#10b981, #059669"})`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Flood Preparedness Plan</h2>
                <p className="opacity-90">Quick action plan for your property</p>
              </div>
            </div>

            <Badge className="bg-white/20 text-white font-bold px-4 py-2">Flood Risk: {plan.riskLevel.level}</Badge>
          </div>

          <CardContent className="p-8 space-y-8">
            {/* Immediate Actions */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                Do These Actions NOW
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

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Priority Order:</h4>
                  <div className="space-y-1">
                    {plan.evacuationPlan.priorities.map((priority, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-slate-50 rounded">
                        {priority}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Status */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Critical Equipment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ You Have:</h4>
                  <div className="space-y-1">
                    {plan.equipmentStatus.available.map((item, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-green-50 rounded">
                        {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                      </div>
                    ))}
                  </div>
                </div>

                {plan.equipmentStatus.missing.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">❌ Still Need:</h4>
                    <div className="space-y-1">
                      {plan.equipmentStatus.missing.map((item, index) => (
                        <div key={index} className="text-sm text-slate-600 p-2 bg-red-50 rounded">
                          {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Supplies */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-amber-500" />
                Emergency Supplies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ You Have:</h4>
                  <div className="space-y-1">
                    {plan.supplies.available.map((item, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-green-50 rounded">
                        {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">⚠️ Critical Supplies:</h4>
                  <div className="space-y-1">
                    {plan.supplies.critical.map((item, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-amber-50 rounded">
                        {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Community Help */}
            {plan.communityHelp.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Community Support Needed
                </h3>
                <div className="space-y-1">
                  {plan.communityHelp.map((help, index) => (
                    <div key={index} className="text-sm text-blue-600 p-2 bg-blue-50 rounded">
                      🤝 {help}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                size="lg"
                className="text-white font-bold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Plan
              </Button>

              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
                <Share2 className="h-5 w-5 mr-2" />
                Share with Family
              </Button>

              <Button
                size="lg"
                className="text-white font-bold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                onClick={() => (window.location.href = "/onboarding")}
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
              <p className="opacity-90">Quick 3-step emergency plan</p>
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
          {/* Step 1: Property Location & Experience */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Property location & flood experience</h3>
              <p className="text-slate-600 mb-6">This determines your flood risk and evacuation urgency</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Property Location</label>
                  <div className="space-y-3">
                    {[
                      {
                        id: "river-flat",
                        label: "🏞️ River Flat/Creek",
                        description: "Near waterway, flood prone",
                        risk: "HIGH",
                      },
                      {
                        id: "low-lying",
                        label: "🌾 Low-lying Area",
                        description: "Valley floor, drainage area",
                        risk: "MEDIUM",
                      },
                      { id: "gentle-slope", label: "⛰️ Gentle Slope", description: "Slight elevation", risk: "MEDIUM" },
                      {
                        id: "hilltop",
                        label: "🏔️ Hill/Ridge",
                        description: "Higher ground, good drainage",
                        risk: "LOW",
                      },
                    ].map((location) => (
                      <Button
                        key={location.id}
                        variant={wizardData.propertyInfo.location === location.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, location: location.id },
                          })
                        }
                        className={`w-full p-4 h-auto text-left ${
                          wizardData.propertyInfo.location === location.id
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
                              location.risk === "HIGH"
                                ? "bg-red-100 text-red-700"
                                : location.risk === "MEDIUM"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {location.risk}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Flood Experience</label>
                  <div className="space-y-3">
                    {[
                      { id: "never", label: "Never experienced flooding" },
                      { id: "minor", label: "Minor flooding only" },
                      { id: "major", label: "Major flooding before" },
                      { id: "multiple", label: "Multiple flood events" },
                    ].map((experience) => (
                      <Button
                        key={experience.id}
                        variant={wizardData.propertyInfo.experience === experience.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, experience: experience.id },
                          })
                        }
                        className={`w-full p-3 text-left ${
                          wizardData.propertyInfo.experience === experience.id
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {experience.label}
                      </Button>
                    ))}
                  </div>
                </div>

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
                        variant={wizardData.propertyInfo.size === size.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, size: size.id },
                          })
                        }
                        className={`p-3 text-sm ${
                          wizardData.propertyInfo.size === size.id
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {size.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Livestock & Equipment */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Livestock & Equipment</h3>
              <p className="text-slate-600 mb-6">What animals and equipment do you have?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Animals (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "cattle", label: "🐄 Cattle" },
                      { id: "horses", label: "🐴 Horses" },
                      { id: "sheep", label: "🐑 Sheep" },
                      { id: "chickens", label: "🐓 Chickens" },
                      { id: "goats", label: "🐐 Goats" },
                      { id: "other", label: "🦆 Other" },
                    ].map((animal) => (
                      <Button
                        key={animal.id}
                        variant={wizardData.livestock.includes(animal.id) ? "default" : "outline"}
                        onClick={() => {
                          const newLivestock = wizardData.livestock.includes(animal.id)
                            ? wizardData.livestock.filter((l) => l !== animal.id)
                            : [...wizardData.livestock, animal.id]
                          setWizardData({ ...wizardData, livestock: newLivestock })
                        }}
                        className={`p-3 text-sm ${
                          wizardData.livestock.includes(animal.id)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {animal.label}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setWizardData({ ...wizardData, livestock: [] })}
                    className="w-full mt-3 border-slate-300 text-slate-700"
                  >
                    No animals - just property
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Critical Equipment</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "truck", label: "🚛 Truck/Ute" },
                      { id: "trailer", label: "🚚 Livestock Trailer" },
                      { id: "boat", label: "🚤 Boat/Dinghy" },
                      { id: "generator", label: "⚡ Generator" },
                      { id: "water-pump", label: "💧 Water Pump" },
                      { id: "radio", label: "📻 Two-way Radio" },
                    ].map((equipment) => (
                      <Button
                        key={equipment.id}
                        variant={wizardData.equipment.includes(equipment.id) ? "default" : "outline"}
                        onClick={() => {
                          const newEquipment = wizardData.equipment.includes(equipment.id)
                            ? wizardData.equipment.filter((e) => e !== equipment.id)
                            : [...wizardData.equipment, equipment.id]
                          setWizardData({ ...wizardData, equipment: newEquipment })
                        }}
                        className={`p-3 text-sm ${
                          wizardData.equipment.includes(equipment.id)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {equipment.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Emergency Supplies & Community Help */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Emergency supplies & community help</h3>
              <p className="text-slate-600 mb-6">What supplies do you have and what help do you need?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Emergency Supplies You Have</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "food-3day", label: "🥫 3+ Days Food" },
                      { id: "water-3day", label: "💧 3+ Days Water" },
                      { id: "first-aid", label: "🏥 First Aid Kit" },
                      { id: "medications", label: "💊 Medications" },
                      { id: "fuel", label: "⛽ Extra Fuel" },
                      { id: "radio", label: "📻 Battery Radio" },
                    ].map((supply) => (
                      <Button
                        key={supply.id}
                        variant={wizardData.emergencyPlan.supplies.includes(supply.id) ? "default" : "outline"}
                        onClick={() => {
                          const newSupplies = wizardData.emergencyPlan.supplies.includes(supply.id)
                            ? wizardData.emergencyPlan.supplies.filter((s) => s !== supply.id)
                            : [...wizardData.emergencyPlan.supplies, supply.id]
                          setWizardData({
                            ...wizardData,
                            emergencyPlan: { ...wizardData.emergencyPlan, supplies: newSupplies },
                          })
                        }}
                        className={`p-2 text-xs ${
                          wizardData.emergencyPlan.supplies.includes(supply.id)
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
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Community Help Needed</label>
                  <div className="space-y-2">
                    {[
                      { id: "transport", label: "🚛 Transport/Trucks for livestock" },
                      { id: "agistment", label: "🌾 Emergency agistment/safe paddocks" },
                      { id: "boat", label: "🚤 Boat for rescue/evacuation" },
                      { id: "supplies", label: "📦 Emergency supplies sharing" },
                      { id: "coordination", label: "📱 Communication/coordination hub" },
                    ].map((help) => (
                      <Button
                        key={help.id}
                        variant={wizardData.emergencyPlan.communityHelp.includes(help.id) ? "default" : "outline"}
                        onClick={() => {
                          const newHelp = wizardData.emergencyPlan.communityHelp.includes(help.id)
                            ? wizardData.emergencyPlan.communityHelp.filter((h) => h !== help.id)
                            : [...wizardData.emergencyPlan.communityHelp, help.id]
                          setWizardData({
                            ...wizardData,
                            emergencyPlan: { ...wizardData.emergencyPlan, communityHelp: newHelp },
                          })
                        }}
                        className={`w-full p-3 text-left text-sm ${
                          wizardData.emergencyPlan.communityHelp.includes(help.id)
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
                  currentStep === 1 && (!wizardData.propertyInfo.location || !wizardData.propertyInfo.experience)
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
