"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  Search,
  Reply,
  Heart,
  AlertTriangle,
  CheckCheck,
  Check,
  Mic,
  MicOff,
  Camera,
  ImageIcon,
  MapPin,
  Clock,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  type: "text" | "image" | "file" | "location" | "emergency"
  status: "sending" | "sent" | "delivered" | "read"
  replyTo?: string
  reactions?: { emoji: string; users: string[] }[]
  isEdited?: boolean
  attachments?: {
    type: "image" | "file" | "location"
    url: string
    name?: string
    size?: number
  }[]
}

interface ChatUser {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: Date
  isTyping?: boolean
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "Sarah Mitchell",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Has anyone heard about the flood warnings for the Manning Valley area?",
    timestamp: new Date("2024-01-15T10:30:00"),
    type: "text",
    status: "read",
  },
  {
    id: "2",
    senderId: "user2",
    senderName: "John Smith",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Yes, I just got the alert. My property is in the affected zone. Anyone know safe routes to move livestock?",
    timestamp: new Date("2024-01-15T10:32:00"),
    type: "text",
    status: "read",
    reactions: [{ emoji: "👍", users: ["user1", "user3"] }],
  },
  {
    id: "3",
    senderId: "user3",
    senderName: "Emma Wilson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "EMERGENCY: Road closure on Highway 1 due to flooding. Alternative route via Blackwood Road.",
    timestamp: new Date("2024-01-15T10:35:00"),
    type: "emergency",
    status: "read",
  },
]

const mockUsers: ChatUser[] = [
  {
    id: "user1",
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: "user2",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    isTyping: true,
  },
  {
    id: "user3",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: new Date("2024-01-15T10:30:00"),
  },
]

export function EnhancedChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [users, setUsers] = useState<ChatUser[]>(mockUsers)
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sending",
      replyTo: replyingTo || undefined,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setReplyingTo(null)

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "sent" } : msg)))
    }, 1000)
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            if (existingReaction.users.includes("current-user")) {
              existingReaction.users = existingReaction.users.filter((u) => u !== "current-user")
            } else {
              existingReaction.users.push("current-user")
            }
          } else {
            reactions.push({ emoji, users: ["current-user"] })
          }

          return { ...msg, reactions: reactions.filter((r) => r.users.length > 0) }
        }
        return msg
      }),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const MessageBubble = ({ message }: { message: ChatMessage }) => {
    const isCurrentUser = message.senderId === "current-user"
    const isEmergency = message.type === "emergency"

    return (
      <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-[70%]`}>
          {!isCurrentUser && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
              <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
            </Avatar>
          )}

          <div className={`${isCurrentUser ? "mr-2" : "ml-2"}`}>
            {!isCurrentUser && <p className="text-xs text-muted-foreground mb-1">{message.senderName}</p>}

            <div
              className={`rounded-lg px-3 py-2 ${
                isEmergency
                  ? "bg-red-100 border-2 border-red-500 text-red-900"
                  : isCurrentUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
              }`}
            >
              {message.replyTo && (
                <div className="text-xs opacity-70 mb-1 p-2 bg-black/10 rounded">Replying to previous message</div>
              )}

              {isEmergency && (
                <div className="flex items-center space-x-1 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-bold">EMERGENCY ALERT</span>
                </div>
              )}

              <p className="text-sm">{message.content}</p>

              {message.reactions && message.reactions.length > 0 && (
                <div className="flex space-x-1 mt-2">
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      onClick={() => addReaction(message.id, reaction.emoji)}
                      className="text-xs bg-white/20 rounded-full px-2 py-1 hover:bg-white/30"
                    >
                      {reaction.emoji} {reaction.users.length}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`flex items-center space-x-1 mt-1 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              {isCurrentUser && getStatusIcon(message.status)}
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setReplyingTo(message.id)}
              >
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => addReaction(message.id, "👍")}
              >
                <Heart className="h-4 w-4 mr-2" />
                React
              </Button>
              {isCurrentUser && (
                <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                  Delete
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold">Emergency Response Group</h3>
              <Badge variant="secondary">{users.filter((u) => u.status === "online").length} online</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <MessageBubble message={message} />
              </div>
            ))}

            {/* Typing Indicators */}
            {users
              .filter((u) => u.isTyping)
              .map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Reply Preview */}
        {replyingTo && (
          <div className="px-4 py-2 bg-muted/50 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Reply className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Replying to {messages.find((m) => m.id === replyingTo)?.senderName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={isRecording ? "text-red-500" : ""}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
            </div>
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <input ref={fileInputRef} type="file" className="hidden" multiple accept="image/*,video/*,.pdf,.doc,.docx" />
      </div>

      {/* Sidebar */}
      <div className="w-64 border-l bg-muted/20">
        <div className="p-4">
          <h4 className="font-semibold mb-4">Members ({users.length})</h4>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.isTyping
                      ? "typing..."
                      : user.status === "online"
                        ? "online"
                        : user.lastSeen
                          ? `last seen ${user.lastSeen.toLocaleTimeString()}`
                          : "offline"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
