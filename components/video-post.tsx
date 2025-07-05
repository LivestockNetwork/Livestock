"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Users } from "lucide-react"

interface VideoPostProps {
  post: {
    id: string
    videoUrl: string
    category: string
    caption: string
    author: string
    location: string
    timestamp: Date
    likes: number
    comments: number
    isBusinessPost?: boolean
  }
}

export default function VideoPost({ post }: VideoPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const getCategoryInfo = (category: string) => {
    const categories = {
      "new-arrival": { emoji: "🐴", label: "New Arrival", color: "green" },
      equipment: { emoji: "🚜", label: "Equipment Demo", color: "blue" },
      "farm-update": { emoji: "🌾", label: "Farm Update", color: "yellow" },
      "need-help": { emoji: "🚨", label: "Need Help", color: "red" },
    }
    return categories[category as keyof typeof categories] || { emoji: "📹", label: "Video", color: "gray" }
  }

  const categoryInfo = getCategoryInfo(post.category)
  const timeAgo = new Date().getTime() - post.timestamp.getTime()
  const hoursAgo = Math.floor(timeAgo / (1000 * 60 * 60))
  const timeDisplay = hoursAgo < 1 ? "Just now" : hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`

  return (
    <Card
      className={`border-0 shadow-xl rounded-2xl overflow-hidden ${
        post.isBusinessPost ? "ring-2 ring-amber-400" : ""
      } ${post.category === "need-help" ? "border-l-4 border-red-400" : ""}`}
    >
      <div className="relative">
        <video
          src={post.videoUrl}
          controls
          className="w-full h-48 object-cover"
          poster="/placeholder.svg?height=300&width=400&text=Video+Loading"
        />
        <div className="absolute top-3 left-3">
          {post.isBusinessPost && (
            <Badge
              className="text-white font-bold text-xs mb-2"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              🌟 Featured Business
            </Badge>
          )}
          {post.category === "need-help" && (
            <Badge className="bg-red-500 text-white font-bold text-xs">🚨 Need Help</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2 rounded-full"
            style={{
              background: post.isBusinessPost
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "linear-gradient(135deg, #7EC9BB, #6BB3A6)",
            }}
          >
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-800">{post.author}</div>
            <div className="text-sm text-slate-600">{post.location}</div>
          </div>
          <div className="ml-auto">
            <Badge
              variant="outline"
              className={`text-xs border-${categoryInfo.color}-200 text-${categoryInfo.color}-700`}
            >
              {categoryInfo.emoji} {categoryInfo.label}
            </Badge>
          </div>
        </div>

        <p className="text-slate-700 mb-4">{post.caption}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-slate-500"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <span className="text-xs text-slate-400">{timeDisplay}</span>
        </div>

        {post.isBusinessPost && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <Button
              size="sm"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              className="text-white"
            >
              Visit Business
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
