import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, MapPin, AlertTriangle, Phone, Mail, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🚨 Emergency Planning Made Simple
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Stay Prepared, Stay Connected</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join Australia's rural community network for emergency planning, livestock management, and community
            support. Be ready for bushfires, floods, and other emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Create Emergency Plan
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Rural Emergency Planning
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Emergency Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create customized emergency plans for bushfires, floods, storms, and droughts. Step-by-step guidance
                  for your specific property and livestock.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Community Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with neighboring farmers and rural residents. Share resources, coordinate during emergencies,
                  and support each other.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Location Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real-time weather alerts, fire danger ratings, and emergency notifications specific to your location
                  and region.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick access to emergency services, local authorities, veterinarians, and community support networks
                  when you need them most.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Livestock Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specialized plans for protecting cattle, sheep, horses, and other livestock during emergencies.
                  Evacuation routes and safe zones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  24/7 Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access your emergency plans offline on mobile devices. Critical information available even when
                  internet is down.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Trusted by Rural Communities Across Australia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-600">Emergency Plans</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Communities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Protect Your Property and Livestock?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of rural Australians who are already prepared for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Your Emergency Plan
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline">
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-lg font-bold">Rural Community Hub</span>
              </div>
              <p className="text-gray-400">
                Connecting rural communities for emergency preparedness and mutual support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-alerts" className="hover:text-white">
                    Emergency Alerts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/preparedness/bushfire" className="hover:text-white">
                    Bushfire Planning
                  </Link>
                </li>
                <li>
                  <Link href="/preparedness/flood" className="hover:text-white">
                    Flood Planning
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white">
                    Resource Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/weather" className="hover:text-white">
                    Weather Integration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@ruralcommunityhub.com.au
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  1800 RURAL (1800 787 252)
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rural Community Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
