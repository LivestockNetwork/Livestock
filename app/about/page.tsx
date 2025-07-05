import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  Heart,
  MapPin,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-600 hover:text-slate-800 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-teal-600 font-semibold">
                About
              </Link>
              <Link href="/login" className="text-slate-600 hover:text-slate-800 transition-colors">
                Login
              </Link>
              <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
                <Link href="/onboarding">Join Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-teal-100 text-teal-700 px-4 py-2 text-sm font-medium mb-6">
              Connecting Rural Communities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Stronger Together in
              <span className="text-teal-600"> Rural Australia</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Rural Community Hub connects farmers, graziers, and rural families across Australia. We believe that when
              rural communities support each other, everyone thrives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold">
              <Link href="/onboarding">
                Join Your Community Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
              <Link href="/preparedness/flood">Try Emergency Planner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Building resilient rural communities through connection, preparation, and mutual support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Emergency Preparedness</h3>
                <p className="text-slate-600 leading-relaxed">
                  Help rural families prepare for floods, bushfires, and other emergencies with personalized plans and
                  community support networks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Community Connection</h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect with locals in your area, share resources, and build the relationships that make rural
                  communities strong.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Mutual Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Share equipment, offer help during tough times, and create a network of support that spans across
                  rural Australia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What We Offer</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Practical tools and connections designed specifically for rural Australian communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Emergency Planning</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Personalized flood and bushfire preparedness plans for your property and livestock
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Local Networks</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Connect with locals in your area, organized by postcode and region
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Community Feed</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Share updates, ask for help, and stay connected with your community
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Resource Sharing</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Share equipment, offer agistment, and coordinate community resources
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Emergency Alerts</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Real-time emergency notifications and community coordination during crises
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Member Directory</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Find locals with specific skills, equipment, or services in your area
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">Growing Community</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">2,400+</div>
              <div className="text-slate-600 font-medium">Rural Families Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">850+</div>
              <div className="text-slate-600 font-medium">Emergency Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">150+</div>
              <div className="text-slate-600 font-medium">Communities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Connect?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of rural families who are building stronger, more resilient communities together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-slate-50 font-semibold">
              <Link href="/onboarding">
                Join Your Community Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
            >
              <Link href="/preparedness/flood">Try Emergency Planner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Rural Community Hub</span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Connecting rural communities across Australia for emergency preparedness, resource sharing, and mutual
                support.
              </p>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/about" className="block text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/onboarding" className="block text-slate-300 hover:text-white transition-colors">
                  Join Community
                </Link>
                <Link href="/community" className="block text-slate-300 hover:text-white transition-colors">
                  Community Feed
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@ruralcommunityhub.com.au</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">1800 RURAL HUB</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Serving Rural Australia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 Rural Community Hub. Built for rural Australia, by rural Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
