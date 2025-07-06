"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  Heart,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star,
  ArrowRight,
  Target,
  Eye,
  Award,
} from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      location: "Tamworth, NSW",
      bio: "Third-generation farmer who experienced firsthand the challenges of rural emergency coordination during the 2019 bushfires.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Tom Bradley",
      role: "Head of Technology",
      location: "Brisbane, QLD",
      bio: "Former emergency services coordinator with 15 years experience in rural disaster response and community systems.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Emma Chen",
      role: "Community Manager",
      location: "Adelaide, SA",
      bio: "Rural veterinarian and community organizer passionate about building resilient agricultural communities.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const achievements = [
    { number: "50,000+", label: "Rural Families Connected" },
    { number: "2,500+", label: "Emergency Plans Created" },
    { number: "850+", label: "Communities Served" },
    { number: "99.9%", label: "Platform Uptime" },
  ]

  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "Rural communities are strongest when they work together. We facilitate connections that save lives.",
    },
    {
      icon: Shield,
      title: "Preparedness",
      description:
        "Being prepared isn't just smart - it's essential. We provide tools to help you plan before disaster strikes.",
    },
    {
      icon: Heart,
      title: "Rural Understanding",
      description: "Built by rural people for rural people. We understand the unique challenges of agricultural life.",
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
              <Link href="/community" className="text-gray-600 hover:text-gray-900">
                Community
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                How It Works
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
            <Award className="h-4 w-4 mr-2" />
            Trusted by Rural Australia
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built by Rural People,
            <span className="text-teal-600 block">For Rural People</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Rural Community Hub was born from the 2019 Australian bushfire crisis, when rural communities discovered
            they had no way to coordinate help, share resources, or communicate during emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                Join Your Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="lg">
                See Community in Action
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-teal-600" />
                <Badge className="bg-teal-100 text-teal-800">Our Mission</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Connecting Rural Australia Before Disaster Strikes
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe rural communities are strongest when they're connected. Our platform helps you find your
                neighbors, share resources, and coordinate emergency responses before you need them most.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency Preparedness</h3>
                    <p className="text-gray-600">
                      Create comprehensive emergency plans tailored to Australian rural conditions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Connection</h3>
                    <p className="text-gray-600">Find and connect with rural families in your local area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Resource Sharing</h3>
                    <p className="text-gray-600">
                      Share transport, agistment, equipment, and expertise with your community
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Rural community meeting"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">4.9/5 Community Rating</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Based on 2,500+ member reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Eye className="h-6 w-6 text-teal-600" />
              <Badge className="bg-teal-100 text-teal-800">Our Values</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our values are rooted in the Australian rural spirit of mateship, resilience, and community support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 hover:border-teal-200 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the People Behind the Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're rural Australians who understand the challenges because we live them every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl mb-8 opacity-90">
            Have questions about Rural Community Hub? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-6 w-6" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="opacity-90">hello@ruralcommunityhub.com.au</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-6 w-6" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="opacity-90">1800 RURAL HUB</div>
              </div>
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
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
