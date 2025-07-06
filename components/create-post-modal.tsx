"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Share2, Home, Truck, Users, X } from "lucide-react"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    tags: [] as string[],
    urgent: false,
    contactMethod: "",
  })

  const postTypes = [
    { value: "emergency", label: "Emergency Alert", icon: AlertTriangle, color: "text-red-500" },
    { value: "resource-sharing", label: "Resource Sharing", icon: Share2, color: "text-blue-500" },
    { value: "agistment", label: "Agistment", icon: Home, color: "text-green-500" },
    { value: "equipment-sharing", label: "Equipment Sharing", icon: Truck, color: "text-orange-500" },
    { value: "community-support", label: "Community Support", icon: Users, color: "text-purple-500" },
  ]

  const commonTags = [
    "drought-relief",
    "flood-help",
    "bushfire-recovery",
    "livestock-transport",
    "hay",
    "agistment",
    "equipment",
    "community-event",
    "mutual-aid",
    "emergency",
  ]

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Post created:", formData)
    // Reset form
    setFormData({
      title: "",
      content: "",
      type: "",
      tags: [],
      urgent: false,
      contactMethod: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Community Post</DialogTitle>
          <DialogDescription>Share resources, ask for help, or connect with your rural community.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Post Type */}
          <div>
            <Label htmlFor="type">Post Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <IconComponent className={`h-4 w-4 mr-2 ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a clear, descriptive title"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Provide details about your post. Include location, timing, and contact information."
              rows={4}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags (select relevant tags)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {commonTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-teal-100"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  {formData.tags.includes(tag) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Method */}
          <div>
            <Label htmlFor="contactMethod">Preferred Contact Method</Label>
            <Select
              value={formData.contactMethod}
              onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="How should people contact you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="sms">SMS/Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="message">Platform Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Urgent Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={formData.urgent}
              onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked as boolean })}
            />
            <Label htmlFor="urgent" className="text-sm font-medium">
              Mark as urgent (for emergency situations)
            </Label>
          </div>

          {formData.urgent && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center text-red-800 text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="font-medium">
                  Urgent posts will be highlighted and may trigger notifications to nearby community members.
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-teal-500 hover:bg-teal-600">
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
