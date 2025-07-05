"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, AlertTriangle, Truck, Users, Wheat, Calendar, Upload, MapPin, Tag } from "lucide-react"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePost: (post: any) => void
}

export default function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [postType, setPostType] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [location, setLocation] = useState("Manning Valley, NSW")
  const [isUrgent, setIsUrgent] = useState(false)
  const [tags, setTags] = useState("")
  const [images, setImages] = useState<string[]>([])

  const postTypes = [
    {
      id: "help-request",
      label: "Help Needed",
      icon: AlertTriangle,
      color: "red",
      description: "Ask for help from your community",
    },
    {
      id: "equipment-share",
      label: "Equipment Share",
      icon: Truck,
      color: "blue",
      description: "Share or hire out equipment",
    },
    {
      id: "livestock-sale",
      label: "Livestock Sale",
      icon: Users,
      color: "green",
      description: "Buy or sell livestock",
    },
    {
      id: "farm-update",
      label: "Farm Update",
      icon: Wheat,
      color: "amber",
      description: "Share what's happening on your farm",
    },
    {
      id: "community-event",
      label: "Community Event",
      icon: Calendar,
      color: "purple",
      description: "Announce local events",
    },
  ]

  const locations = [
    "Manning Valley, NSW",
    "Taree, NSW",
    "Wingham, NSW",
    "Gloucester, NSW",
    "Krambach, NSW",
    "Forster, NSW",
    "Tuncurry, NSW",
  ]

  const handleSubmit = () => {
    if (!postType || !title.trim() || !content.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const newPost = {
      type: postType,
      author: "You", // In real app, this would come from user session
      location: location,
      title: title.trim(),
      content: content.trim(),
      isUrgent: isUrgent,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      images: images,
    }

    onCreatePost(newPost)
    handleClose()
  }

  const handleClose = () => {
    setPostType("")
    setTitle("")
    setContent("")
    setLocation("Manning Valley, NSW")
    setIsUrgent(false)
    setTags("")
    setImages([])
    onClose()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real app, you'd upload these to a server
      // For demo, we'll just create placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(file.name)}`,
      )
      setImages([...images, ...newImages])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Create New Post</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Post Type Selection */}
          <div>
            <Label className="text-base font-semibold text-slate-800 mb-3 block">What type of post is this?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    postType === type.id
                      ? `border-${type.color}-400 bg-${type.color}-50`
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-${type.color}-100`}>
                      <type.icon className={`h-4 w-4 text-${type.color}-600`} />
                    </div>
                    <span className="font-semibold text-slate-800">{type.label}</span>
                  </div>
                  <p className="text-sm text-slate-600">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-base font-semibold text-slate-800">
              Post Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a clear, descriptive title"
              className="mt-2"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-base font-semibold text-slate-800">
              Details *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide details about your post. Be specific to help your community understand and respond appropriately."
              rows={4}
              className="mt-2"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="text-base font-semibold text-slate-800 mb-2 block">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-base font-semibold text-slate-800">
              Tags
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Tag className="h-4 w-4 text-slate-500" />
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="cattle, equipment, urgent (separate with commas)"
                className="flex-1"
              />
            </div>
            <p className="text-sm text-slate-500 mt-1">Add tags to help people find your post</p>
          </div>

          {/* Images */}
          <div>
            <Label className="text-base font-semibold text-slate-800 mb-2 block">Photos</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-2">Upload photos to help tell your story</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="border-slate-300 text-slate-700"
              >
                Choose Photos
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Urgent Checkbox */}
          {postType === "help-request" && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 rounded-xl border border-red-200">
              <Checkbox id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
              <Label htmlFor="urgent" className="text-red-700 font-medium">
                This is urgent - needs immediate attention
              </Label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!postType || !title.trim() || !content.trim()}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold flex-1"
            >
              Post to Community
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
