"use client"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, User, MapPin, Mail, Home } from "lucide-react"
import { registerUserWithEmail } from "@/app/actions/browser-email-actions"

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
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!name || !email || !location || !state || !propertyType) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  if (!agreedToTerms) {
    return {
      success: false,
      message: "You must agree to the terms and conditions",
    }
  }

  // Simulate successful registration
  return {
    success: true,
    message: `Welcome to Rural Community Hub, ${name}! Registration successful.`,
    user: {
      name,
      email,
      location: `${location}, ${state}`,
      propertyType,
      phone,
    },
  }
}

const initialState = {
  success: false,
  message: "",
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
  "Cattle Farm",
  "Sheep Farm",
  "Mixed Farming",
  "Dairy Farm",
  "Crop Farm",
  "Horse Stud",
  "Poultry Farm",
  "Rural Residential",
  "Other",
]

export default function BrowserRegistrationForm() {
  const [state, formAction] = useFormState(registerUserWithEmail, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gmail-credentials")
      if (stored) {
        try {
          setStoredCredentials(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse stored credentials:", error)
        }
      }
    }
  }, [])

  const handleSubmit = async (formData: FormData) => {
    // Add stored Gmail credentials to form data
    if (storedCredentials) {
      formData.append("email", storedCredentials.email)
      formData.append("password", storedCredentials.password)
    }

    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)
  }

  if (!storedCredentials) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">⚠️ Gmail Not Configured</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <span className="font-medium">Gmail credentials not found.</span>
                <br />
                Please configure your Gmail credentials first to enable email functionality.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/browser-email-setup">🔧 Configure Gmail</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Join Rural Community Hub
          </CardTitle>
          <p className="text-center text-gray-600">Registration with email confirmation</p>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <Mail className="h-4 w-4" />
              Gmail configured: {storedCredentials.email}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input name="firstName" required placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input name="lastName" placeholder="Smith" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email Address *</label>
                <Input
                  name="userEmail"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  defaultValue="patrick@bulahdelahclydesdales.com"
                />
                <p className="text-xs text-gray-500 mt-1">This is where you'll receive the welcome email</p>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </h3>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input name="location" placeholder="e.g., Manning Valley, NSW" />
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </h3>
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select property type</option>
                  <option value="cattle-farm">Cattle Farm</option>
                  <option value="sheep-farm">Sheep Farm</option>
                  <option value="horse-property">Horse Property</option>
                  <option value="mixed-farming">Mixed Farming</option>
                  <option value="crop-farming">Crop Farming</option>
                  <option value="hobby-farm">Hobby Farm</option>
                  <option value="rural-residential">Rural Residential</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Primary Interest</label>
                <select
                  name="primaryInterest"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">What brings you to our community?</option>
                  <option value="emergency-preparedness">Emergency Preparedness</option>
                  <option value="community-connection">Community Connection</option>
                  <option value="knowledge-sharing">Knowledge Sharing</option>
                  <option value="buying-selling">Buying & Selling</option>
                  <option value="local-services">Local Services</option>
                  <option value="weather-updates">Weather Updates</option>
                  <option value="general-support">General Support</option>
                </select>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Registering & Sending Email...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Register & Send Welcome Email
                </>
              )}
            </Button>

            {state && (
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

            {state?.success && state.user && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🎉 Registration Successful!</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    <strong>Name:</strong> {state.user.firstName} {state.user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {state.user.userEmail}
                  </p>
                  {state.user.location && (
                    <p>
                      <strong>Location:</strong> {state.user.location}
                    </p>
                  )}
                  {state.user.propertyType && (
                    <p>
                      <strong>Property:</strong> {state.user.propertyType}
                    </p>
                  )}
                  {state.user.primaryInterest && (
                    <p>
                      <strong>Interest:</strong> {state.user.primaryInterest}
                    </p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-blue-700">
                    📧 A welcome email has been sent to {state.user.userEmail}. Check your inbox for next steps!
                  </p>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">✨ What Makes This Special?</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Instant email confirmation sent to your inbox</li>
              <li>• Personalized welcome message with your details</li>
              <li>• Direct connection to your local rural community</li>
              <li>• Access to emergency preparedness resources</li>
              <li>• Platform for buying, selling, and sharing</li>
            </ul>
          </div>

          <div className="mt-4 text-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <a href="/browser-email-test">🧪 Test Email System</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/browser-email-setup">⚙️ Email Settings</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
