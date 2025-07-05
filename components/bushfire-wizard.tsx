"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  Flame,
  MapPin,
  Truck,
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  Share2,
} from "lucide-react"

interface WizardData {
  propertyInfo: {
    size: string
    type: string
    riskLevel: string
  }
  livestock: string[]
  equipment: string[]
  emergencyPlan: {
    safeZones: string[]
    communityHelp: string[]
  }
}

export default function BushfireWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    propertyInfo: { size: "", type: "", riskLevel: "" },
    livestock: [],
    equipment: [],
    emergencyPlan: { safeZones: [], communityHelp: [] },
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

  const getBushfirePlan = () => {
    const riskLevel = wizardData.propertyInfo.riskLevel || "MEDIUM"
    const hasLivestock = wizardData.livestock.length > 0
    const hasCriticalEquipment = wizardData.equipment.includes("truck") && wizardData.equipment.includes("trailer")

    return {
      riskLevel: { level: riskLevel, color: riskLevel === "HIGH" ? "red" : riskLevel === "LOW" ? "green" : "amber" },
      immediateActions: [
        "🔥 Monitor fire danger ratings daily during fire season",
        "📱 Download emergency alert apps for your area",
        "🚛 Keep vehicles fueled and ready for evacuation",
        hasLivestock
          ? "🐴 Practice loading livestock - don't wait for emergency"
          : "🏠 Clear gutters and vegetation around house",
        "💧 Check water pumps and hoses are working",
        "📋 Have emergency contact list ready",
      ],
      evacuationPlan: {
        timeline:
          wizardData.propertyInfo.type === "town-home"
            ? "Town residents: Evacuate when authorities advise - don't wait for EXTREME rating"
            : hasLivestock
              ? "Start moving livestock when fire danger reaches SEVERE (not EXTREME - too late)"
              : "Evacuate when fire danger reaches EXTREME or authorities advise",
        priorities:
          wizardData.propertyInfo.type === "town-home"
            ? [
                "1. Human safety first - never delay evacuation",
                "2. Important documents and medications",
                "3. Emergency supplies and water",
                "4. Help elderly neighbors if safe to do so",
              ]
            : [
                "1. Human safety first - never risk lives for animals",
                "2. Most valuable/mobile animals first",
                "3. Critical equipment",
                "4. Important documents",
              ],
      },
      equipmentStatus: {
        critical: ["truck", "trailer", "generator", "water-pump"],
        available: wizardData.equipment,
        missing: ["truck", "trailer", "generator", "water-pump"].filter((eq) => !wizardData.equipment.includes(eq)),
      },
      communityHelp: wizardData.emergencyPlan.communityHelp,
    }
  }

  if (showPlan) {
    const plan = getBushfirePlan()

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div
            className="p-6 text-white"
            style={{
              background: `linear-gradient(135deg, ${plan.riskLevel.color === "red" ? "#ef4444, #dc2626" : plan.riskLevel.color === "amber" ? "#f59e0b, #d97706" : "#10b981, #059669"})`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Bushfire Preparedness Plan</h2>
                <p className="opacity-90">Quick action plan for your property</p>
              </div>
            </div>

            <Badge className="bg-white/20 text-white font-bold px-4 py-2">Risk Level: {plan.riskLevel.level}</Badge>
          </div>

          <CardContent className="p-8 space-y-8">
            {/* Immediate Actions */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Do These Actions NOW
              </h3>
              <div className="space-y-2">
                {plan.immediateActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
                <Truck className="h-5 w-5 text-blue-500" />
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

            {/* Community Help */}
            {plan.communityHelp.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Community Support Needed
                </h3>
                <div className="space-y-1">
                  {plan.communityHelp.map((help, index) => (
                    <div key={index} className="text-sm text-amber-600 p-2 bg-amber-50 rounded">
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
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
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
        <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
          <div className="flex items-center gap-3 mb-4">
            <Flame className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Bushfire Preparedness Wizard</h2>
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
          {/* Step 1: Property Basics */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Tell us about your property</h3>
              <p className="text-slate-600 mb-6">This helps us understand your fire risk and evacuation needs</p>

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
                        variant={wizardData.propertyInfo.size === size.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, size: size.id },
                          })
                        }
                        className={`p-3 text-sm ${
                          wizardData.propertyInfo.size === size.id
                            ? "bg-red-500 text-white border-red-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {size.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Property Type</label>
                  <div className="space-y-3">
                    {[
                      { id: "farm", label: "🚜 Working Farm", description: "Crops, grazing, mixed farming" },
                      { id: "hobby", label: "🐓 Hobby Farm", description: "Small acreage, lifestyle property" },
                      { id: "horse", label: "🐴 Horse Property", description: "Agistment, breeding, riding" },
                      { id: "town-home", label: "🏠 Town Home", description: "Live in rural town, no livestock" },
                    ].map((type) => (
                      <Button
                        key={type.id}
                        variant={wizardData.propertyInfo.type === type.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, type: type.id },
                          })
                        }
                        className={`w-full p-4 h-auto text-left ${
                          wizardData.propertyInfo.type === type.id
                            ? "bg-red-500 text-white border-red-500"
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
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Fire Risk Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "LOW", label: "Low Risk", color: "green" },
                      { id: "MEDIUM", label: "Medium Risk", color: "amber" },
                      { id: "HIGH", label: "High Risk", color: "red" },
                    ].map((risk) => (
                      <Button
                        key={risk.id}
                        variant={wizardData.propertyInfo.riskLevel === risk.id ? "default" : "outline"}
                        onClick={() =>
                          setWizardData({
                            ...wizardData,
                            propertyInfo: { ...wizardData.propertyInfo, riskLevel: risk.id },
                          })
                        }
                        className={`p-3 text-sm ${
                          wizardData.propertyInfo.riskLevel === risk.id
                            ? `bg-${risk.color}-500 text-white border-${risk.color}-500`
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {risk.label}
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
                            ? "bg-red-500 text-white border-red-500"
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
                      { id: "generator", label: "⚡ Generator" },
                      { id: "water-pump", label: "💧 Water Pump" },
                      { id: "chainsaw", label: "🪚 Chainsaw" },
                      { id: "tractor", label: "🚜 Tractor" },
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
                            ? "bg-red-500 text-white border-red-500"
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

          {/* Step 3: Emergency Planning */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Emergency Planning</h3>
              <p className="text-slate-600 mb-6">Safe zones and community help</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Safe Zones Available</label>
                  <div className="space-y-2">
                    {[
                      { id: "cleared-paddock", label: "🌾 Large cleared paddock" },
                      { id: "dam-area", label: "💧 Near dam/water source" },
                      { id: "gravel-area", label: "🪨 Gravel/concrete area" },
                      { id: "neighbor-safe", label: "🏠 Neighbor's safe area" },
                      { id: "public-area", label: "🏛️ Public safe area" },
                    ].map((zone) => (
                      <Button
                        key={zone.id}
                        variant={wizardData.emergencyPlan.safeZones.includes(zone.id) ? "default" : "outline"}
                        onClick={() => {
                          const newZones = wizardData.emergencyPlan.safeZones.includes(zone.id)
                            ? wizardData.emergencyPlan.safeZones.filter((z) => z !== zone.id)
                            : [...wizardData.emergencyPlan.safeZones, zone.id]
                          setWizardData({
                            ...wizardData,
                            emergencyPlan: { ...wizardData.emergencyPlan, safeZones: newZones },
                          })
                        }}
                        className={`w-full p-3 text-left text-sm ${
                          wizardData.emergencyPlan.safeZones.includes(zone.id)
                            ? "bg-red-500 text-white border-red-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {zone.label}
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
                      { id: "equipment", label: "⚡ Equipment sharing (generators, pumps)" },
                      { id: "labor", label: "👥 Extra hands for evacuation" },
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
                            ? "bg-red-500 text-white border-red-500"
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
                disabled={currentStep === 1 && (!wizardData.propertyInfo.size || !wizardData.propertyInfo.type)}
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={generatePlan}
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
              >
                <Flame className="h-4 w-4 mr-2" />
                Generate My Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
