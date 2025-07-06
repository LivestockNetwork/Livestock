"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react"

interface VideoPostProps {
  id: string
  author: {
    name: string
    avatar: string
    location: string
  }
  content: string
  videoUrl: string
  thumbnail: string
  likes: number
  comments: number
  timestamp: string
}

export default function VideoPost({
  id,
  author,
  content,
  videoUrl,
  thumbnail,
  likes,
  comments,
  timestamp,
}: VideoPostProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{author.name}</h3>
            <p className="text-xs text-gray-500">
              {author.location} • {timestamp}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm mb-4">{content}</p>

        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
          <div className="aspect-video relative">
            {!isPlaying ? (
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center"
                style={{ backgroundImage: `url(${thumbnail})` }}
                onClick={togglePlay}
              >
                <div className="bg-black bg-opacity-50 rounded-full p-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                  <div className="mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                  </div>
                  <p className="text-sm">Video would play here</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-white border-white hover:bg-white hover:text-black bg-transparent"
                    onClick={togglePlay}
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
