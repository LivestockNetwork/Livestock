"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, Mail, Send } from "lucide-react"
import { sendTestEmailAction, sendWelcomeEmailAction } from "@/app/actions/browser-email-actions"

const initialTestState = {
  success: false,
  message: "",
}

const initialWelcomeState = {
  success: false,
  message: "",
}

export default function BrowserEmailTestPage() {
  const [testState, testAction] = useFormState(sendTestEmailAction, initialTestState)
  const [welcomeState, welcomeAction] = useFormState(sendWelcomeEmailAction, initialWelcomeState)
  const [isTestLoading, setIsTestLoading] = useState(false)
  const [isWelcomeLoading, setIsWelcomeLoading] = useState(false)

  const handleTestSubmit = async (formData: FormData) => {
    setIsTestLoading(true)
    await testAction(formData)
    setIsTestLoading(false)
  }

  const handleWelcomeSubmit = async (formData: FormData) => {
    setIsWelcomeLoading(true)
    await welcomeAction(formData)
    setIsWelcomeLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Testing Dashboard</h1>
          <p className="text-gray-600">Test email functionality with your configured Gmail credentials</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Test Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={handleTestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gmail Address</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    required
                    defaultValue="patrick@bulahdelahclydesdales.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gmail App Password</label>
                  <Input name="password" type="password" placeholder="16-character app password" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Send Test Email To</label>
                  <Input
                    name="testEmail"
                    type="email"
                    placeholder="recipient@example.com"
                    required
                    defaultValue="patrick@bulahdelahclydesdales.com"
                  />
                </div>

                <Button type="submit" disabled={isTestLoading} className="w-full">
                  {isTestLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Test Email...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Test Email
                    </>
                  )}
                </Button>

                {testState?.message && (
                  <Alert className={testState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {testState.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={testState.success ? "text-green-800" : "text-red-800"}>
                      {testState.message}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Welcome Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Welcome Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={handleWelcomeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gmail Address</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    required
                    defaultValue="patrick@bulahdelahclydesdales.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gmail App Password</label>
                  <Input name="password" type="password" placeholder="16-character app password" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input name="firstName" placeholder="John" required defaultValue="Test" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input name="lastName" placeholder="Smith" defaultValue="User" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Send Welcome Email To</label>
                  <Input
                    name="recipientEmail"
                    type="email"
                    placeholder="recipient@example.com"
                    required
                    defaultValue="patrick@bulahdelahclydesdales.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input name="location" placeholder="Manning Valley, NSW" defaultValue="Test Location, NSW" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                <div>
                  <label className="block text-sm font-medium mb-2">Primary Interest</label>
                  <select
                    name="primaryInterest"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="emergency-preparedness"
                  >
                    <option value="">Select interest</option>
                    <option value="emergency-preparedness">Emergency Preparedness</option>
                    <option value="community-connection">Community Connection</option>
                    <option value="knowledge-sharing">Knowledge Sharing</option>
                    <option value="buying-selling">Buying & Selling</option>
                    <option value="local-services">Local Services</option>
                    <option value="weather-updates">Weather Updates</option>
                    <option value="general-support">General Support</option>
                  </select>
                </div>

                <Button type="submit" disabled={isWelcomeLoading} className="w-full bg-green-600 hover:bg-green-700">
                  {isWelcomeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Welcome Email...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Welcome Email
                    </>
                  )}
                </Button>

                {welcomeState?.message && (
                  <Alert className={welcomeState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {welcomeState.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={welcomeState.success ? "text-green-800" : "text-red-800"}>
                      {welcomeState.message}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📋 Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Before Testing:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>1. Enable 2-factor authentication on Gmail</li>
                  <li>2. Generate an app password for "Mail"</li>
                  <li>3. Use the 16-character app password (no spaces)</li>
                  <li>4. Make sure "Less secure app access" is enabled if needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What to Expect:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Test email: Simple test message</li>
                  <li>• Welcome email: Formatted welcome with user details</li>
                  <li>• Check spam folder if emails don't arrive</li>
                  <li>• Success messages will appear below forms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Button asChild variant="outline">
            <a href="/browser-email-setup">⚙️ Email Setup</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/browser-registration">👤 Registration Form</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/complete-test">🧪 Complete Test</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
