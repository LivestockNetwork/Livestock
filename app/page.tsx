import EmergencyTicker from "@/components/emergency-ticker"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <EmergencyTicker />

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌾</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-gray-900">
                Community
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900">
                How It Works
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link href="/onboarding">
                <Button className="bg-teal-600 hover:bg-teal-700">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/placeholder.svg?height=800&width=1200')`,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-32 text-center">
          <Badge className="bg-teal-600 text-white mb-8 px-4 py-2 text-sm">
            🌾 Rural Community Hub - Connecting Rural Australia
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            When disaster strikes our home,
            <br />
            who do we call?
          </h1>

          <p className="text-2xl text-white mb-4 font-semibold">
            Rural people don't wait for help - they ARE the help.
          </p>

          <p className="text-xl text-white mb-12">But first, we need to find each other.</p>

          {/* Testimonial */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 mb-12 max-w-3xl mx-auto">
            <p className="text-gray-800 text-lg mb-4">
              ❤️{" "}
              <strong>
                "We had no way of knowing who needed help or who could have helped us during the floods. But this app
                will make such a difference."
              </strong>
            </p>
            <p className="text-gray-600">- NSW farmer, January 2025</p>
          </div>

          <div className="mb-12">
            <p className="text-white text-lg mb-2">
              Connect with members of your local community <strong>before</strong> you need them.
            </p>
            <p className="text-white text-lg">Share transport, find agistment, coordinate emergency help.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/onboarding">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
                🌾 Find My Rural Community →
              </Button>
            </Link>
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white/20 px-8 py-4 text-lg"
              >
                💬 Preview Community Feed
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <p className="text-white text-lg">
            <strong>8,630+</strong> rural families already connected across Australia
          </p>
        </div>
      </div>

      {/* Get Prepared Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Get Prepared. Get Connected.</h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of rural families who are building stronger, more resilient communities together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Find neighbors, share resources, build relationships before you need them.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prepare</h3>
              <p className="text-gray-600">Create emergency plans, share knowledge, coordinate resources.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Respond</h3>
              <p className="text-gray-600">When disaster strikes, you'll know who to call and how to help.</p>
            </div>
          </div>

          <Link href="/onboarding">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
              Start Building Your Network Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
