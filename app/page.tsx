import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, AlertTriangle, MapPin, Phone, Mail, Clock, Star, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">Livestock Emergency Prep</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="ghost">How It Works</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Livestock Emergency Planning</h1>
          <p className="text-xl text-gray-600 mb-12">Community-driven livestock emergency preparedness platform</p>

          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
            >
              Sign Up
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 inline-block"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Rural Emergency Preparedness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From bushfire alerts to flood warnings, we've got your property and livestock covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Emergency Planning</CardTitle>
                <CardDescription>
                  Create customized emergency plans for your property, livestock, and family with step-by-step guidance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Real-Time Alerts</CardTitle>
                <CardDescription>
                  Get instant notifications about bushfires, floods, severe weather, and other emergencies in your area.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Community Network</CardTitle>
                <CardDescription>
                  Connect with neighboring farmers and rural residents to share resources and support each other.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Interactive Maps</CardTitle>
                <CardDescription>
                  View real-time emergency information, evacuation routes, and community resources on detailed maps.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Rural Communities</h2>
            <p className="text-xl text-gray-600">Join thousands of farmers and rural residents across Australia</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">50,000+</div>
              <div className="text-gray-600">Livestock Protected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">1,200+</div>
              <div className="text-gray-600">Emergency Plans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">Alert Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The early warning system saved our cattle during the last bushfire. We had time to move them to
                  safety thanks to the community alerts."
                </p>
                <div className="font-semibold">Sarah Mitchell</div>
                <div className="text-sm text-gray-500">Cattle Station, NSW</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Being connected with other farmers in our area has been invaluable. We share resources and help each
                  other during tough times."
                </p>
                <div className="font-semibold">John Thompson</div>
                <div className="text-sm text-gray-500">Mixed Farm, QLD</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The emergency planning tools helped us prepare for flood season. Our horses were safe and we knew
                  exactly what to do."
                </p>
                <div className="font-semibold">Emma Rodriguez</div>
                <div className="text-sm text-gray-500">Horse Stud, VIC</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Property?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join our community today and get the tools, alerts, and support you need to keep your livestock and property
            safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold">Livestock Emergency Prep</span>
              </div>
              <p className="text-gray-400">
                Protecting rural communities and livestock across Australia through emergency preparedness and community
                connection.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/emergency-planning" className="hover:text-white">
                    Emergency Planning
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="hover:text-white">
                    Real-Time Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community Network
                  </Link>
                </li>
                <li>
                  <Link href="/maps" className="hover:text-white">
                    Interactive Maps
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
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
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1800 RURAL (1800 787 252)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@livestockemergency.com.au</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Emergency Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Livestock Emergency Preparedness System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
