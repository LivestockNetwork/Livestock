"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Flame,
  MapPin,
  Users,
  Phone,
  Truck,
  Home,
  ArrowLeft,
  ArrowRight,
  Download,
  AlertTriangle,
  Share2,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BushfireWizardProps {
  onComplete?: (plan: any) => void
}

export default function BushfireWizard({ onComplete }: BushfireWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    // Property Information
    propertyName: "",
    address: "",
    postcode: "",
    propertySize: "",
    bushfireRisk: "",
    vegetationType: "",

    // Livestock Information
    cattle: "",
    sheep: "",
    horses: "",
    pigs: "",
    poultry: "",
    other: "",

    // Infrastructure & Defenses
    hasFireBreaks: false,
    fireBreakDetails: "",
    hasWaterSupply: false,
    waterSupplyDetails: "",
    hasSprinklers: false,
    sprinklerDetails: "",
    buildingMaterials: "",

    // Evacuation Planning
    evacuationTriggers: "",
    evacuationRoutes: "",
    assemblyPoint: "",
    transportArrangements: "",

    // Emergency Contacts
    emergencyContact1: "",
    emergencyContact2: "",
    veterinarian: "",
    localRFS: "",

    // Resources & Equipment
    fireEquipment: "",
    fuelStorage: "",
    emergencySupplies: "",
    communicationEquipment: "",

    // Community Support
    helpNeeded: "",
    helpOffered: "",
    specialConsiderations: "",
  })

  const totalSteps = 7

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  const generatePlan = () => {
    const plan = {
      ...formData,
      generatedAt: new Date().toISOString(),
      planType: "bushfire",
      planId: `bushfire-${Date.now()}`,
    }

    setGeneratedPlan(plan)

    if (onComplete) {
      onComplete(plan)
    }

    // Show completion
    setCurrentStep(totalSteps + 1)

    toast({
      title: "Bushfire Emergency Plan Generated!",
      description: "Your personalized plan is ready for download and sharing.",
    })
  }

  const downloadPDF = () => {
    if (!generatedPlan) return

    // Create a comprehensive text version of the plan for download
    const planText = `
BUSHFIRE EMERGENCY PLAN
Generated: ${new Date(generatedPlan.generatedAt).toLocaleDateString()}

PROPERTY INFORMATION
Property Name: ${generatedPlan.propertyName}
Address: ${generatedPlan.address}
Postcode: ${generatedPlan.postcode}
Size: ${generatedPlan.propertySize} hectares
Bushfire Risk: ${generatedPlan.bushfireRisk}
Vegetation Type: ${generatedPlan.vegetationType}

LIVESTOCK
Cattle: ${generatedPlan.cattle}
Sheep: ${generatedPlan.sheep}
Horses: ${generatedPlan.horses}
Pigs: ${generatedPlan.pigs}
Poultry: ${generatedPlan.poultry}
Other: ${generatedPlan.other}

FIRE DEFENSES & INFRASTRUCTURE
Fire Breaks: ${generatedPlan.hasFireBreaks ? "Yes" : "No"}
${generatedPlan.hasFireBreaks ? `Fire Break Details: ${generatedPlan.fireBreakDetails}` : ""}
Water Supply: ${generatedPlan.hasWaterSupply ? "Yes" : "No"}
${generatedPlan.hasWaterSupply ? `Water Supply Details: ${generatedPlan.waterSupplyDetails}` : ""}
Sprinklers: ${generatedPlan.hasSprinklers ? "Yes" : "No"}
${generatedPlan.hasSprinklers ? `Sprinkler Details: ${generatedPlan.sprinklerDetails}` : ""}
Building Materials: ${generatedPlan.buildingMaterials}

EVACUATION PLANNING
Evacuation Triggers: ${generatedPlan.evacuationTriggers}
Evacuation Routes: ${generatedPlan.evacuationRoutes}
Assembly Point: ${generatedPlan.assemblyPoint}
Transport Arrangements: ${generatedPlan.transportArrangements}

EMERGENCY CONTACTS
Primary Contact: ${generatedPlan.emergencyContact1}
Secondary Contact: ${generatedPlan.emergencyContact2}
Veterinarian: ${generatedPlan.veterinarian}
Local RFS: ${generatedPlan.localRFS}

FIRE EQUIPMENT & RESOURCES
Fire Equipment: ${generatedPlan.fireEquipment}
Fuel Storage: ${generatedPlan.fuelStorage}
Emergency Supplies: ${generatedPlan.emergencySupplies}
Communication Equipment: ${generatedPlan.communicationEquipment}

COMMUNITY SUPPORT
Help Needed: ${generatedPlan.helpNeeded}
Help Offered: ${generatedPlan.helpOffered}
Special Considerations: ${generatedPlan.specialConsiderations}
    `

    const blob = new Blob([planText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bushfire-emergency-plan-${generatedPlan.propertyName || "property"}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Plan Downloaded!",
      description: "Your bushfire emergency plan has been saved to your device.",
    })
  }

  const sharePlan = () => {
    if (!generatedPlan) return

    const shareText = `I've created a bushfire emergency plan for ${generatedPlan.propertyName}. Join our rural community emergency network to share resources and support each other during fire season.`

    if (navigator.share) {
      navigator
        .share({
          title: "Bushfire Emergency Plan",
          text: shareText,
          url: window.location.origin + "/preparedness/bushfire",
        })
        .then(() => {
          toast({
            title: "Plan Shared!",
            description: "Your emergency plan has been shared successfully.",
          })
        })
        .catch(() => {
          // Fallback to clipboard
          copyToClipboard(shareText)
        })
    } else {
      // Fallback to clipboard
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to Clipboard!",
          description: "Share text has been copied. You can paste it anywhere.",
        })
      })
      .catch(() => {
        toast({
          title: "Share Information",
          description: text,
        })
      })
  }

  const createAnotherPlan = () => {
    // Reset the wizard
    setCurrentStep(1)
    setGeneratedPlan(null)
    setFormData({
      propertyName: "",
      address: "",
      postcode: "",
      propertySize: "",
      bushfireRisk: "",
      vegetationType: "",
      cattle: "",
      sheep: "",
      horses: "",
      pigs: "",
      poultry: "",
      other: "",
      hasFireBreaks: false,
      fireBreakDetails: "",
      hasWaterSupply: false,
      waterSupplyDetails: "",
      hasSprinklers: false,
      sprinklerDetails: "",
      buildingMaterials: "",
      evacuationTriggers: "",
      evacuationRoutes: "",
      assemblyPoint: "",
      transportArrangements: "",
      emergencyContact1: "",
      emergencyContact2: "",
      veterinarian: "",
      localRFS: "",
      fireEquipment: "",
      fuelStorage: "",
      emergencySupplies: "",
      communicationEquipment: "",
      helpNeeded: "",
      helpOffered: "",
      specialConsiderations: "",
    })

    toast({
      title: "New Plan Started",
      description: "You can now create another bushfire emergency plan.",
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  value={formData.propertyName}
                  onChange={(e) => updateFormData("propertyName", e.target.value)}
                  placeholder="e.g., Hillside Station"
                />
              </div>

              <div>
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="123 Bush Road, Town"
                />
              </div>

              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => updateFormData("postcode", e.target.value)}
                  placeholder="2000"
                />
              </div>

              <div>
                <Label htmlFor="propertySize">Property Size (hectares)</Label>
                <Input
                  id="propertySize"
                  value={formData.propertySize}
                  onChange={(e) => updateFormData("propertySize", e.target.value)}
                  placeholder="500"
                />
              </div>

              <div>
                <Label htmlFor="bushfireRisk">Bushfire Risk Rating</Label>
                <Select value={formData.bushfireRisk} onValueChange={(value) => updateFormData("bushfireRisk", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bushfire risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minimal vegetation</SelectItem>
                    <SelectItem value="moderate">Moderate - Some bush/grassland</SelectItem>
                    <SelectItem value="high">High - Dense vegetation nearby</SelectItem>
                    <SelectItem value="extreme">Extreme - Surrounded by bush</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="vegetationType">Surrounding Vegetation</Label>
                <Select
                  value={formData.vegetationType}
                  onValueChange={(value) => updateFormData("vegetationType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary vegetation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grassland">Grassland</SelectItem>
                    <SelectItem value="woodland">Woodland</SelectItem>
                    <SelectItem value="forest">Dense Forest</SelectItem>
                    <SelectItem value="scrubland">Scrubland/Mallee</SelectItem>
                    <SelectItem value="mixed">Mixed Vegetation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Livestock Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cattle">Cattle</Label>
                  <Input
                    id="cattle"
                    type="number"
                    value={formData.cattle}
                    onChange={(e) => updateFormData("cattle", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="sheep">Sheep</Label>
                  <Input
                    id="sheep"
                    type="number"
                    value={formData.sheep}
                    onChange={(e) => updateFormData("sheep", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="horses">Horses</Label>
                  <Input
                    id="horses"
                    type="number"
                    value={formData.horses}
                    onChange={(e) => updateFormData("horses", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="pigs">Pigs</Label>
                  <Input
                    id="pigs"
                    type="number"
                    value={formData.pigs}
                    onChange={(e) => updateFormData("pigs", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="poultry">Poultry</Label>
                  <Input
                    id="poultry"
                    type="number"
                    value={formData.poultry}
                    onChange={(e) => updateFormData("poultry", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="other">Other Animals</Label>
                <Textarea
                  id="other"
                  value={formData.other}
                  onChange={(e) => updateFormData("other", e.target.value)}
                  placeholder="Describe any other animals (goats, alpacas, etc.)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Fire Defenses & Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasFireBreaks"
                  checked={formData.hasFireBreaks}
                  onCheckedChange={(checked) => updateFormData("hasFireBreaks", checked)}
                />
                <Label htmlFor="hasFireBreaks">Property has fire breaks or cleared areas</Label>
              </div>

              {formData.hasFireBreaks && (
                <div>
                  <Label htmlFor="fireBreakDetails">Fire Break Details</Label>
                  <Textarea
                    id="fireBreakDetails"
                    value={formData.fireBreakDetails}
                    onChange={(e) => updateFormData("fireBreakDetails", e.target.value)}
                    placeholder="Describe location, width, and maintenance of fire breaks"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasWaterSupply"
                  checked={formData.hasWaterSupply}
                  onCheckedChange={(checked) => updateFormData("hasWaterSupply", checked)}
                />
                <Label htmlFor="hasWaterSupply">Dedicated water supply for firefighting</Label>
              </div>

              {formData.hasWaterSupply && (
                <div>
                  <Label htmlFor="waterSupplyDetails">Water Supply Details</Label>
                  <Textarea
                    id="waterSupplyDetails"
                    value={formData.waterSupplyDetails}
                    onChange={(e) => updateFormData("waterSupplyDetails", e.target.value)}
                    placeholder="Describe water sources, capacity, and pump systems"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasSprinklers"
                  checked={formData.hasSprinklers}
                  onCheckedChange={(checked) => updateFormData("hasSprinklers", checked)}
                />
                <Label htmlFor="hasSprinklers">Building sprinkler systems installed</Label>
              </div>

              {formData.hasSprinklers && (
                <div>
                  <Label htmlFor="sprinklerDetails">Sprinkler System Details</Label>
                  <Textarea
                    id="sprinklerDetails"
                    value={formData.sprinklerDetails}
                    onChange={(e) => updateFormData("sprinklerDetails", e.target.value)}
                    placeholder="Describe sprinkler coverage and activation systems"
                    rows={3}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="buildingMaterials">Main Building Materials</Label>
                <Select
                  value={formData.buildingMaterials}
                  onValueChange={(value) => updateFormData("buildingMaterials", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary building materials" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brick">Brick/Masonry</SelectItem>
                    <SelectItem value="metal">Metal/Steel</SelectItem>
                    <SelectItem value="timber">Timber/Wood</SelectItem>
                    <SelectItem value="mixed">Mixed Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-600" />
                Evacuation Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="evacuationTriggers">Evacuation Triggers</Label>
                <Textarea
                  id="evacuationTriggers"
                  value={formData.evacuationTriggers}
                  onChange={(e) => updateFormData("evacuationTriggers", e.target.value)}
                  placeholder="What conditions will trigger evacuation? (fire rating, wind speed, proximity, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="evacuationRoutes">Primary & Alternative Evacuation Routes</Label>
                <Textarea
                  id="evacuationRoutes"
                  value={formData.evacuationRoutes}
                  onChange={(e) => updateFormData("evacuationRoutes", e.target.value)}
                  placeholder="Describe main and backup evacuation routes from your property"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="assemblyPoint">Safe Assembly Point</Label>
                <Input
                  id="assemblyPoint"
                  value={formData.assemblyPoint}
                  onChange={(e) => updateFormData("assemblyPoint", e.target.value)}
                  placeholder="Where will you meet/gather during evacuation?"
                />
              </div>

              <div>
                <Label htmlFor="transportArrangements">Livestock Transport</Label>
                <Textarea
                  id="transportArrangements"
                  value={formData.transportArrangements}
                  onChange={(e) => updateFormData("transportArrangements", e.target.value)}
                  placeholder="How will you transport livestock? (own trucks, local arrangements, etc.)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emergencyContact1">Primary Emergency Contact</Label>
                <Input
                  id="emergencyContact1"
                  value={formData.emergencyContact1}
                  onChange={(e) => updateFormData("emergencyContact1", e.target.value)}
                  placeholder="Name and phone number"
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact2">Secondary Emergency Contact</Label>
                <Input
                  id="emergencyContact2"
                  value={formData.emergencyContact2}
                  onChange={(e) => updateFormData("emergencyContact2", e.target.value)}
                  placeholder="Name and phone number"
                />
              </div>

              <div>
                <Label htmlFor="veterinarian">Local Veterinarian</Label>
                <Input
                  id="veterinarian"
                  value={formData.veterinarian}
                  onChange={(e) => updateFormData("veterinarian", e.target.value)}
                  placeholder="Vet clinic name and phone number"
                />
              </div>

              <div>
                <Label htmlFor="localRFS">Local RFS/Fire Brigade</Label>
                <Input
                  id="localRFS"
                  value={formData.localRFS}
                  onChange={(e) => updateFormData("localRFS", e.target.value)}
                  placeholder="Local fire service contact"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                Fire Equipment & Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fireEquipment">Fire Fighting Equipment</Label>
                <Textarea
                  id="fireEquipment"
                  value={formData.fireEquipment}
                  onChange={(e) => updateFormData("fireEquipment", e.target.value)}
                  placeholder="List fire equipment (hoses, pumps, extinguishers, protective gear, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="fuelStorage">Fuel Storage & Management</Label>
                <Textarea
                  id="fuelStorage"
                  value={formData.fuelStorage}
                  onChange={(e) => updateFormData("fuelStorage", e.target.value)}
                  placeholder="Describe fuel storage locations and fire safety measures"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="emergencySupplies">Emergency Supplies</Label>
                <Textarea
                  id="emergencySupplies"
                  value={formData.emergencySupplies}
                  onChange={(e) => updateFormData("emergencySupplies", e.target.value)}
                  placeholder="Emergency supplies for family and animals (food, water, medical, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="communicationEquipment">Communication Equipment</Label>
                <Input
                  id="communicationEquipment"
                  value={formData.communicationEquipment}
                  onChange={(e) => updateFormData("communicationEquipment", e.target.value)}
                  placeholder="Radios, satellite phones, emergency beacons, etc."
                />
              </div>
            </CardContent>
          </Card>
        )

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                Community Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="helpNeeded">Help You Might Need</Label>
                <Textarea
                  id="helpNeeded"
                  value={formData.helpNeeded}
                  onChange={(e) => updateFormData("helpNeeded", e.target.value)}
                  placeholder="What help might you need from locals during a bushfire? (evacuation assistance, temporary agistment, firefighting support, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="helpOffered">Help You Can Offer</Label>
                <Textarea
                  id="helpOffered"
                  value={formData.helpOffered}
                  onChange={(e) => updateFormData("helpOffered", e.target.value)}
                  placeholder="What help can you offer to locals? (safe areas, water supply, equipment, transport, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specialConsiderations">Special Considerations</Label>
                <Textarea
                  id="specialConsiderations"
                  value={formData.specialConsiderations}
                  onChange={(e) => updateFormData("specialConsiderations", e.target.value)}
                  placeholder="Any special considerations (elderly animals, heritage buildings, hazardous materials, etc.)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 8:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Download className="h-5 w-5" />
                Your Bushfire Emergency Plan is Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Plan Generated Successfully</h3>
                <p className="text-orange-700 text-sm">
                  Your personalized bushfire emergency plan has been created based on your property details, defenses,
                  and livestock.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Your Plan Includes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Badge variant="secondary" className="justify-start">
                    Property risk assessment
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Fire defense strategies
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Livestock evacuation plan
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Emergency contact list
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Equipment inventory
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Community support network
                  </Badge>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Critical Actions:</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Practice evacuation procedures regularly</li>
                  <li>• Maintain fire breaks and clear vegetation</li>
                  <li>• Test water pumps and firefighting equipment</li>
                  <li>• Connect with locals for mutual support</li>
                  <li>• Monitor fire danger ratings daily during fire season</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={downloadPDF} className="bg-orange-600 hover:bg-orange-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Plan
                </Button>
                <Button variant="outline" onClick={sharePlan}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Community
                </Button>
                <Button variant="outline" onClick={createAnotherPlan}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Another Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  if (currentStep > totalSteps) {
    return renderStep()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-800">Bushfire Emergency Planning</h3>
            <p className="text-orange-700 text-sm mt-1">
              This wizard will help you create a comprehensive bushfire emergency plan for your property and livestock.
              Take time to provide detailed information for the most effective plan.
            </p>
          </div>
        </div>
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button onClick={generatePlan} className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
            Generate Plan
            <Download className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
