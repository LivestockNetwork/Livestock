"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, User, MapPin, Home } from "lucide-react"
import { registerUser } from "@/app/actions/user-onboarding-simple"

const initialState = {
  success: false,
  message: "",
  user: null,
}

export default function SimpleOnboardingForm() {
  const [state, formAction] = useFormState(registerUser, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Join Rural Community Hub
          </CardTitle>
          <p className="text-center text-gray-600">Connect with your local rural community</p>
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
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input name="email" type="email" required placeholder="john@example.com" />
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
                  Joining Community...
                </>
              ) : (
                <>
                  <User className="mr-2 h-5 w-5" />
                  Join Community
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
                <h4 className="font-medium text-blue-900 mb-2">Welcome to the Community!</h4>
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
                  {state.user.primaryInterest && (
                    <p>
                      <strong>Interest:</strong> {state.user.primaryInterest}
                    </p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-blue-700">
                    🎉 You're now part of the Rural Community Hub! Check your email for a welcome message with next
                    steps.
                  </p>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-2">🌾 What's Next?</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Connect with local farmers and rural residents</li>
              <li>• Share knowledge and resources</li>
              <li>• Get help during emergencies</li>
              <li>• Buy and sell livestock, equipment, and produce</li>
              <li>• Stay updated on weather and local conditions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
