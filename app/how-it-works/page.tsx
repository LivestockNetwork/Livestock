"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserPlus,
  MessageCircle,
  Shield,
  MapPin,
  Truck,
  Home,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
} from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Join Your Local Community",
      description: "Sign up and connect with rural families in your area. Find neighbors you never knew existed.",
      icon: UserPlus,
      features: ["Find local rural families", "Connect by postcode", "Verify your rural location"],
    },
    {
      number: "02",
      title: "Share & Connect",
      description:
        "Share resources, coordinate transport, find agistment, and build relationships before you need them.",
      icon: MessageCircle,
      features: ["Share equipment & resources", "Coordinate transport", "Find agistment", "Build relationships"],
    },
    {
      number: "03",
      title: "Prepare Together",
      description: "Create emergency plans, share critical information, and coordinate help when disaster strikes.",
      icon: Shield,
      features: ["Create emergency plans", "Share critical info", "Coordinate emergency help", "Support each other"],
    },
  ]

  const features = [
    {
      icon: MapPin,
      title: "Local Community Mapping",
      description: "Find and connect with rural families within your local area, organized by postcode and region.",
    },
    {
      icon: Truck,
      title: "Resource & Transport Sharing",
      description: "Share equipment, coordinate livestock transport, and pool resources with your community.",
    },
    {
      icon: Home,
      title: "Emergency Agistment Network",
      description: "Find emergency agistment for your livestock when floods, fires, or drought threaten your property.",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Coordination",
      description: "Coordinate emergency responses, share critical information, and organize community support.",
    },
    {
      icon: MessageCircle,
      title: "Community Communication",
      description: "Stay connected with your rural community through our secure messaging and community feed.",
    },
    {
      icon: Shield,
      title: "Emergency Planning Tools",
      description: "Create comprehensive emergency plans tailored to Australian rural conditions and risks.",
    },
  ]

  const testimonials = [
    {
      quote: "We had no way of knowing who needed help during the floods. This app changes everything.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      rating: 5,
    },
    {
      quote: "Found agistment for 200 head of cattle in 2 hours during the bushfire emergency. Incredible.",
      author: "Tom B.",
      location: "Gippsland, VIC",
      rating: 5,
    },
    {
      quote: "Our community is so much stronger now. We help each other before disasters strike.",
      author: "Emma C.",
      location: "Darling Downs, QLD",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900">
                Community
              </Link>
              <Link href="/onboarding">
                <Button className="bg-teal-500 hover:bg-teal-600">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-teal-100 text-teal-800 hover:bg-teal-100">
            <Play className="h-4 w-4 mr-2" />
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connecting Rural Communities
            <span className="text-teal-600 block">in 3 Simple Steps</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Rural Community Hub makes it easy to find your neighbors, share resources, and prepare for emergencies
            together. Here's how it works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="lg">
                Preview Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-teal-600" />
                    </div>
                    <div className="text-4xl font-bold text-teal-600">{step.number}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="border-2 border-teal-100 shadow-lg">
                    <CardContent className="p-8">
                      <img
                        src={`/placeholder.svg?height=300&width=400&text=Step+${step.number}`}
                        alt={step.title}
                        className="w-full rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Platform Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Australian rural communities and their unique challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Stories from Real Farmers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Rural Community Hub is making a difference in communities across Australia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{testimonial.author}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect with Your Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of rural Australians who are building stronger, more resilient communities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="opacity-90">Rural Families Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">850+</div>
              <div className="opacity-90">Communities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="opacity-90">Emergency Plans Created</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Join Your Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
              >
                Explore Community Feed
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
