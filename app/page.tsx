"use client"
import { Users, Handshake, Shield, TrendingUp, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RuralLivingAustralia() {
  const states = [
    {
      name: "New South Wales",
      code: "NSW",
      regions: 12,
      members: "2,400+",
      featured: "Manning Valley, Hunter Valley, Riverina",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&auto=format",
    },
    {
      name: "Queensland",
      code: "QLD",
      regions: 8,
      members: "1,800+",
      featured: "Darling Downs, Wide Bay, Central Queensland",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=240&fit=crop&auto=format",
    },
    {
      name: "Victoria",
      code: "VIC",
      regions: 10,
      members: "2,100+",
      featured: "Goulburn Valley, Western District, Gippsland",
      image: "https://images.unsplash.com/photo-1552832230-8b3c6dcb96c4?w=400&h=240&fit=crop&auto=format",
    },
    {
      name: "South Australia",
      code: "SA",
      regions: 6,
      members: "900+",
      featured: "Barossa Valley, Adelaide Hills, Riverland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&auto=format",
    },
    {
      name: "Western Australia",
      code: "WA",
      regions: 7,
      members: "1,200+",
      featured: "Wheatbelt, Great Southern, Pilbara",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=240&fit=crop&auto=format",
    },
    {
      name: "Tasmania",
      code: "TAS",
      regions: 4,
      members: "600+",
      featured: "North West, Central, East Coast",
      image: "https://images.unsplash.com/photo-1552832230-8b3c6dcb96c4?w=400&h=240&fit=crop&auto=format",
    },
  ]

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Connection",
      description: "Connect with neighbors, share transport, find local help",
      color: "#7EC9BB",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Rural Marketplace",
      description: "Buy and sell livestock, equipment, feed, and services",
      color: "#f59e0b",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety Preparedness",
      description: "Bushfire and flood planning, emergency coordination",
      color: "#ef4444",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Local Knowledge",
      description: "Weather updates, market prices, farming insights",
      color: "#3b82f6",
    },
  ]

  const testimonials = [
    {
      quote: "Finally, a platform that understands rural life. Found transport to sales and made new connections.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      role: "Cattle Producer",
    },
    {
      quote: "Sold my tractor in 2 days. Much better than Facebook groups - real people, no trolls.",
      author: "Tom R.",
      location: "Darling Downs, QLD",
      role: "Mixed Farming",
    },
    {
      quote: "The community support during the floods was incredible. Neighbors helping neighbors.",
      author: "Lisa K.",
      location: "Goulburn Valley, VIC",
      role: "Dairy Farmer",
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop&auto=format"
            alt="Australian rural landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-12">
            <Badge
              className="text-white font-semibold px-4 py-2 text-sm mb-6"
              style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
            >
              🇦🇺 Proudly Australian • Built for Rural Communities
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
              Rural Living
              <span className="block" style={{ color: "#7EC9BB" }}>
                Australia
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              <strong>Rural people don't wait for help, they ARE the help.</strong>
              <br />
              Connect with your community. Share resources. Build resilience together.
            </p>
          </div>

          {/* Interactive Australia Map */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card
              className="border-0 shadow-2xl rounded-3xl overflow-hidden p-8"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <svg viewBox="0 0 1000 600" className="w-full h-auto cursor-pointer" style={{ maxHeight: "500px" }}>
                {/* Background */}
                <rect width="1000" height="600" fill="#f8fafc" />

                {/* Western Australia - Left side of continent */}
                <path
                  d="M50 150 Q80 120 120 140 L180 130 Q220 140 250 160 L280 180 Q300 200 290 240 L285 280 Q280 320 270 360 L260 400 Q250 440 240 480 L220 520 Q200 540 180 530 L140 525 Q100 520 80 500 L60 480 Q40 450 45 420 L50 380 Q55 340 60 300 L65 260 Q70 220 75 180 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/wa")}
                />
                <text x="165" y="335" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  WA
                </text>
                <text x="165" y="355" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  1,200+ Members
                </text>

                {/* Northern Territory - Top center */}
                <path
                  d="M290 150 Q320 140 350 145 L380 150 Q400 155 410 175 L415 200 Q420 230 425 260 L430 290 Q435 320 430 350 L425 380 Q420 400 400 410 L380 415 Q350 420 320 415 L290 410 Q280 400 285 380 L290 350 Q295 320 300 290 L305 260 Q310 230 315 200 L320 175 Q325 155 290 150 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/nt")}
                />
                <text x="360" y="280" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  NT
                </text>
                <text x="360" y="300" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  400+ Members
                </text>

                {/* South Australia - Bottom center */}
                <path
                  d="M280 410 Q300 405 320 410 L350 415 Q380 420 400 425 L430 430 Q450 435 460 455 L465 480 Q470 500 460 520 L450 540 Q430 550 400 545 L370 540 Q340 535 310 530 L280 525 Q260 520 250 500 L245 480 Q240 460 250 440 L260 425 Q270 415 280 410 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/sa")}
                />
                <text x="355" y="480" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  SA
                </text>
                <text x="355" y="500" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  900+ Members
                </text>

                {/* Queensland - Top right, larger area */}
                <path
                  d="M430 120 Q460 110 490 115 L520 120 Q550 125 580 135 L610 145 Q640 155 660 175 L680 195 Q690 220 685 245 L680 270 Q675 295 670 320 L665 345 Q660 370 650 390 L640 410 Q630 425 610 430 L580 435 Q550 440 520 435 L490 430 Q460 425 440 415 L430 400 Q435 380 440 360 L445 340 Q450 320 455 300 L460 280 Q465 260 470 240 L475 220 Q480 200 485 180 L490 160 Q495 140 430 120 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/qld")}
                />
                <text x="560" y="275" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  QLD
                </text>
                <text x="560" y="295" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  1,800+ Members
                </text>

                {/* New South Wales - Right center, FEATURED */}
                <path
                  d="M610 430 Q640 425 670 430 L700 435 Q730 440 750 460 L770 480 Q780 500 775 520 L770 540 Q765 560 745 570 L720 575 Q695 580 670 575 L645 570 Q620 565 600 555 L585 540 Q580 520 585 500 L590 480 Q595 460 605 445 Z"
                  fill="#f59e0b"
                  stroke="#d97706"
                  strokeWidth="4"
                  className="hover:fill-[#d97706] transition-all duration-300 cursor-pointer animate-pulse"
                  onClick={() => (window.location.href = "/states/nsw")}
                />
                <text x="675" y="505" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  NSW
                </text>
                <text x="675" y="525" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  2,400+ Members ⭐
                </text>

                {/* Victoria - Bottom right */}
                <path
                  d="M580 555 Q610 550 640 555 L670 560 Q700 565 720 575 L740 585 Q750 600 730 610 L700 615 Q670 620 640 615 L610 610 Q580 605 560 595 L545 585 Q540 575 545 565 L555 555 Q570 550 580 555 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/vic")}
                />
                <text x="645" y="585" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  VIC
                </text>
                <text x="645" y="605" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  2,100+ Members
                </text>

                {/* Tasmania - Small island bottom right */}
                <path
                  d="M680 630 Q700 625 720 630 L740 635 Q750 645 745 655 L740 665 Q730 670 720 665 L700 660 Q680 655 670 645 L665 635 Q670 625 680 630 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/tas")}
                />
                <text x="707" y="650" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none">
                  TAS
                </text>
                <text x="707" y="665" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                  600+ Members
                </text>

                {/* Legend */}
                <g transform="translate(800, 100)">
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="140"
                    fill="rgba(255,255,255,0.95)"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                    rx="10"
                  />
                  <text x="90" y="20" textAnchor="middle" className="fill-slate-800 font-bold text-sm">
                    Click Your State
                  </text>

                  <circle cx="20" cy="40" r="8" fill="#f59e0b" />
                  <text x="35" y="45" className="fill-slate-700 text-xs">
                    Featured - NSW
                  </text>

                  <circle cx="20" cy="65" r="8" fill="#7EC9BB" />
                  <text x="35" y="70" className="fill-slate-700 text-xs">
                    Active Communities
                  </text>

                  <text x="90" y="95" textAnchor="middle" className="fill-slate-600 text-xs">
                    8,100+ Rural Members
                  </text>
                  <text x="90" y="110" textAnchor="middle" className="fill-slate-600 text-xs">
                    Across Australia
                  </text>
                  <text x="90" y="130" textAnchor="middle" className="fill-slate-600 text-xs font-semibold">
                    🇦🇺 True Blue Aussie
                  </text>
                </g>

                {/* Featured Badge for NSW */}
                <g transform="translate(620, 470)">
                  <rect x="0" y="0" width="110" height="20" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="10" />
                  <text x="55" y="14" textAnchor="middle" className="fill-white font-bold text-xs">
                    🌟 MOST ACTIVE
                  </text>
                </g>
              </svg>

              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">
                  <strong>NSW highlighted</strong> - Our most active community with Manning Valley leading the way
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  >
                    47 Active Regions
                  </Badge>
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    1,200+ Listings
                  </Badge>
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  >
                    24/7 Community
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                8,100+
              </div>
              <div className="text-slate-600 font-medium">Rural Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                47
              </div>
              <div className="text-slate-600 font-medium">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                1,200+
              </div>
              <div className="text-slate-600 font-medium">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                24/7
              </div>
              <div className="text-slate-600 font-medium">Community Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Built for Rural Life</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to connect, trade, and thrive in rural Australia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-2xl mx-auto mb-4 w-fit" style={{ backgroundColor: `${feature.color}20` }}>
                  <div style={{ color: feature.color }}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Real Stories from Real Farmers</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how Rural Living Australia is making a difference in communities across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-slate-700 mb-6 italic">"{testimonial.quote}"</blockquote>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&auto=format"
            alt="Rural community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Connect with Your Rural Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers, graziers, and rural families building stronger communities together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
            >
              <Heart className="h-5 w-5 mr-2" />
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#7EC9BB" }}>
                Rural Living Australia
              </h3>
              <p className="text-slate-300">
                Connecting rural communities across Australia. Built by farmers, for farmers.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Success Stories
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
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-slate-300 mb-4">Join our community and stay updated with rural news and events.</p>
              <Button
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                Join Newsletter
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Rural Living Australia. Built with ❤️ for rural communities.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
