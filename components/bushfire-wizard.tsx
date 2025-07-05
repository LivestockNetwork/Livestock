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
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  Share2,
} from "lucide-react"

interface WizardData {
  propertySize: string
  propertyType: string
  livestock: string[]
  livestockNumbers: { [key: string]: number }
  equipment: string[]
  waterSources: string[]
  safeZones: string[]
  evacuationRoutes: string
  emergencyContacts: string
  communityHelp: string[]
}

export default function BushfireWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    propertySize: "",
    propertyType: "",
    livestock: [],
    livestockNumbers: {},
    equipment: [],
    waterSources: [],
    safeZones: [],
    evacuationRoutes: "",
    emergencyContacts: "",
    communityHelp: [],
  })
  const [showPlan, setShowPlan] = useState(false)

  const totalSteps = 7

  const propertyTypes = [
    { id: "farm", label: "🚜 Working Farm", description: "Crops, grazing, mixed farming" },
    { id: "hobby", label: "🐓 Hobby Farm", description: "Small acreage, lifestyle property" },
    { id: "horse", label: "🐴 Horse Property", description: "Agistment, breeding, riding" },
    { id: "rural-town", label: "🏘️ Rural Town", description: "In town but with animals/land" },
  ]

  const livestockOptions = [
    { id: "cattle", label: "🐄 Cattle", mobile: "low" },
    { id: "horses", label: "🐴 Horses", mobile: "high" },
    { id: "sheep", label: "🐑 Sheep", mobile: "medium" },
    { id: "goats", label: "🐐 Goats", mobile: "medium" },
    { id: "pigs", label: "🐷 Pigs", mobile: "low" },
    { id: "chickens", label: "🐓 Chickens", mobile: "high" },
    { id: "alpacas", label: "🦙 Alpacas", mobile: "medium" },
  ]

  const equipmentOptions = [
    { id: "truck", label: "🚛 Truck", critical: true },
    { id: "trailer", label: "🚚 Livestock Trailer", critical: true },
    { id: "tractor", label: "🚜 Tractor", critical: false },
    { id: "generator", label: "⚡ Generator", critical: true },
    { id: "water-pump", label: "💧 Water Pump", critical: true },
    { id: "chainsaw", label: "🪚 Chainsaw", critical: false },
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

  const getBushfirePlan = () => {
    const plan = {
      riskLevel: calculateRiskLevel(),
      immediateActions: getImmediateActions(),
      livestockPlan: getLivestockPlan(),
      equipmentChecklist: getEquipmentChecklist(),
      evacuationPlan: getEvacuationPlan(),
      communityResources: getCommunityResources(),
    }
    return plan
  }

  const calculateRiskLevel = () => {
    let risk = 0
    if (wizardData.propertySize === "large") risk += 2
    if (wizardData.livestock.length > 3) risk += 2
    if (!wizardData.equipment.includes("truck")) risk += 3
    if (wizardData.safeZones.length === 0) risk += 2

    if (risk >= 6) return { level: "HIGH", color: "red" }
    if (risk >= 3) return { level: "MEDIUM", color: "amber" }
    return { level: "LOW", color: "green" }
  }

  const getImmediateActions = () => {
    const actions = []

    if (wizardData.livestock.includes("horses")) {
      actions.push("🐴 Horses: Halter and lead ropes ready, know which horses load easily")
    }
    if (wizardData.livestock.includes("cattle")) {
      actions.push("🐄 Cattle: Open gates to safe paddocks, have dogs ready for mustering")
    }
    if (wizardData.livestock.includes("chickens")) {
      actions.push("🐓 Chickens: Portable cages ready, can catch quickly in emergency")
    }

    actions.push("📱 Charge all devices, have battery packs ready")
    actions.push("🚛 Fuel vehicles and equipment, check tire pressure")
    actions.push("💧 Fill water tanks, check pump operation")

    return actions
  }

  const getLivestockPlan = () => {
    return wizardData.livestock.map((animal) => {
      const animalData = livestockOptions.find((opt) => opt.id === animal)
      const count = wizardData.livestockNumbers[animal] || 0

      let plan = ""
      switch (animal) {
        case "horses":
          plan =
            count > 5
              ? "Large herd: Identify 2-3 lead horses, others will follow. Need multiple trips or community help."
              : "Small group: Can evacuate in single trip with float/truck. Practice loading beforehand."
          break
        case "cattle":
          plan =
            count > 20
              ? "Large herd: Move to safest paddock early, may need to leave if fire approaches. Mark with spray paint for identification."
              : "Small herd: Can potentially truck out with community help. Identify safe agistment now."
          break
        case "chickens":
          plan = "Portable: Catch and cage quickly. Have carriers ready. Can evacuate in car if needed."
          break
        default:
          plan = `${animalData?.mobile} mobility - plan accordingly`
      }

      return {
        animal: animalData?.label || animal,
        count,
        plan,
        mobility: animalData?.mobile,
      }
    })
  }

  const getEquipmentChecklist = () => {
    const available = wizardData.equipment
    const missing = equipmentOptions.filter((eq) => !available.includes(eq.id) && eq.critical)

    return {
      available: equipmentOptions.filter((eq) => available.includes(eq.id)),
      missing: missing,
      recommendations:
        missing.length > 0
          ? "Critical equipment missing - connect with neighbors who have these items"
          : "Good equipment coverage - offer to help neighbors who need these items",
    }
  }

  const getEvacuationPlan = () => {
    return {
      routes: wizardData.evacuationRoutes || "Identify 2+ routes out of your area",
      meetingPoint: "Designate safe meeting point for family/workers",
      timeline:
        wizardData.livestock.length > 0
          ? "Start moving livestock when fire danger reaches SEVERE (not EXTREME - too late)"
          : "Can evacuate quickly when authorities advise",
      priorities: [
        "1. Human safety first - never risk lives for animals",
        "2. Most valuable/mobile animals first",
        "3. Equipment that can help community",
        "4. Important documents (insurance, animal records)",
      ],
    }
  }

  const getCommunityResources = () => {
    return {
      needed: wizardData.communityHelp,
      canOffer: wizardData.equipment.filter((eq) => equipmentOptions.find((opt) => opt.id === eq)?.critical),
      connections: [
        "Connect with neighbors who have trucks/trailers",
        "Identify safe agistment properties",
        "Share contact details with local fire brigade",
        "Join local emergency WhatsApp/Facebook groups",
      ],
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
                <p className="opacity-90">Personalized for your property and livestock</p>
              </div>
            </div>

            <Badge className={`bg-white/20 text-white font-bold px-4 py-2`}>Risk Level: {plan.riskLevel.level}</Badge>
          </div>

          <CardContent className="p-8 space-y-8">
            {/* Immediate Actions */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Immediate Actions (Do These NOW)
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

            {/* Livestock Plan */}
            {plan.livestockPlan.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  Your Livestock Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plan.livestockPlan.map((livestock, index) => (
                    <Card key={index} className="border-l-4 border-amber-400">
                      <CardContent className="p-4">
                        <div className="font-bold text-slate-800 mb-2">
                          {livestock.animal} ({livestock.count})
                        </div>
                        <p className="text-sm text-slate-600">{livestock.plan}</p>
                        <Badge
                          className={`mt-2 text-xs ${
                            livestock.mobility === "high"
                              ? "bg-green-100 text-green-700"
                              : livestock.mobility === "medium"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {livestock.mobility} mobility
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Status */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Equipment & Resources
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ You Have:</h4>
                  <div className="space-y-1">
                    {plan.equipmentChecklist.available.map((item, index) => (
                      <div key={index} className="text-sm text-slate-600">
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {plan.equipmentChecklist.missing.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">❌ Critical Missing:</h4>
                    <div className="space-y-1">
                      {plan.equipmentChecklist.missing.map((item, index) => (
                        <div key={index} className="text-sm text-slate-600">
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{plan.equipmentChecklist.recommendations}</p>
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
                  <h4 className="font-semibold text-purple-800 mb-2">Timeline:</h4>
                  <p className="text-purple-700">{plan.evacuationPlan.timeline}</p>
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
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
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
                onClick={() => (window.location.href = "/community")}
              >
                Connect with Neighbors
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
              <p className="opacity-90">Get your personalized emergency plan</p>
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
          {/* Step 1: Property Size */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What size is your property?</h3>
              <p className="text-slate-600 mb-6">This helps us understand your evacuation challenges</p>

              <div className="space-y-3">
                {[
                  { id: "small", label: "Under 5 acres", description: "Hobby farm, lifestyle block" },
                  { id: "medium", label: "5-50 acres", description: "Small farm, horse property" },
                  { id: "large", label: "50+ acres", description: "Working farm, station" },
                ].map((size) => (
                  <Button
                    key={size.id}
                    variant={wizardData.propertySize === size.id ? "default" : "outline"}
                    onClick={() => setWizardData({ ...wizardData, propertySize: size.id })}
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.propertySize === size.id
                        ? "bg-red-500 text-white border-red-500"
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
          )}

          {/* Step 2: Property Type */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What type of property?</h3>
              <p className="text-slate-600 mb-6">Different properties have different fire risks and evacuation needs</p>

              <div className="space-y-3">
                {propertyTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={wizardData.propertyType === type.id ? "default" : "outline"}
                    onClick={() => setWizardData({ ...wizardData, propertyType: type.id })}
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.propertyType === type.id
                        ? "bg-red-500 text-white border-red-500"
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

          {/* Step 3: Livestock */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What animals do you have?</h3>
              <p className="text-slate-600 mb-6">Select all that apply - we'll create evacuation plans for each</p>

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
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{animal.label}</div>
                      <div className="text-xs opacity-80 mt-1">{animal.mobile} mobility</div>
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
            </div>
          )}

          {/* Step 4: Livestock Numbers */}
          {currentStep === 4 && wizardData.livestock.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">How many of each?</h3>
              <p className="text-slate-600 mb-6">Numbers help us plan transport and evacuation logistics</p>

              <div className="space-y-4">
                {wizardData.livestock.map((animalId) => {
                  const animal = livestockOptions.find((a) => a.id === animalId)
                  return (
                    <div key={animalId} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold">{animal?.label}</div>
                      </div>
                      <input
                        type="number"
                        min="1"
                        placeholder="0"
                        value={wizardData.livestockNumbers[animalId] || ""}
                        onChange={(e) =>
                          setWizardData({
                            ...wizardData,
                            livestockNumbers: {
                              ...wizardData.livestockNumbers,
                              [animalId]: Number.parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-20 p-2 border border-slate-300 rounded text-center"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Equipment */}
          {currentStep === 5 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What equipment do you have?</h3>
              <p className="text-slate-600 mb-6">Critical equipment for evacuation and fire fighting</p>

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
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{equipment.label}</span>
                    {equipment.critical && <Badge className="bg-red-100 text-red-700 text-xs">Critical</Badge>}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Safe Zones */}
          {currentStep === 6 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Do you have safe zones?</h3>
              <p className="text-slate-600 mb-6">Areas on or near your property that are safer during fires</p>

              <div className="space-y-3">
                {[
                  {
                    id: "cleared-paddock",
                    label: "🌾 Large cleared paddock",
                    description: "Minimal fuel, good visibility",
                  },
                  { id: "dam-area", label: "💧 Near dam/water source", description: "Water access, often cleared" },
                  { id: "gravel-area", label: "🪨 Gravel/concrete area", description: "No fuel, hard surfaces" },
                  { id: "neighbor-safe", label: "🏠 Neighbor's safe area", description: "Arranged safe zone nearby" },
                  { id: "public-area", label: "🏛️ Public safe area", description: "School, hall, sports ground" },
                ].map((zone) => (
                  <Button
                    key={zone.id}
                    variant={wizardData.safeZones.includes(zone.id) ? "default" : "outline"}
                    onClick={() => {
                      const newZones = wizardData.safeZones.includes(zone.id)
                        ? wizardData.safeZones.filter((z) => z !== zone.id)
                        : [...wizardData.safeZones, zone.id]
                      setWizardData({ ...wizardData, safeZones: newZones })
                    }}
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.safeZones.includes(zone.id)
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{zone.label}</div>
                      <div className="text-sm opacity-80">{zone.description}</div>
                    </div>
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setWizardData({ ...wizardData, safeZones: [] })}
                className="w-full mt-4 border-red-300 text-red-700 hover:bg-red-50"
              >
                ❌ No safe zones identified - need help finding some
              </Button>
            </div>
          )}

          {/* Step 7: Community Help */}
          {currentStep === 7 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">What community help do you need?</h3>
              <p className="text-slate-600 mb-6">We'll connect you with neighbors who can help</p>

              <div className="space-y-3">
                {[
                  { id: "transport", label: "🚛 Transport/Trucks", description: "Help moving livestock or equipment" },
                  { id: "agistment", label: "🌾 Emergency agistment", description: "Safe paddocks for your animals" },
                  { id: "equipment", label: "⚡ Equipment sharing", description: "Generators, pumps, tools" },
                  { id: "labor", label: "👥 Extra hands", description: "Help with evacuation/preparation" },
                  { id: "coordination", label: "📱 Communication hub", description: "Central contact for your area" },
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
                    className={`w-full p-4 h-auto text-left ${
                      wizardData.communityHelp.includes(help.id)
                        ? "bg-red-500 text-white border-red-500"
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
                  (currentStep === 1 && !wizardData.propertySize) ||
                  (currentStep === 2 && !wizardData.propertyType) ||
                  (currentStep === 4 &&
                    wizardData.livestock.length > 0 &&
                    !wizardData.livestock.every((animal) => wizardData.livestockNumbers[animal] > 0))
                }
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
