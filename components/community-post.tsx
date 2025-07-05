"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  AlertTriangle,
  Truck,
  Users,
  Wheat,
  Calendar,
  TrendingUp,
  Phone,
  Mail,
} from "lucide-react"

interface CommunityPostProps {
  post: {
    id: string
    type: string
    author: string
    location: string
    timestamp: Date
    title: string
    content: string
    images?: string[]
    likes: number
    comments: number
    shares: number
    isUrgent?: boolean
    isBusinessPost?: boolean
    tags: string[]
  }
}

export default function CommunityPost({ post }: CommunityPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const getPostTypeInfo = (type: string) => {
    const types = {
      "help-request": {
        icon: AlertTriangle,
        label: "Help Needed",
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
      "equipment-share": {
        icon: Truck,
        label: "Equipment",
        color: "blue",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      "livestock-sale": {
        icon: Users,
        label: "Livestock",
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      "farm-update": {
        icon: Wheat,
        label: "Farm Update",
        color: "amber",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      },
      "community-event": {
        icon: Calendar,
        label: "Community Event",
        color: "purple",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
      },
      "weather-alert": {
        icon: TrendingUp,
        label: "Weather Alert",
        color: "orange",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      },
    }
    return (
      types[type as keyof typeof types] || {
        icon: Users,
        label: "Post",
        color: "gray",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      }
    )
  }

  const typeInfo = getPostTypeInfo(post.type)
  const timeAgo = new Date().getTime() - post.timestamp.getTime()
  const hoursAgo = Math.floor(timeAgo / (1000 * 60 * 60))
  const timeDisplay = hoursAgo < 1 ? "Just now" : hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
        post.isUrgent ? "ring-2 ring-red-400 animate-pulse" : ""
      } ${post.isBusinessPost ? "ring-1 ring-amber-300" : ""}`}
    >
      {/* Post Header */}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800">{post.author}</h3>
                {post.isBusinessPost && <Badge className="bg-amber-100 text-amber-700 text-xs">Business</Badge>}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {post.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeDisplay}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.isUrgent && <Badge className="bg-red-500 text-white text-xs animate-pulse">🚨 URGENT</Badge>}
            <Badge variant="outline" className={`text-xs ${typeInfo.borderColor} text-${typeInfo.color}-700`}>
              <typeInfo.icon className="h-3 w-3 mr-1" />
              {typeInfo.label}
            </Badge>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h2>
          <p className="text-slate-700 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${isLiked ? "text-red-500" : "text-slate-500"} hover:text-red-500`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="font-medium">{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{post.comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-500 hover:text-green-500">
              <Share2 className="h-4 w-4" />
              <span className="font-medium">{post.shares}</span>
            </Button>
          </div>

          {/* Contact Actions for Help/Business Posts */}
          {(post.type === "help-request" || post.isBusinessPost) && (
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                <Phone className="h-3 w-3 mr-1" />
                Contact
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
                <Mail className="h-3 w-3 mr-1" />
                Message
              </Button>
            </div>
          )}
        </div>

        {/* Comments Section (collapsed by default) */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-slate-800">John D.</div>
                    <div className="text-sm text-slate-700">
                      I can help with this! I have a boat and live nearby. Will send you a message.
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-100 text-green-700 text-xs">MK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-slate-800">Mary K.</div>
                    <div className="text-sm text-slate-700">
                      We went through the same thing last year. Happy to share our experience if it helps.
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">1 hour ago</div>
                </div>
              </div>
            </div>

            {/* Add Comment */}
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                Post
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
