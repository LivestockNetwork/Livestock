import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, AlertTriangle, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Livestock Emergency Prep</span>
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
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Protect Your Livestock
            <span className="block text-emerald-600">Be Prepared for Emergencies</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Comprehensive emergency preparedness platform designed specifically for livestock owners. Create custom
            emergency plans, connect with your community, and stay informed about threats in your area.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Emergency Plan
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to protect your livestock
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-emerald-600" />
                  <CardTitle>Custom Emergency Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create tailored emergency plans for bushfires, floods, and other disasters specific to your property
                    and livestock.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-emerald-600" />
                  <CardTitle>Community Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Connect with other livestock owners in your area to share resources, information, and mutual aid
                    during emergencies.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-emerald-600" />
                  <CardTitle>Real-time Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive immediate notifications about emergency situations, weather warnings, and evacuation orders
                    in your area.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-emerald-600" />
                  <CardTitle>Location-based Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access location-specific emergency resources, evacuation routes, and temporary livestock
                    accommodation options.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to protect your livestock?</span>
            <span className="block text-emerald-600">Start your emergency plan today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/auth/signup">
                <Button size="lg">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
