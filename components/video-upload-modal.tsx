"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Upload, Video, X, Pause } from "lucide-react"

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onVideoPost: (videoData: any) => void
}

export default function VideoUploadModal({ isOpen, onClose, onVideoPost }: VideoUploadModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [caption, setCaption] = useState("")
  const [privacy, setPrivacy] = useState("local")
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chunksRef = useRef<Blob[]>([])

  const categories = [
    { id: "new-arrival", label: "🐴 New Arrival", color: "green" },
    { id: "equipment", label: "🚜 Equipment Demo", color: "blue" },
    { id: "farm-update", label: "🌾 Farm Update", color: "yellow" },
    { id: "need-help", label: "🚨 Need Help", color: "red" },
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const videoUrl = URL.createObjectURL(blob)
        setRecordedVideo(videoUrl)
        stopCamera()
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file)
      setUploadedVideo(videoUrl)

      // Simulate upload progress
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handlePost = () => {
    const videoUrl = recordedVideo || uploadedVideo
    if (!videoUrl || !selectedCategory || !caption.trim()) {
      alert("Please select a category, add a caption, and upload/record a video.")
      return
    }

    const videoData = {
      id: Date.now().toString(),
      videoUrl,
      category: selectedCategory,
      caption: caption.trim(),
      privacy,
      author: "You",
      location: "Manning Valley, NSW",
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isBusinessPost: false,
    }

    onVideoPost(videoData)
    handleClose()
  }

  const handleClose = () => {
    stopCamera()
    setRecordedVideo(null)
    setUploadedVideo(null)
    setSelectedCategory("")
    setCaption("")
    setPrivacy("local")
    setIsRecording(false)
    setIsUploading(false)
    setUploadProgress(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Share Your Rural Moment</h3>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-slate-500 hover:text-slate-700">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">What's happening?</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`border-2 font-semibold ${
                    selectedCategory === category.id
                      ? "bg-amber-500 text-white border-amber-500"
                      : `border-${category.color}-200 text-${category.color}-700 hover:bg-${category.color}-50 bg-transparent`
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Video Recording/Upload Area */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
              {/* Live Camera Feed */}
              {isRecording && (
                <div className="mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full max-w-md mx-auto rounded-lg"
                    style={{ maxHeight: "300px" }}
                  />
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-semibold">Recording...</span>
                  </div>
                </div>
              )}

              {/* Recorded Video Preview */}
              {recordedVideo && (
                <div className="mb-4">
                  <video
                    src={recordedVideo}
                    controls
                    className="w-full max-w-md mx-auto rounded-lg"
                    style={{ maxHeight: "300px" }}
                  />
                  <p className="text-green-600 font-semibold mt-2">✅ Video recorded successfully!</p>
                </div>
              )}

              {/* Uploaded Video Preview */}
              {uploadedVideo && (
                <div className="mb-4">
                  <video
                    src={uploadedVideo}
                    controls
                    className="w-full max-w-md mx-auto rounded-lg"
                    style={{ maxHeight: "300px" }}
                  />
                  <p className="text-green-600 font-semibold mt-2">✅ Video uploaded successfully!</p>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-amber-600 font-semibold mt-2">Uploading... {uploadProgress}%</p>
                </div>
              )}

              {/* Default State */}
              {!isRecording && !recordedVideo && !uploadedVideo && !isUploading && (
                <>
                  <div className="mb-4">
                    <div className="p-4 rounded-full bg-slate-100 w-fit mx-auto">
                      <Video className="h-8 w-8 text-slate-500" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-700 mb-2">Record or Upload Video</h4>
                  <p className="text-slate-500 mb-4">Share what's happening on your property</p>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!isRecording && !recordedVideo && (
                  <Button
                    onClick={startRecording}
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                )}

                {isRecording && (
                  <Button onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}

                {!isRecording && (
                  <>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </>
                )}

                {(recordedVideo || uploadedVideo) && (
                  <Button
                    onClick={() => {
                      setRecordedVideo(null)
                      setUploadedVideo(null)
                    }}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Video
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Tell your story</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
              rows={3}
              placeholder="What's happening? Share details, ask for advice, or just show off your rural life!"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600">Manning Valley, NSW</span>
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 ml-auto">
                Change
              </Button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-3">Who can see this?</label>
            <div className="space-y-2">
              {[
                { value: "local", label: "Local community only" },
                { value: "state", label: "Entire state" },
                { value: "australia", label: "All of Australia" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={privacy === option.value}
                    onChange={(e) => setPrivacy(e.target.value)}
                    className="text-amber-500"
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handlePost}
              size="lg"
              className="text-white font-bold px-8 py-3 text-lg rounded-xl shadow-xl flex-1"
              style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              disabled={!selectedCategory || !caption.trim() || (!recordedVideo && !uploadedVideo)}
            >
              Share with Community
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleClose}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-8 py-3 text-lg rounded-xl bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
