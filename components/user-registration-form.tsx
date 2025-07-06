"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, User, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserRegistrationFormProps {
  onSuccess?: (userData: any) => void
}

export default function UserRegistrationForm({ onSuccess }: UserRegistrationFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    region: "",
    postcode: "",
    propertyType: "",
    emergencyContact: "",
    emergencyPhone: "",
    hasLivestock: false,
    livestockTypes: [] as string[],
    agreedToTerms: false,
    wantsUpdates: true,
  })

  const australianStates = [
    { value: "nsw", label: "New South Wales" },
    { value: "vic", label: "Victoria" },
    { value: "qld", label: "Queensland" },
    { value: "wa", label: "Western Australia" },
    { value: "sa", label: "South Australia" },
    { value: "tas", label: "Tasmania" },
    { value: "act", label: "Australian Capital Territory" },
    { value: "nt", label: "Northern Territory" },
  ]

  const propertyTypes = [
    "Cattle Station",
    "Sheep Farm",
    "Mixed Farming",
    "Crop Farm",
    "Dairy Farm",
    "Horse Stud",
    "Rural Residential",
    "Other",
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms of service to continue.",
        variant: "destructive",
      })
      return
    }

    const userData = {
      ...formData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
      isVerified: false,
    }

    // Store user data
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    existingUsers.push(userData)
    localStorage.setItem("users", JSON.stringify(existingUsers))

    toast({
      title: "Registration successful!",
      description: "Welcome to Rural Community Hub.",
    })

    if (onSuccess) {
      onSuccess(userData)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Create Your Account
        </CardTitle>
        <CardDescription>Join the Rural Community Hub and start building your emergency plans</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location & Property
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State/Territory *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
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
              <div>
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => handleInputChange("postcode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
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

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency Contact
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms and Preferences */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked)}
              />
              <Label htmlFor="agreedToTerms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy *
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="wantsUpdates"
                checked={formData.wantsUpdates}
                onCheckedChange={(checked) => handleInputChange("wantsUpdates", checked)}
              />
              <Label htmlFor="wantsUpdates" className="text-sm">
                I want to receive emergency alerts and community updates
              </Label>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your information is secure and will only be used for emergency planning and community coordination.
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
