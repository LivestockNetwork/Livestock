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

                {/* Western Australia - Proper shape, large western portion */}
                <path
                  d="M50 120 Q80 100 120 110 L160 105 Q200 110 240 125 L280 140 Q320 155 350 175 L380 195 Q400 220 395 250 L390 280 Q385 310 380 340 L375 370 Q370 400 365 430 L360 460 Q350 490 330 510 L300 525 Q270 535 240 530 L210 525 Q180 520 150 510 L120 495 Q90 475 70 445 L55 415 Q45 385 50 355 L55 325 Q60 295 65 265 L70 235 Q75 205 80 175 L85 145 Q90 130 50 120 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/wa")}
                />
                <text x="220" y="320" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  WA
                </text>
                <text x="220" y="340" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  1,200+ Members
                </text>

                {/* Northern Territory - Central top portion */}
                <path
                  d="M380 120 Q420 110 460 115 L500 120 Q530 125 550 140 L570 155 Q580 175 575 195 L570 215 Q565 235 560 255 L555 275 Q550 295 545 315 L540 335 Q535 355 530 375 L525 395 Q520 415 510 430 L495 440 Q475 445 455 440 L435 435 Q415 430 400 420 L385 405 Q375 385 380 365 L385 345 Q390 325 395 305 L400 285 Q405 265 410 245 L415 225 Q420 205 425 185 L430 165 Q435 145 440 125 L445 120 Q420 115 380 120 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/nt")}
                />
                <text x="460" y="280" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  NT
                </text>
                <text x="460" y="300" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  400+ Members
                </text>

                {/* South Australia - Central bottom portion */}
                <path
                  d="M360 430 Q400 425 440 430 L480 435 Q520 440 550 450 L580 460 Q600 475 595 495 L590 515 Q585 535 575 550 L560 565 Q540 575 520 570 L500 565 Q480 560 460 555 L440 550 Q420 545 400 540 L380 535 Q360 530 345 520 L335 505 Q330 485 335 465 L340 445 Q350 435 360 430 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/sa")}
                />
                <text x="465" y="500" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  SA
                </text>
                <text x="465" y="520" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  900+ Members
                </text>

                {/* Queensland - Large northeastern portion */}
                <path
                  d="M550 80 Q590 70 630 75 L670 80 Q710 85 750 95 L790 105 Q820 120 840 140 L855 165 Q865 190 860 215 L855 240 Q850 265 845 290 L840 315 Q835 340 830 365 L825 390 Q820 415 810 435 L795 450 Q775 460 755 455 L735 450 Q715 445 695 440 L675 435 Q655 430 635 425 L615 420 Q595 415 580 405 L570 390 Q565 370 570 350 L575 330 Q580 310 585 290 L590 270 Q595 250 600 230 L605 210 Q610 190 615 170 L620 150 Q625 130 630 110 L635 90 Q640 80 550 80 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/qld")}
                />
                <text x="710" y="270" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  QLD
                </text>
                <text x="710" y="290" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  1,800+ Members
                </text>

                {/* New South Wales - Eastern coastal portion, FEATURED */}
                <path
                  d="M750 420 Q790 415 830 420 L870 425 Q900 435 920 455 L935 475 Q945 500 940 525 L935 550 Q925 570 905 580 L880 585 Q855 590 830 585 L805 580 Q780 575 760 565 L745 550 Q735 530 740 510 L745 490 Q750 470 755 450 L760 435 Q765 425 750 420 Z"
                  fill="#f59e0b"
                  stroke="#d97706"
                  strokeWidth="4"
                  className="hover:fill-[#d97706] transition-all duration-300 cursor-pointer animate-pulse"
                  onClick={() => (window.location.href = "/states/nsw")}
                />
                <text x="840" y="505" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  NSW
                </text>
                <text x="840" y="525" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  2,400+ Members ⭐
                </text>

                {/* Victoria - Southeastern portion */}
                <path
                  d="M580 450 Q620 445 660 450 L700 455 Q740 460 770 470 L800 480 Q820 495 815 515 L810 535 Q800 550 780 555 L755 560 Q730 565 705 560 L680 555 Q655 550 630 545 L605 540 Q585 535 570 525 L560 510 Q555 490 560 470 L565 455 Q575 450 580 450 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/vic")}
                />
                <text x="690" y="510" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                  VIC
                </text>
                <text x="690" y="530" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                  2,100+ Members
                </text>

                {/* Tasmania - Small island southeast */}
                <path
                  d="M720 570 Q750 565 780 570 L810 575 Q825 585 820 600 L815 615 Q805 625 790 620 L770 615 Q750 610 730 605 L715 595 Q710 580 715 575 Q720 570 720 570 Z"
                  fill="#7EC9BB"
                  stroke="#6BB3A6"
                  strokeWidth="3"
                  className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = "/states/tas")}
                />
                <text x="765" y="595" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none">
                  TAS
                </text>
                <text x="765" y="610" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                  600+ Members
                </text>

                {/* Legend */}
                <g transform="translate(50, 50)">
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
                <g transform="translate(785, 470)">
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
