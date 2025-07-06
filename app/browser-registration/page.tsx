"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Mail, User, MapPin } from "lucide-react"

// Browser registration action
async function registerUserBrowser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const state = formData.get("state") as string
  const propertyType = formData.get("propertyType") as string
  const phone = formData.get("phone") as string
  const agreedToTerms = formData.get("agreedToTerms") === "on"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!name || !email || !location || !state || !propertyType) {
    return {
      success: false,
      message: "Please fill in all required fields",
      status: "error",
    }
  }

  if (!agreedToTerms) {
    return {
      success: false,
      message: "You must agree to the terms and conditions",
      status: "error",
    }
  }

  // Simulate successful registration
  const userData = {
    id: `user_${Date.now()}`,
    name,
    email,
    location,
    state,
    propertyType,
    phone,
    registeredAt: new Date().toISOString(),
  }

  return {
    success: true,
    message: `Welcome to Rural Community Hub, ${name}! Registration successful.`,
    status: "registered",
    user: userData,
  }
}

const initialState = {
  success: false,
  message: "",
  status: "not-registered",
  user: null,
}

const australianStates = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
]

const propertyTypes = [
  "Cattle Station",
  "Sheep Farm",
  "Mixed Farming",
  "Dairy Farm",
  "Crop Farm",
  "Horse Stud",
  "Poultry Farm",
  "Rural Residential",
  "Other",
]

export default function BrowserRegistrationPage() {
  const [state, formAction] = useFormState(registerUserBrowser, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    if (agreedToTerms) {
      formData.append("agreedToTerms", "on")
    }

    await formAction(formData)
    setIsLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return <Badge className="bg-green-100 text-green-800">Registered</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Not Registered</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Rural Community Hub</h1>
          <p className="text-gray-600">Register for emergency planning and community support</p>
          {getStatusBadge(state.status)}
        </div>

        {!state.success ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Create Your Account
              </CardTitle>
              <CardDescription>Fill in your details to join the rural community</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" type="text" placeholder="John Smith" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="0412 345 678" />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location & Property
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Town/City *</Label>
                      <Input id="location" name="location" type="text" placeholder="Tamworth" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Territory *</Label>
                      <Select name="state" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {australianStates.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select name="propertyType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="agreedToTerms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} required />
                    <Label htmlFor="agreedToTerms" className="text-sm leading-relaxed">
                      I agree to the Terms of Service and Privacy Policy. I understand that this platform provides
                      emergency planning tools and community features for rural properties.
                    </Label>
                  </div>
                </div>

                {state?.message && (
                  <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {state.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                      {state.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Success State */
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Registration Successful!
              </CardTitle>
              <CardDescription className="text-green-700">
                Welcome to the Rural Community Hub, {state.user?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-300 bg-green-100">
                <Mail className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  A welcome email has been sent to {state.user?.email}
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-green-700">Location</Label>
                  <p className="font-medium text-green-900">
                    {state.user?.location}, {state.user?.state}
                  </p>
                </div>
                <div>
                  <Label className="text-green-700">Property Type</Label>
                  <p className="font-medium text-green-900">{state.user?.propertyType}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">Access Dashboard</Button>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
                  Create Emergency Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Emergency Planning</h3>
            <p className="text-sm text-gray-600">Create comprehensive emergency plans</p>
          </div>
          <div className="text-center p-4">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Community Support</h3>
            <p className="text-sm text-gray-600">Connect with local rural neighbors</p>
          </div>
          <div className="text-center p-4">
            <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Real-time Alerts</h3>
            <p className="text-sm text-gray-600">Receive emergency notifications</p>
          </div>
        </div>
      </div>
    </div>
  )
}
