import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, MessageCircle, MapPin, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header with clickable logo */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/onboarding">
                <Button>Join Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting Rural
              <span className="text-teal-600 block">Communities</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're building stronger, more resilient rural communities through connection, preparedness, and mutual
              support. Because when we stand together, we thrive together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Rural communities face unique challenges - from natural disasters to isolation. We're here to bridge those
              gaps with technology that brings people together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emergency Preparedness</h3>
                <p className="text-gray-600">
                  Custom emergency plans, real-time alerts, and community coordination to keep everyone safe when it
                  matters most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Connection</h3>
                <p className="text-gray-600">
                  Share knowledge, ask for help, celebrate successes, and build lasting relationships with your
                  neighbors.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mutual Support</h3>
                <p className="text-gray-600">
                  From equipment sharing to skill exchange, we make it easy to help each other and strengthen community
                  bonds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">Everything you need to stay connected, prepared, and supported</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MapPin className="h-8 w-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2">Location-Based Communities</h3>
              <p className="text-gray-600 text-sm">
                Connect with neighbors in your specific area, from small towns to entire regions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-8 w-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold mb-2">Emergency Alerts</h3>
              <p className="text-gray-600 text-sm">
                Real-time notifications for bushfires, floods, and other critical situations
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Community Feed</h3>
              <p className="text-gray-600 text-sm">
                Share updates, ask questions, and stay informed about local happenings
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-red-600 mb-3" />
              <h3 className="font-semibold mb-2">Custom Emergency Plans</h3>
              <p className="text-gray-600 text-sm">
                Personalized preparedness plans based on your location and livestock
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Direct Messaging</h3>
              <p className="text-gray-600 text-sm">Private conversations with community members for sensitive topics</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Heart className="h-8 w-8 text-pink-600 mb-3" />
              <h3 className="font-semibold mb-2">Resource Sharing</h3>
              <p className="text-gray-600 text-sm">Coordinate equipment loans, skill sharing, and mutual aid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Growing Together</h2>
            <p className="text-teal-100 text-lg">Join thousands of rural Australians building stronger communities</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">2,500+</div>
              <div className="text-teal-100">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-teal-100">Communities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-teal-100">Emergency Plans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-teal-100">Community Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Your Community?</h2>
          <p className="text-lg text-gray-600 mb-8">
            It takes just a few minutes to get started. Connect with your neighbors, create your emergency plan, and
            become part of something bigger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Get Started Today
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Rural Community Hub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting rural communities across Australia for safety, support, and growth.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community Feed
                  </Link>
                </li>
                <li>
                  <Link href="/states/nsw" className="hover:text-white">
                    Find Your Area
                  </Link>
                </li>
                <li>
                  <Link href="/onboarding" className="hover:text-white">
                    Join Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Preparedness</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/preparedness/bushfire" className="hover:text-white">
                    Bushfire Plans
                  </Link>
                </li>
                <li>
                  <Link href="/preparedness/flood" className="hover:text-white">
                    Flood Plans
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white">
                    My Plans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <a href="mailto:help@ruralcommunityhub.com" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Rural Community Hub. Built for rural Australia with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
