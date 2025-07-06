"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, User, MapPin } from "lucide-react"

// Test registration action
async function testRegistration(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const propertyType = formData.get("propertyType") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!firstName || !email) {
    return {
      success: false,
      message: "Please fill in required fields (First Name and Email)",
    }
  }

  // Simulate successful registration
  return {
    success: true,
    message: `Registration successful! Welcome ${firstName} to Rural Community Hub.`,
    user: {
      firstName,
      lastName,
      email,
      location,
      propertyType,
      registeredAt: new Date().toISOString(),
    },
  }
}

const initialState = {
  success: false,
  message: "",
  user: null,
}

export default function TestRegistrationPage() {
  const [state, formAction] = useFormState(testRegistration, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <User className="h-6 w-6" />
              Test Registration System
            </CardTitle>
            <p className="text-center text-gray-600">Test the registration functionality</p>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input name="firstName" required placeholder="John" defaultValue="Test" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input name="lastName" placeholder="Smith" defaultValue="User" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="test@example.com"
                    defaultValue="test@example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Property
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input name="location" placeholder="Manning Valley, NSW" defaultValue="Test Location, NSW" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    defaultValue="cattle-farm"
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
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Testing Registration...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-5 w-5" />
                    Test Registration
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
                  <h4 className="font-medium text-blue-900 mb-2">✅ Registration Test Results</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>
                      <strong>Name:</strong> {state.user.firstName} {state.user.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {state.user.email}
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
                    <p>
                      <strong>Registered:</strong> {new Date(state.user.registeredAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">🧪 Test Information</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• This is a test registration form</li>
                <li>• No actual user accounts are created</li>
                <li>• Form validation and submission flow are tested</li>
                <li>• Success/error states are demonstrated</li>
              </ul>
            </div>

            <div className="mt-4 text-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <a href="/browser-registration">👤 Real Registration</a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/complete-test">🧪 Complete Test</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
