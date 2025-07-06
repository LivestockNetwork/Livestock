import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Waves, Shield, Phone, MapPin, Cloud, Users } from "lucide-react"

export default function FloodPreparednessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Waves className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">🌊 Flood Preparedness</h1>
          <p className="text-xl mb-8">Protect your property, livestock, and family from flood risks</p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            <Shield className="mr-2 h-5 w-5" />
            Create Your Flood Plan
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Weather Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Cloud className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Severe Weather Warning:</strong> Heavy rainfall expected in the next 24-48 hours. Monitor local
            conditions and be prepared to implement your flood plan.
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="mx-auto h-8 w-8 text-red-600 mb-3" />
              <h3 className="font-bold mb-2">Emergency</h3>
              <p className="text-2xl font-bold text-red-600">000</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="mx-auto h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold mb-2">Flood Warnings</h3>
              <Button variant="outline" size="sm">
                View Warnings
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Cloud className="mx-auto h-8 w-8 text-gray-600 mb-3" />
              <h3 className="font-bold mb-2">Weather Radar</h3>
              <Button variant="outline" size="sm">
                Check Radar
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="mx-auto h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">SES Help</h3>
              <Button variant="outline" size="sm">
                132 500
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preparation Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Flood Preparation Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">🏠 Property Preparation</h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• Clear gutters and drains of debris</li>
                    <li>• Secure or move outdoor furniture and equipment</li>
                    <li>• Check and maintain pumps and generators</li>
                    <li>• Install sandbags or flood barriers if available</li>
                    <li>• Move valuable items to higher ground</li>
                  </ul>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-bold text-cyan-800 mb-2">🐄 Livestock Safety</h4>
                  <ul className="text-sm space-y-1 text-cyan-700">
                    <li>• Move animals to higher ground early</li>
                    <li>• Ensure adequate feed and water on high ground</li>
                    <li>• Check fencing and gates are secure</li>
                    <li>• Plan evacuation routes for livestock</li>
                    <li>• Consider agistment arrangements with neighbors</li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-bold text-teal-800 mb-2">🎒 Emergency Supplies</h4>
                  <ul className="text-sm space-y-1 text-teal-700">
                    <li>• Waterproof torch and battery radio</li>
                    <li>• First aid kit and essential medications</li>
                    <li>• Emergency food and drinking water (3 days minimum)</li>
                    <li>• Waterproof bags for important documents</li>
                    <li>• Warm, waterproof clothing and blankets</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flood Action Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Waves className="mr-2 h-5 w-5" />
                Your Flood Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2">🚨 MONITOR CONDITIONS</h4>
                  <p className="text-sm text-green-700">
                    Stay informed through weather warnings, local radio, and emergency services updates.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-bold text-yellow-800 mb-2">⚠️ PREPARE TO EVACUATE</h4>
                  <p className="text-sm text-yellow-700">
                    When flood warnings are issued, prepare to leave. Don't wait until the last minute.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-800 mb-2">🏃 EVACUATE SAFELY</h4>
                  <p className="text-sm text-red-700">
                    Never drive through floodwater. Turn around, don't drown. Follow evacuation routes.
                  </p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Detailed Flood Plan</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flood Safety Rules */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">🌊 Essential Flood Safety Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <h4 className="font-bold mb-2">Never Drive Through Floods</h4>
                <p className="text-sm text-gray-600">It only takes 15cm of water to float a car</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🚶</span>
                </div>
                <h4 className="font-bold mb-2">Don't Walk in Floodwater</h4>
                <p className="text-sm text-gray-600">15cm of flowing water can knock you over</p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-bold mb-2">Avoid Electrical Hazards</h4>
                <p className="text-sm text-gray-600">Stay away from fallen power lines and electrical equipment</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">📻</span>
                </div>
                <h4 className="font-bold mb-2">Stay Informed</h4>
                <p className="text-sm text-gray-600">Monitor emergency broadcasts and warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Flood Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bureau of Meteorology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Official weather warnings, rainfall data, and flood forecasts.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Visit BOM
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">State Emergency Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Emergency assistance, flood rescue, and community support.</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact SES
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insurance & Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Information about flood insurance and post-flood recovery assistance.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Recovery Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
