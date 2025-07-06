"use client"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerUserWithEmail } from "@/app/actions/browser-email-actions"

interface EmailCredentials {
  email: string
  password: string
}

export default function BrowserRegistrationForm() {
  const [credentials, setCredentials] = useState<EmailCredentials | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [primaryInterest, setPrimaryInterest] = useState("")

  const [state, action, isPending] = useFormState(registerUserWithEmail, null)

  useEffect(() => {
    // Load credentials from localStorage
    const stored = localStorage.getItem("gmail-credentials")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCredentials(parsed)
      } catch (error) {
        console.error("Failed to parse stored credentials:", error)
      }
    }
  }, [])

  if (!credentials) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">⚠️ Gmail Not Configured</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800">
                  <span className="font-medium">Gmail credentials not found.</span>
                  <br />
                  Please go to the setup page first to configure your Gmail credentials.
                </AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button
                  onClick={() => (window.location.href = "/browser-email-setup")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  🔧 Go to Gmail Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🇦🇺 Join Rural Community Hub Australia</CardTitle>
            <p className="text-center text-gray-600">Register and receive a personalized welcome email</p>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
              <p className="text-green-800 text-sm">
                <span className="font-medium">✅ Gmail Configured:</span> {credentials.email}
                <br />
                <span className="text-xs">Welcome emails will be sent from this address</span>
              </p>
            </div>

            <form action={action} className="space-y-4">
              <input type="hidden" name="email" value={credentials.email} />
              <input type="hidden" name="password" value={credentials.password} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input
                  name="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This is where you'll receive your welcome email</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Manning Valley, NSW"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select name="propertyType" value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle-farm">Cattle Farm</SelectItem>
                    <SelectItem value="sheep-farm">Sheep Farm</SelectItem>
                    <SelectItem value="horse-property">Horse Property</SelectItem>
                    <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                    <SelectItem value="crop-farming">Crop Farming</SelectItem>
                    <SelectItem value="hobby-farm">Hobby Farm</SelectItem>
                    <SelectItem value="rural-residential">Rural Residential</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Primary Interest</label>
                <Select name="primaryInterest" value={primaryInterest} onValueChange={setPrimaryInterest}>
                  <SelectTrigger>
                    <SelectValue placeholder="What brings you to our community?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency-preparedness">Emergency Preparedness</SelectItem>
                    <SelectItem value="community-connection">Community Connection</SelectItem>
                    <SelectItem value="knowledge-sharing">Knowledge Sharing</SelectItem>
                    <SelectItem value="buying-selling">Buying & Selling</SelectItem>
                    <SelectItem value="local-services">Local Services</SelectItem>
                    <SelectItem value="weather-updates">Weather Updates</SelectItem>
                    <SelectItem value="general-support">General Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isPending || !firstName || !userEmail}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isPending ? "🔄 Registering & Sending Welcome Email..." : "🇦🇺 Join Rural Community Hub"}
              </Button>
            </form>

            {state && (
              <Alert className={state.success ? "border-green-200 bg-green-50 mt-4" : "border-red-200 bg-red-50 mt-4"}>
                <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                  {state.success ? "✅" : "❌"} {state.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">📧 What happens next?</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• You'll receive a personalized welcome email immediately</li>
                <li>• The email includes your registration details</li>
                <li>• You'll get next steps for completing your profile</li>
                <li>• Welcome to the Rural Community Hub Australia family!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
