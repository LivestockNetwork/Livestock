"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Video, X } from "lucide-react"

interface VideoUploadModalProps {
  trigger: React.ReactNode
}

export default function VideoUploadModal({ trigger }: VideoUploadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title) return

    setIsUploading(true)

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setSelectedFile(null)
    setTitle("")
    setDescription("")
    setIsUploading(false)
    setIsOpen(false)

    // Show success message (in real app, would handle actual upload)
    alert("Video uploaded successfully!")
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Upload Video
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Video File</Label>
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-xs text-gray-500">({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter video title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Upload Button */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile || !title || isUploading}>
              {isUploading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
