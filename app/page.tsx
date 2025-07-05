"use client"
import { useState } from "react"
import { Users, Shield, ArrowRight, Heart, Star, AlertTriangle, Flame, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VideoUploadModal from "@/components/video-upload-modal"
import EmergencyTicker from "@/components/emergency-ticker"

export default function RuralCommunityHub() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [videoPosts, setVideoPosts] = useState([
    {
      id: "1",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "new-arrival",
      caption: "Beautiful filly born this morning. Come visit us for tours and demonstrations with our gentle giants!",
      author: "Bulahdelah Clydesdales",
      location: "Manning Valley, NSW",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 47,
      comments: 12,
      isBusinessPost: true,
    },
    {
      id: "2",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "farm-update",
      caption: "Finally got some decent rain. The paddocks are greening up nicely and the cattle are happy.",
      author: "Sarah M.",
      location: "Hunter Valley, NSW",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      likes: 23,
      comments: 8,
      isBusinessPost: false,
    },
  ])

  const problems = [
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      problem: "When bushfire threatens, you don't know who has trucks to help evacuate livestock",
      solution: "Connect with locals who have transport before you need it",
    },
    {
      icon: <Users className="h-8 w-8" />,
      problem: "You need emergency agistment but don't know who has spare paddocks",
      solution: "Find safe paddocks and build relationships with nearby farmers",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      problem: "Floods cut you off and you have no way to coordinate help",
      solution: "Join your local rural emergency network before disaster strikes",
    },
  ]

  const testimonials = [
    {
      quote:
        "During the floods, I found 3 locals with boats who could help evacuate my horses. Saved my animals' lives.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      situation: "Flood Emergency",
    },
    {
      quote:
        "Bushfire was coming fast. Through the hub I found someone with a truck 10 minutes away. Got my cattle out in time.",
      author: "Tom R.",
      location: "Hunter Valley, NSW",
      situation: "Bushfire Emergency",
    },
    {
      quote:
        "My local community member broke his leg during calving season. The community rallied - 5 people helped with his cattle for 2 weeks.",
      author: "Lisa K.",
      location: "Riverina, NSW",
      situation: "Community Support",
    },
  ]

  const handleVideoPost = (videoData: any) => {
    setVideoPosts([videoData, ...videoPosts])
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Emergency Ticker */}
      <EmergencyTicker />

      {/* Hero Section - Completely Redesigned */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop&auto=format"
            alt="Rural community helping each other"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          {/* New Clear Brand Name */}
          <Badge
            className="text-white font-semibold px-6 py-3 text-base mb-8"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
          >
            🇦🇺 Rural Community Hub • Connecting Rural Australia
          </Badge>

          {/* Clear Problem Statement */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black leading-tight">
            When disaster strikes our home,
            <span className="block mt-2 text-black">who do we call?</span>
          </h1>

          {/* Clear Solution */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-black mb-4 leading-relaxed">
              <strong>Rural people don't wait for help - they ARE the help.</strong>
            </p>

            <p className="text-2xl md:text-3xl font-bold text-black mb-6">But first, we need to find each other.</p>

            <div className="p-6 bg-white/90 rounded-2xl shadow-xl border-l-4 border-amber-400 mb-8">
              <p className="text-lg text-black font-semibold">
                💔 "We had no way of knowing who needed help or who could have helped us during the floods."
              </p>
              <p className="text-black mt-2">- NSW farmer, January 2025</p>
            </div>

            <p className="text-xl text-black mb-8">
              Connect with members of your local community <strong>before</strong> you need them.
              <br />
              Share transport, find agistment, coordinate emergency help.
            </p>
          </div>

          {/* Single Clear Call to Action */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              onClick={() => (window.location.href = "/onboarding")}
            >
              <Users className="h-6 w-6 mr-3" />
              Find My Rural Community
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>

            <p className="text-black">
              <strong>8,630+ rural families</strong> already connected across Australia
            </p>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">These Problems Sound Familiar?</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Whether you live on a 1000-acre station or in town with your pet horses, dogs, and cats -
            <strong>every animal owner needs a plan and community support.</strong>
            You're not alone, but you might be isolated when disaster strikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl mx-auto mb-6 w-fit bg-red-50">
                  <div className="text-red-500">{item.icon}</div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-red-700 mb-4">The Problem:</h3>
                  <p className="text-black leading-relaxed">{item.problem}</p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-lg font-bold text-green-700 mb-3">The Solution:</h4>
                  <p className="text-black leading-relaxed">{item.solution}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-black mb-6">
            <strong>Don't wait for the next emergency.</strong> Build your rural network today.
          </p>
          <Button
            size="lg"
            className="text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
            onClick={() => (window.location.href = "/onboarding")}
          >
            Start Connecting Now
          </Button>
        </div>
      </div>

      {/* Emergency Preparedness Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Get Prepared. Get Connected.</h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Free emergency planning tools designed specifically for rural properties with livestock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card
              className="border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              onClick={() => (window.location.href = "/preparedness/bushfire")}
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl mx-auto mb-6 w-fit" style={{ backgroundColor: "#ef444420" }}>
                  <Flame className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">🔥 Bushfire Plan</h3>
                <p className="text-black mb-6 leading-relaxed">
                  Get a personalized bushfire evacuation plan for your livestock and property. Know exactly what to do
                  when fire danger rises.
                </p>
                <Badge className="bg-red-100 text-red-700 font-semibold">Most Popular</Badge>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              onClick={() => (window.location.href = "/preparedness/flood")}
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl mx-auto mb-6 w-fit" style={{ backgroundColor: "#3b82f620" }}>
                  <Droplets className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">🌊 Flood Plan</h3>
                <p className="text-black mb-6 leading-relaxed">
                  Protect your livestock from flooding. Evacuation routes, safe zones, and community coordination when
                  water rises.
                </p>
                <Badge className="bg-blue-100 text-blue-700 font-semibold">Available Now</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-black mb-6">
              <strong>Free tools used by 8,630+ rural families</strong> across Australia
            </p>
            <Button
              size="lg"
              className="text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
              onClick={() => (window.location.href = "/preparedness/bushfire")}
            >
              <Flame className="h-5 w-5 mr-2" />
              Start Emergency Planning
            </Button>
          </div>
        </div>
      </div>

      {/* Real Stories Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">Real Stories. Real Help.</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            These rural families found the help they needed through their community connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-3xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-black mb-6 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-black">{testimonial.author}</div>
                    <div className="text-sm text-black">{testimonial.location}</div>
                    <Badge className="bg-green-100 text-green-700 text-xs mt-1">{testimonial.situation}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&auto=format"
            alt="Rural community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Connect with Your Local Rural Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 8,630+ rural families building stronger, more resilient communities across Australia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-slate-100 font-bold px-10 py-5 text-xl rounded-2xl shadow-2xl"
              onClick={() => (window.location.href = "/onboarding")}
            >
              <Users className="h-6 w-6 mr-3" />
              Find My Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-5 text-xl rounded-2xl bg-transparent"
            >
              <Heart className="h-6 w-6 mr-3" />
              Learn More
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">✅ Free to Join</Badge>
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">🇦🇺 Australian Made</Badge>
            <Badge className="bg-white/20 text-white font-semibold px-4 py-2">🚜 Built by Rural Folk</Badge>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#7EC9BB" }}>
                Rural Community Hub
              </h3>
              <p className="text-slate-300">
                Connecting rural communities across Australia. Built by rural folk, for rural communities.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="/preparedness/bushfire" className="hover:text-white">
                    Bushfire Planning
                  </a>
                </li>
                <li>
                  <a href="/preparedness/flood" className="hover:text-white">
                    Flood Planning
                  </a>
                </li>
                <li>
                  <a href="/onboarding" className="hover:text-white">
                    Join Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Rural Community Hub. Built with ❤️ for rural communities across Australia.</p>
          </div>
        </div>
      </footer>

      {/* Video Upload Modal */}
      <VideoUploadModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onVideoPost={handleVideoPost}
      />
    </div>
  )
}
