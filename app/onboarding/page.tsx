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
import { Users, ArrowRight, ArrowLeft, MapPin, User, Truck, CheckCircle, Heart, Shield } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",

    // Step 2: Location
    postcode: "",
    suburb: "",
    state: "",
    propertyName: "",

    // Step 3: Profile
    propertyType: "",
    propertySize: "",
    livestock: [],
    equipment: [],
    skills: [],

    // Step 4: Community
    helpOffer: "",
    helpNeed: "",
    emergencyContact: "",

    // Step 5: Preferences
    notifications: {
      emergency: true,
      community: true,
      equipment: false,
      livestock: false,
    },
    privacy: "local",
  })

  const totalSteps = 5

  const updateFormData = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
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

  const completeOnboarding = () => {
    // In a real app, this would save to database
    console.log("Onboarding completed:", formData)
    // Redirect to community
    window.location.href = "/community"
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" />
                Let's Get You Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="0412 345 678"
                />
              </div>

              <div>
                <Label htmlFor="password">Create Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Choose a secure password"
                />
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-teal-700">
                  <strong>Why we need this:</strong> Your contact details help locals reach you during emergencies and
                  for community coordination. We never share your information without permission.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Where Are You Located?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => updateFormData("postcode", e.target.value)}
                  placeholder="2430"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="suburb">Suburb/Town *</Label>
                  <Input
                    id="suburb"
                    value={formData.suburb}
                    onChange={(e) => updateFormData("suburb", e.target.value)}
                    placeholder="Taree"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">NSW</SelectItem>
                      <SelectItem value="QLD">QLD</SelectItem>
                      <SelectItem value="VIC">VIC</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="TAS">TAS</SelectItem>
                      <SelectItem value="NT">NT</SelectItem>
                      <SelectItem value="ACT">ACT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="propertyName">Property Name (Optional)</Label>
                <Input
                  id="propertyName"
                  value={formData.propertyName}
                  onChange={(e) => updateFormData("propertyName", e.target.value)}
                  placeholder="e.g., Riverside Farm, Smith Station"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Finding your community:</strong> We'll connect you with rural locals within 50km who share
                  your challenges and can help when needed.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Tell Us About Your Operation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle">Cattle Property</SelectItem>
                    <SelectItem value="sheep">Sheep Property</SelectItem>
                    <SelectItem value="mixed-livestock">Mixed Livestock</SelectItem>
                    <SelectItem value="cropping">Cropping</SelectItem>
                    <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                    <SelectItem value="horse">Horse Property</SelectItem>
                    <SelectItem value="hobby-farm">Hobby Farm</SelectItem>
                    <SelectItem value="other">Other Rural Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="propertySize">Property Size</Label>
                <Select value={formData.propertySize} onValueChange={(value) => updateFormData("propertySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10">Under 10 hectares</SelectItem>
                    <SelectItem value="10-50">10-50 hectares</SelectItem>
                    <SelectItem value="50-200">50-200 hectares</SelectItem>
                    <SelectItem value="200-500">200-500 hectares</SelectItem>
                    <SelectItem value="500-1000">500-1000 hectares</SelectItem>
                    <SelectItem value="over-1000">Over 1000 hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold">Livestock (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Cattle", "Sheep", "Horses", "Pigs", "Poultry", "Goats", "Alpacas", "Other"].map((animal) => (
                    <div key={animal} className="flex items-center space-x-2">
                      <Checkbox
                        id={animal.toLowerCase()}
                        checked={formData.livestock.includes(animal.toLowerCase())}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("livestock", [...formData.livestock, animal.toLowerCase()])
                          } else {
                            updateFormData(
                              "livestock",
                              formData.livestock.filter((item) => item !== animal.toLowerCase()),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={animal.toLowerCase()} className="text-sm">
                        {animal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Equipment You Have (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Tractor", "Header/Harvester", "Truck", "Trailer", "Slasher", "Seeder", "Spray Rig", "Other"].map(
                    (equipment) => (
                      <div key={equipment} className="flex items-center space-x-2">
                        <Checkbox
                          id={equipment.toLowerCase().replace("/", "-")}
                          checked={formData.equipment.includes(equipment.toLowerCase())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("equipment", [...formData.equipment, equipment.toLowerCase()])
                            } else {
                              updateFormData(
                                "equipment",
                                formData.equipment.filter((item) => item !== equipment.toLowerCase()),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={equipment.toLowerCase().replace("/", "-")} className="text-sm">
                          {equipment}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Community Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="helpOffer">What help can you offer to locals?</Label>
                <Textarea
                  id="helpOffer"
                  value={formData.helpOffer}
                  onChange={(e) => updateFormData("helpOffer", e.target.value)}
                  placeholder="e.g., Tractor work, transport, agistment, emergency shelter, local knowledge..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="helpNeed">What help might you need from locals?</Label>
                <Textarea
                  id="helpNeed"
                  value={formData.helpNeed}
                  onChange={(e) => updateFormData("helpNeed", e.target.value)}
                  placeholder="e.g., Equipment hire, emergency evacuation, temporary agistment, harvest help..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact (Name & Phone)</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                  placeholder="e.g., Mary Smith - 0412 345 678"
                />
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Building resilience together:</strong> Rural communities are strongest when we know who can
                  help and who might need help. This information helps coordinate support during emergencies and
                  everyday challenges.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Final Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Notification Preferences</Label>
                <div className="space-y-3">
                  {[
                    { key: "emergency", label: "Emergency Alerts", desc: "Urgent community emergencies and disasters" },
                    { key: "community", label: "Community Updates", desc: "New posts and community activity" },
                    { key: "equipment", label: "Equipment Sharing", desc: "Equipment available for hire/share" },
                    { key: "livestock", label: "Livestock Sales", desc: "Livestock for sale in your area" },
                  ].map((notification) => (
                    <div key={notification.key} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <Checkbox
                        id={notification.key}
                        checked={formData.notifications[notification.key as keyof typeof formData.notifications]}
                        onCheckedChange={(checked) => updateFormData(`notifications.${notification.key}`, checked)}
                      />
                      <div>
                        <Label htmlFor={notification.key} className="font-medium">
                          {notification.label}
                        </Label>
                        <p className="text-sm text-slate-600">{notification.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="privacy">Who can see your profile?</Label>
                <Select value={formData.privacy} onValueChange={(value) => updateFormData("privacy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local community only (50km radius)</SelectItem>
                    <SelectItem value="state">Entire state</SelectItem>
                    <SelectItem value="australia">All of Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">
                  <strong>You're almost ready!</strong> Once you complete setup, you'll be connected with your local
                  rural community and can start sharing, helping, and building relationships.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                Step {currentStep} of {totalSteps}
              </span>
              <Badge className="bg-teal-100 text-teal-700">Getting Started</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Welcome to Rural Community Hub</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-teal-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Welcome Message */}
        {currentStep === 1 && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Your Rural Community! 🚜</h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Let's get you connected with locals who understand rural life. This takes just 3 minutes and helps us find
              your perfect community match.
            </p>
          </div>
        )}

        {/* Current Step */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
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
            <Button
              onClick={completeOnboarding}
              className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2"
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.postcode}
            >
              <CheckCircle className="h-4 w-4" />
              Join Community
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2"
              disabled={
                (currentStep === 1 &&
                  (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) ||
                (currentStep === 2 && (!formData.postcode || !formData.suburb || !formData.state))
              }
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Need help?{" "}
            <Link href="/contact" className="text-teal-600 hover:text-teal-700">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
