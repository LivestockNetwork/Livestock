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
import { AlertTriangle, MapPin, Users, Phone, Truck, Home, ArrowLeft, ArrowRight, Download } from "lucide-react"

interface FloodWizardProps {
  onComplete?: (plan: any) => void
}

export default function FloodWizard({ onComplete }: FloodWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Property Information
    propertyName: "",
    address: "",
    postcode: "",
    propertySize: "",
    floodRisk: "",

    // Livestock Information
    cattle: "",
    sheep: "",
    horses: "",
    pigs: "",
    poultry: "",
    other: "",

    // Infrastructure
    hasHighGround: false,
    highGroundLocation: "",
    hasBoats: false,
    boatDetails: "",
    evacuationRoutes: "",

    // Emergency Contacts
    emergencyContact1: "",
    emergencyContact2: "",
    veterinarian: "",
    localSES: "",

    // Resources
    feedStorage: "",
    waterStorage: "",
    fuelStorage: "",
    equipmentList: "",

    // Community
    helpNeeded: "",
    helpOffered: "",
    specialNeeds: "",
  })

  const totalSteps = 6

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
      planType: "flood",
    }

    if (onComplete) {
      onComplete(plan)
    }

    // For demo purposes, show completion
    setCurrentStep(totalSteps + 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
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
                  placeholder="e.g., Riverside Farm"
                />
              </div>

              <div>
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="123 Rural Road, Town"
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
                  placeholder="100"
                />
              </div>

              <div>
                <Label htmlFor="floodRisk">Known Flood Risk Level</Label>
                <Select value={formData.floodRisk} onValueChange={(value) => updateFormData("floodRisk", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flood risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Rare flooding</SelectItem>
                    <SelectItem value="moderate">Moderate - Occasional flooding</SelectItem>
                    <SelectItem value="high">High - Regular flooding</SelectItem>
                    <SelectItem value="extreme">Extreme - Frequent flooding</SelectItem>
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
                <Home className="h-5 w-5 text-purple-600" />
                Infrastructure & Evacuation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasHighGround"
                  checked={formData.hasHighGround}
                  onCheckedChange={(checked) => updateFormData("hasHighGround", checked)}
                />
                <Label htmlFor="hasHighGround">Property has higher ground for livestock evacuation</Label>
              </div>

              {formData.hasHighGround && (
                <div>
                  <Label htmlFor="highGroundLocation">Describe high ground location</Label>
                  <Textarea
                    id="highGroundLocation"
                    value={formData.highGroundLocation}
                    onChange={(e) => updateFormData("highGroundLocation", e.target.value)}
                    placeholder="Location and capacity of high ground areas"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasBoats"
                  checked={formData.hasBoats}
                  onCheckedChange={(checked) => updateFormData("hasBoats", checked)}
                />
                <Label htmlFor="hasBoats">Access to boats or watercraft</Label>
              </div>

              {formData.hasBoats && (
                <div>
                  <Label htmlFor="boatDetails">Boat details</Label>
                  <Textarea
                    id="boatDetails"
                    value={formData.boatDetails}
                    onChange={(e) => updateFormData("boatDetails", e.target.value)}
                    placeholder="Type of boats, capacity, location"
                    rows={3}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="evacuationRoutes">Evacuation Routes</Label>
                <Textarea
                  id="evacuationRoutes"
                  value={formData.evacuationRoutes}
                  onChange={(e) => updateFormData("evacuationRoutes", e.target.value)}
                  placeholder="Primary and alternative evacuation routes from your property"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
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
                <Label htmlFor="localSES">Local SES/Emergency Services</Label>
                <Input
                  id="localSES"
                  value={formData.localSES}
                  onChange={(e) => updateFormData("localSES", e.target.value)}
                  placeholder="Local SES unit contact"
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
                <Truck className="h-5 w-5 text-orange-600" />
                Resources & Supplies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="feedStorage">Feed Storage (days supply)</Label>
                <Input
                  id="feedStorage"
                  value={formData.feedStorage}
                  onChange={(e) => updateFormData("feedStorage", e.target.value)}
                  placeholder="How many days of feed do you have stored?"
                />
              </div>

              <div>
                <Label htmlFor="waterStorage">Water Storage</Label>
                <Input
                  id="waterStorage"
                  value={formData.waterStorage}
                  onChange={(e) => updateFormData("waterStorage", e.target.value)}
                  placeholder="Water storage capacity and backup sources"
                />
              </div>

              <div>
                <Label htmlFor="fuelStorage">Fuel Storage</Label>
                <Input
                  id="fuelStorage"
                  value={formData.fuelStorage}
                  onChange={(e) => updateFormData("fuelStorage", e.target.value)}
                  placeholder="Fuel storage for generators, vehicles, etc."
                />
              </div>

              <div>
                <Label htmlFor="equipmentList">Emergency Equipment</Label>
                <Textarea
                  id="equipmentList"
                  value={formData.equipmentList}
                  onChange={(e) => updateFormData("equipmentList", e.target.value)}
                  placeholder="List emergency equipment (generators, pumps, tools, etc.)"
                  rows={4}
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
                  placeholder="What help might you need from locals during a flood? (evacuation assistance, temporary agistment, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="helpOffered">Help You Can Offer</Label>
                <Textarea
                  id="helpOffered"
                  value={formData.helpOffered}
                  onChange={(e) => updateFormData("helpOffered", e.target.value)}
                  placeholder="What help can you offer to locals? (high ground, boats, equipment, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specialNeeds">Special Considerations</Label>
                <Textarea
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => updateFormData("specialNeeds", e.target.value)}
                  placeholder="Any special needs or considerations (elderly animals, medical requirements, etc.)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Download className="h-5 w-5" />
                Your Flood Emergency Plan is Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Plan Generated Successfully</h3>
                <p className="text-green-700 text-sm">
                  Your personalized flood emergency plan has been created based on your property details and livestock.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Your Plan Includes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Badge variant="secondary" className="justify-start">
                    Property evacuation routes
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Livestock movement plan
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Emergency contact list
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Resource inventory
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Community support network
                  </Badge>
                  <Badge variant="secondary" className="justify-start">
                    Action timeline
                  </Badge>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Share your plan with family and workers</li>
                  <li>• Connect with locals on higher ground</li>
                  <li>• Identify locals with boats or equipment</li>
                  <li>• Practice your evacuation procedures</li>
                  <li>• Review and update your plan regularly</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Plan
                </Button>
                <Button variant="outline">Share with Community</Button>
                <Button variant="outline">Create Another Plan</Button>
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
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Flood Emergency Planning</h3>
            <p className="text-amber-700 text-sm mt-1">
              This wizard will help you create a personalized flood emergency plan for your property and livestock. Take
              your time to provide accurate information.
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
          <Button onClick={generatePlan} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            Generate Plan
            <Download className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex items-center gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
