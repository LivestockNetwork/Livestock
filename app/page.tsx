"use client"
import { useState } from "react"
import { Users, ArrowRight, Heart, Flame, Droplets, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VideoUploadModal from "@/components/video-upload-modal"
import EmergencyTicker from "@/components/emergency-ticker"
import Link from "next/link"

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

      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b relative z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
              </Link>
            </div>

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
              <Link href="/how-it-works">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  How It Works
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
                <Button
                  size="sm"
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop&auto=format"
            alt="Rural community helping each other"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20 text-center">
          {/* Brand Badge */}
          <Badge
            className="text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base mb-6 sm:mb-8"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
          >
            🇦🇺 Rural Community Hub • Connecting Rural Australia
          </Badge>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-black leading-tight px-2">
            When disaster strikes our home,
            <span className="block mt-2 text-black">who do we call?</span>
          </h1>

          {/* Content */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
            <p className="text-lg sm:text-xl text-black mb-4 leading-relaxed">
              <strong>Rural people don't wait for help - they ARE the help.</strong>
            </p>

            <p className="text-lg sm:text-xl font-bold text-black mb-6">But first, we need to find each other.</p>

            <div className="p-4 sm:p-6 bg-white/90 rounded-2xl shadow-xl border-l-4 border-amber-400 mb-6 sm:mb-8 text-left">
              <p className="text-base sm:text-lg text-black font-semibold">
                💔 "We had no way of knowing who needed help or who could have helped us during the floods.{" "}
                <strong>But this app will make such a difference.</strong>"
              </p>
              <p className="text-base sm:text-lg text-black mt-2">- NSW farmer, January 2025</p>
            </div>

            <p className="text-lg sm:text-xl text-black mb-6 sm:mb-8 leading-relaxed">
              Connect with members of your local community <strong>before</strong> you need them.
              <br className="hidden sm:block" />
              Share transport, find agistment, coordinate emergency help.
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 px-4">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Find My Rural Community
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3" />
              </Button>
            </Link>

            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-2xl bg-white w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Preview Community Feed
              </Button>
            </Link>

            <p className="text-black text-sm sm:text-base">
              <strong>8,630+ rural families</strong> already connected across Australia
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Preparedness Section */}
      <div className="bg-slate-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">Get Prepared. Get Connected.</h2>
            <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto px-4">
              Free emergency planning tools designed specifically for rural properties with livestock.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Link href="/preparedness/bushfire">
              <Card
                className="border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div
                    className="p-3 sm:p-4 rounded-2xl mx-auto mb-4 sm:mb-6 w-fit"
                    style={{ backgroundColor: "#ef444420" }}
                  >
                    <Flame className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">🔥 Bushfire Plan</h3>
                  <p className="text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Get a personalized bushfire evacuation plan for your livestock and property. Know exactly what to do
                    when fire danger rises.
                  </p>
                  <Badge className="bg-red-100 text-red-700 font-semibold text-xs sm:text-sm">Most Popular</Badge>
                </CardContent>
              </Card>
            </Link>

            <Link href="/preparedness/flood">
              <Card
                className="border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div
                    className="p-3 sm:p-4 rounded-2xl mx-auto mb-4 sm:mb-6 w-fit"
                    style={{ backgroundColor: "#3b82f620" }}
                  >
                    <Droplets className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">🌊 Flood Plan</h3>
                  <p className="text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Protect your livestock from flooding. Evacuation routes, safe zones, and community coordination when
                    water rises.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm">Available Now</Badge>
                </CardContent>
              </Card>
            </Link>
          </div>
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

        <div className="relative max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Connect with Your Local Rural Community?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
            Join 8,630+ rural families building stronger, more resilient communities across Australia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-white text-slate-800 hover:bg-slate-100 font-bold px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl shadow-2xl"
              >
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Join Your Community Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl bg-transparent"
              >
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
            <Badge className="bg-white/20 text-white font-semibold px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              ✅ Free to Join
            </Badge>
            <Badge className="bg-white/20 text-white font-semibold px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              🇦🇺 Australian Made
            </Badge>
            <Badge className="bg-white/20 text-white font-semibold px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              🚜 Built by Rural Folk
            </Badge>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: "#7EC9BB" }}>
                Rural Community Hub
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Connecting rural communities across Australia. Built by rural folk, for rural communities.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community Feed
                  </Link>
                </li>
                <li>
                  <Link href="/preparedness/bushfire" className="hover:text-white">
                    Bushfire Planning
                  </Link>
                </li>
                <li>
                  <Link href="/preparedness/flood" className="hover:text-white">
                    Flood Planning
                  </Link>
                </li>
                <li>
                  <Link href="/onboarding" className="hover:text-white">
                    Join Community
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
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

          <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-slate-400 text-sm sm:text-base">
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
