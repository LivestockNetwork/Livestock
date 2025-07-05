"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  ImageIcon,
  MapPin,
  Check,
  CheckCheck,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isRead: boolean
  type: "text" | "image" | "location" | "file"
  attachments?: string[]
}

interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  isOnline: boolean
}

interface Contact {
  id: string
  name: string
  location: string
  avatar?: string
  isOnline: boolean
  lastSeen: Date
}

export default function PrivateMessaging() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      location: "Taree, NSW",
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: "2",
      name: "Tom Roberts",
      location: "Wingham, NSW",
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "3",
      name: "David Chen",
      location: "Gloucester, NSW",
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: "4",
      name: "Lisa Thompson",
      location: "Krambach, NSW",
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]

  const conversations: Conversation[] = [
    {
      id: "1",
      participants: ["user", "1"],
      lastMessage: {
        id: "msg1",
        senderId: "1",
        content: "Thanks for helping with the cattle yesterday! Really appreciate it.",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        isRead: false,
        type: "text",
      },
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      participants: ["user", "2"],
      lastMessage: {
        id: "msg2",
        senderId: "user",
        content: "Let me know when you need the tractor back",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      participants: ["user", "3"],
      lastMessage: {
        id: "msg3",
        senderId: "3",
        content: "The horses are doing well in the new paddock",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      unreadCount: 0,
      isOnline: true,
    },
  ]

  const messages: { [conversationId: string]: Message[] } = {
    "1": [
      {
        id: "1",
        senderId: "1",
        content: "Hi! I saw your post about needing help with cattle transport. I have a truck available this weekend.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      {
        id: "2",
        senderId: "user",
        content: "That would be fantastic! I need to move about 20 head from the back paddock to the yards.",
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      {
        id: "3",
        senderId: "1",
        content: "No problem at all. What time works best for you?",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      {
        id: "4",
        senderId: "user",
        content: "How about 8am Saturday? I'll have them ready in the yards.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: true,
        type: "text",
      },
      {
        id: "5",
        senderId: "1",
        content: "Perfect! See you then. Here's my location for reference.",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        isRead: true,
        type: "location",
      },
      {
        id: "6",
        senderId: "1",
        content: "Thanks for helping with the cattle yesterday! Really appreciate it.",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        isRead: false,
        type: "text",
      },
    ],
  }

  const getContact = (id: string) => contacts.find((c) => c.id === id)
  const getConversation = (id: string) => conversations.find((c) => c.id === id)
  const getMessages = (conversationId: string) => messages[conversationId] || []

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
      type: "text",
    }

    // In a real app, this would send to the server
    console.log("Sending message:", message)
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const selectedContact = selectedConversation ? getContact(selectedConversation) : null
  const currentMessages = selectedConversation ? getMessages(selectedConversation) : []

  return (
    <div className="h-[600px] flex border border-slate-200 rounded-lg overflow-hidden bg-white">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => {
            const contact = getContact(conversation.participants.find((p) => p !== "user") || "")
            if (!contact) return null

            return (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedConversation === conversation.id ? "bg-teal-50 border-l-4 border-l-teal-500" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800 truncate">{contact.name}</h4>
                      <span className="text-xs text-slate-500">{formatTime(conversation.lastMessage.timestamp)}</span>
                    </div>

                    <p className="text-sm text-slate-600 truncate mb-1">
                      {conversation.lastMessage.senderId === "user" ? "You: " : ""}
                      {conversation.lastMessage.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{contact.location}</span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-teal-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedContact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">{selectedContact.name}</h3>
                    <p className="text-sm text-slate-600">
                      {selectedContact.isOnline ? "Online" : `Last seen ${formatTime(selectedContact.lastSeen)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {currentMessages.map((message) => {
                const isOwn = message.senderId === "user"
                return (
                  <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwn ? "bg-teal-500 text-white" : "bg-white text-slate-800 border border-slate-200"
                      }`}
                    >
                      {message.type === "location" ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Shared location</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}

                      <div
                        className={`flex items-center justify-between mt-1 text-xs ${
                          isOwn ? "text-teal-100" : "text-slate-500"
                        }`}
                      >
                        <span>{formatTime(message.timestamp)}</span>
                        {isOwn && (
                          <div className="ml-2">
                            {message.isRead ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>

                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Select a conversation</h3>
              <p className="text-slate-600">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
