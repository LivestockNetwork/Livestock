import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Flame, Shield, Phone, MapPin, Clock, Users } from "lucide-react"

export default function BushfirePreparednessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Flame className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">🔥 Bushfire Preparedness</h1>
          <p className="text-xl mb-8">Protect your property, livestock, and family from bushfire threats</p>
          <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
            <Shield className="mr-2 h-5 w-5" />
            Create Your Bushfire Plan
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <Flame className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Fire Danger Rating Today: EXTREME</strong> - Fires will spread rapidly and be extremely difficult to
            control. Spot fires will start well ahead of the main fire. Homes are not designed to withstand fires in
            these conditions.
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
              <MapPin className="mx-auto h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold mb-2">Fire Locations</h3>
              <Button variant="outline" size="sm">
                View Map
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="mx-auto h-8 w-8 text-yellow-600 mb-3" />
              <h3 className="font-bold mb-2">Weather</h3>
              <Button variant="outline" size="sm">
                Check Conditions
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="mx-auto h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold mb-2">Community</h3>
              <Button variant="outline" size="sm">
                Local Updates
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
                Bushfire Preparation Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">🏠 Property Preparation</h4>
                  <ul className="text-sm space-y-1 text-red-700">
                    <li>• Clear gutters and roof of leaves and debris</li>
                    <li>• Remove flammable materials from around house</li>
                    <li>• Trim tree branches away from roof and power lines</li>
                    <li>• Install ember guards on windows and vents</li>
                    <li>• Maintain defensible space around buildings</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">🐄 Livestock Protection</h4>
                  <ul className="text-sm space-y-1 text-orange-700">
                    <li>• Identify safe paddocks with minimal fuel load</li>
                    <li>• Ensure adequate water supply in safe areas</li>
                    <li>• Plan evacuation routes for livestock</li>
                    <li>• Prepare emergency feed supplies</li>
                    <li>• Consider early relocation during high-risk periods</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">🎒 Emergency Kit</h4>
                  <ul className="text-sm space-y-1 text-yellow-700">
                    <li>• Battery-powered radio and torch</li>
                    <li>• First aid kit and medications</li>
                    <li>• Important documents in waterproof container</li>
                    <li>• Emergency water and non-perishable food</li>
                    <li>• Protective clothing and sturdy shoes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fire Action Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="mr-2 h-5 w-5" />
                Your Fire Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2">✅ LEAVE EARLY</h4>
                  <p className="text-sm text-green-700">
                    This is the safest option. Leave for a safer place when the fire danger rating is forecast to be
                    severe or above.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-2">🏠 PREPARE TO DEFEND</h4>
                  <p className="text-sm text-blue-700">
                    Only if you are physically and mentally prepared, have a well-prepared property, and can actively
                    defend it.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                  <h4 className="font-bold text-gray-800 mb-2">📍 LAST RESORT</h4>
                  <p className="text-sm text-gray-700">
                    If you cannot leave and cannot defend, identify your last resort options - a room or area that
                    offers the best protection.
                  </p>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">Create Detailed Fire Plan</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fire Weather Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with the latest fire weather conditions and warnings for your area.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Check Weather
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Fire Units</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with your local Rural Fire Service and community fire units.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Find Local Unit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insurance & Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Information about insurance, recovery assistance, and rebuilding after fires.
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
