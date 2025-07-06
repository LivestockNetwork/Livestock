import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, MapPin, AlertTriangle, Smartphone, Cloud } from "lucide-react"
import EmergencyTicker from "@/components/emergency-ticker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Emergency Ticker */}
      <EmergencyTicker />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Protect Your Livestock, Protect Your Future</h1>
          <p className="text-xl mb-8 opacity-90">
            Australia's most comprehensive emergency planning platform for rural communities. Connect with neighbors,
            share resources, and keep your animals safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything You Need for Emergency Preparedness
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Emergency Planning</CardTitle>
                <CardDescription>
                  Create customized emergency plans for bushfires, floods, and severe weather
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Step-by-step evacuation guides</li>
                  <li>• Livestock safety checklists</li>
                  <li>• Property risk assessments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Community Network</CardTitle>
                <CardDescription>Connect with local farmers and share resources during emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Find nearby agistment</li>
                  <li>• Share equipment and supplies</li>
                  <li>• Coordinate group evacuations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>
                  Get instant notifications about weather warnings and emergency updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Bureau of Meteorology integration</li>
                  <li>• Local emergency services updates</li>
                  <li>• Community-shared alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Interactive Maps</CardTitle>
                <CardDescription>Visualize risks, evacuation routes, and community resources</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Fire danger mapping</li>
                  <li>• Flood zone identification</li>
                  <li>• Safe zone locations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Mobile Ready</CardTitle>
                <CardDescription>Access your plans offline when internet and power are down</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Offline plan access</li>
                  <li>• GPS location tracking</li>
                  <li>• Emergency contact lists</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Cloud className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Weather Integration</CardTitle>
                <CardDescription>Advanced weather forecasting tailored for rural properties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 7-day detailed forecasts</li>
                  <li>• Severe weather warnings</li>
                  <li>• Historical weather data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Thousands of Australian Farmers</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait for the next emergency. Start planning today and protect what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/register">Create Your Emergency Plan</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-800 bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Rural Emergency Hub</h3>
              <p className="text-sm text-gray-400">
                Protecting Australian livestock and rural communities through better emergency preparedness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency Plans</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/preparedness/bushfire" className="text-gray-400 hover:text-white">
                    Bushfire
                  </Link>
                </li>
                <li>
                  <Link href="/preparedness/flood" className="text-gray-400 hover:text-white">
                    Flood
                  </Link>
                </li>
                <li>
                  <Link href="/weather" className="text-gray-400 hover:text-white">
                    Weather
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="text-gray-400 hover:text-white">
                    Emergency Contacts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Rural Emergency Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
