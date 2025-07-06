import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Truck, Wheat, Phone, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function NSWPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">🇦🇺 New South Wales Rural Community Hub</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connecting rural communities across the Premier State
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5" />
                Join NSW Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Find Local Groups
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">2,847</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-gray-600">Local Groups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">89</div>
              <div className="text-gray-600">Emergency Plans</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">1,234</div>
              <div className="text-gray-600">Resources Shared</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Communities */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured NSW Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Hunter Valley
                  </CardTitle>
                  <Badge variant="secondary">Wine & Agriculture</Badge>
                </div>
                <CardDescription>Premier wine region with diverse agricultural communities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>342 members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wheat className="h-4 w-4 text-orange-600" />
                    <span>Wine, Cattle, Horses</span>
                  </div>
                  <Button className="w-full mt-4">Join Hunter Valley Community</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    New England
                  </CardTitle>
                  <Badge variant="secondary">Livestock & Wool</Badge>
                </div>
                <CardDescription>High country farming with strong community traditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>198 members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wheat className="h-4 w-4 text-orange-600" />
                    <span>Sheep, Cattle, Wool</span>
                  </div>
                  <Button className="w-full mt-4">Join New England Community</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Riverina
                  </CardTitle>
                  <Badge variant="secondary">Irrigation & Crops</Badge>
                </div>
                <CardDescription>Major food bowl with innovative irrigation farming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>456 members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wheat className="h-4 w-4 text-orange-600" />
                    <span>Rice, Citrus, Almonds</span>
                  </div>
                  <Button className="w-full mt-4">Join Riverina Community</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Emergency Preparedness */}
      <div className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-red-800">NSW Emergency Preparedness</h2>
            <p className="text-lg text-red-700 mb-8">
              NSW faces unique challenges from bushfires, floods, and droughts. Our community helps you prepare.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">🔥 Bushfire Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-4">
                    Comprehensive bushfire preparation plans tailored for NSW conditions
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                    Create Bushfire Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">🌊 Flood Prepared</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700 mb-4">Flood preparation for coastal and inland NSW communities</p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                    Create Flood Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">☀️ Drought Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-700 mb-4">
                    Resources and community support during drought conditions
                  </p>
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    Access Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Local Resources */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">NSW Rural Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                  Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    Emergency: <strong>000</strong>
                  </div>
                  <div>
                    NSW RFS: <strong>1800 679 737</strong>
                  </div>
                  <div>
                    SES: <strong>132 500</strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Transport & Logistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>Livestock Transport</div>
                  <div>Grain Handling</div>
                  <div>Equipment Sharing</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-purple-600" />
                  Government Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>NSW DPI</div>
                  <div>Rural Assistance</div>
                  <div>Drought Support</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ExternalLink className="h-5 w-5 text-orange-600" />
                  Local Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>Veterinary Services</div>
                  <div>Agricultural Supplies</div>
                  <div>Machinery Dealers</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the NSW Rural Community?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Connect with thousands of rural NSW residents, share knowledge, and build stronger communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browser-registration">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5" />
                Join NSW Community Now
              </Button>
            </Link>
            <Link href="/browser-email-setup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Setup Email First
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
