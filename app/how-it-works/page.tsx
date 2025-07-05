"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ArrowRight,
  MapPin,
  MessageCircle,
  Shield,
  Heart,
  AlertTriangle,
  Truck,
  Phone,
  Clock,
  Star,
  ArrowDown,
  Play,
} from "lucide-react"
import Link from "next/link"
import EmergencyTicker from "@/components/emergency-ticker"

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      number: 1,
      title: "Find Your Local Community",
      description: "Enter your postcode and connect with rural locals in your area",
      details: "We'll show you locals within 50km who share your challenges and can lend a hand when needed.",
      icon: MapPin,
      color: "blue",
    },
    {
      number: 2,
      title: "Share & Connect",
      description: "Post what you need, what you can offer, and what's happening on your property",
      details: "From equipment sharing to livestock sales, emergency help to farm updates - stay connected.",
      icon: MessageCircle,
      color: "green",
    },
    {
      number: 3,
      title: "Help Each Other",
      description: "Build the relationships that make rural communities strong and resilient",
      details: "When disaster strikes or you need a hand, you'll know exactly who to call.",
      icon: Heart,
      color: "red",
    },
  ]

  const scenarios = [
    {
      title: "The Flood Emergency",
      problem: "Sarah's cattle were stranded by rising floodwater at 2am",
      solution: "Posted urgent help request → 3 locals with boats responded within 20 minutes",
      outcome: "All 47 head of cattle safely evacuated. Community coordination saved the day.",
      icon: AlertTriangle,
      color: "blue",
      time: "20 minutes",
    },
    {
      title: "Harvest Crisis",
      problem: "Tom's header broke down during wheat harvest with rain forecast",
      solution: "Found replacement header 15km away through community network",
      outcome: "Harvest completed before rain. Saved entire crop worth $180,000.",
      icon: Truck,
      color: "amber",
      time: "2 hours",
    },
    {
      title: "Bushfire Evacuation",
      problem: "Fire approaching Manning Valley - livestock needed urgent relocation",
      solution: "Community coordinated 12 properties offering temporary agistment",
      outcome: "450+ animals safely relocated. Zero livestock losses in the fire.",
      icon: Shield,
      color: "orange",
      time: "4 hours",
    },
  ]

  const testimonials = [
    {
      quote: "During the floods, I had no idea who could help. This app changes everything - now I know my locals.",
      author: "Jenny K.",
      location: "Gloucester, NSW",
      situation: "Cattle farmer, 500 head",
    },
    {
      quote: "Found a replacement tractor in 30 minutes when mine broke during harvest. Saved my entire crop.",
      author: "David M.",
      location: "Krambach, NSW",
      situation: "Wheat & barley grower",
    },
    {
      quote: "The community rallied when we needed emergency agistment. Rural people helping rural people.",
      author: "Sarah & Tom R.",
      location: "Wingham, NSW",
      situation: "Mixed farming operation",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <EmergencyTicker />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/about">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  About
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  Community
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button size="sm" className="text-white font-semibold bg-teal-500 hover:bg-teal-600">
                  Join Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-green-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&auto=format"
            alt="Rural community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <Badge className="bg-white/20 text-white font-semibold px-4 py-2 text-sm mb-6">
            🚜 How Rural Community Hub Works
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            3 Simple Steps to Connect
            <span className="block mt-2">with Your Rural Locals</span>
          </h1>

          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            When you need help, you need it fast. When you can help others, you want to know about it.
            <br />
            <strong>Rural Community Hub connects you with locals who get it.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-50 font-bold px-8 py-4">
              <Play className="h-5 w-5 mr-2" />
              Watch 2-Minute Demo
            </Button>
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8 py-4 bg-transparent"
              >
                Start Connecting Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">The Problem Every Rural Family Knows</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-l-4 border-red-400 bg-red-50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Emergency Isolation</h3>
                <p className="text-slate-600 text-sm">
                  When disaster strikes, you don't know who nearby can help or needs help
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-amber-400 bg-amber-50">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Time-Critical Needs</h3>
                <p className="text-slate-600 text-sm">
                  Equipment breaks, livestock get sick, weather changes - you need help NOW
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-400 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Disconnected Communities</h3>
                <p className="text-slate-600 text-sm">
                  You know there are good people nearby, but no easy way to connect
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-slate-800 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">💔 "We had no way to know who needed help"</h3>
            <p className="text-lg opacity-90">
              - NSW farmer after 2025 floods. <strong>This doesn't have to be your story.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple as 1, 2, 3 - just like rural folk prefer</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={step.number}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  activeStep === step.number ? "ring-2 ring-teal-400 scale-105" : ""
                }`}
                onClick={() => setActiveStep(step.number)}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-600 mb-4">{step.description}</p>
                  <p className="text-sm text-slate-500">{step.details}</p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-slate-300" />
                    </div>
                  )}

                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowDown className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Real Scenarios */}
      <div className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Real Stories from Real Rural Families</h2>
            <p className="text-xl text-slate-600">See how locals are already helping locals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-full bg-${scenario.color}-100`}>
                      <scenario.icon className={`h-6 w-6 text-${scenario.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{scenario.title}</h3>
                      <Badge className={`bg-${scenario.color}-100 text-${scenario.color}-700 text-xs`}>
                        Resolved in {scenario.time}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 text-sm mb-1">THE PROBLEM:</h4>
                      <p className="text-slate-700 text-sm">{scenario.problem}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 text-sm mb-1">THE SOLUTION:</h4>
                      <p className="text-slate-700 text-sm">{scenario.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 text-sm mb-1">THE OUTCOME:</h4>
                      <p className="text-slate-700 text-sm font-medium">{scenario.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">What Rural Families Are Saying</h2>
            <p className="text-xl text-slate-600">Straight from the horse's mouth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-slate-700 mb-4 italic">"{testimonial.quote}"</blockquote>

                  <div className="border-t pt-4">
                    <div className="font-bold text-slate-800">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.location}</div>
                    <div className="text-xs text-slate-500 mt-1">{testimonial.situation}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="py-16 px-4 bg-gradient-to-r from-teal-500 to-green-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Stay Connected</h2>
            <p className="text-xl opacity-90">Built by rural folk, for rural folk</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "Community Feed", desc: "Share updates, ask for help" },
              { icon: Shield, title: "Emergency Plans", desc: "Bushfire & flood preparedness" },
              { icon: Users, title: "Member Directory", desc: "Find locals with skills/equipment" },
              { icon: Phone, title: "Direct Messaging", desc: "Connect privately with locals" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect with Your Rural Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 8,630+ rural families who are building stronger, more resilient communities together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/onboarding">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 font-bold px-8 py-4">
                <Users className="h-5 w-5 mr-2" />
                Join Your Community Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8 py-4 bg-transparent"
              >
                Preview Community Feed
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">✅ Free to Join</Badge>
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">🇦🇺 Australian Made</Badge>
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">🚜 Built by Rural Folk</Badge>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Rural Community Hub</span>
          </div>
          <p className="text-slate-400">
            © 2024 Rural Community Hub. Built with ❤️ for rural communities across Australia.
          </p>
        </div>
      </footer>
    </div>
  )
}
