"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, Eye, Clock, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ModerationItem {
  id: string
  type: "post" | "comment" | "user" | "report"
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    reputation: number
  }
  reportedBy?: {
    id: string
    name: string
  }
  reason: string
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "approved" | "rejected" | "escalated"
  timestamp: Date
  category: string
  aiScore?: number
  previousActions?: number
}

const mockModerationQueue: ModerationItem[] = [
  {
    id: "1",
    type: "post",
    content:
      "Looking for help with flood damage on my property. Insurance company is being difficult and I need advice on dealing with them.",
    author: {
      id: "user1",
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 85,
    },
    reportedBy: {
      id: "user2",
      name: "John Smith",
    },
    reason: "Potential spam or promotional content",
    severity: "low",
    status: "pending",
    timestamp: new Date("2024-01-15T10:30:00"),
    category: "Insurance",
    aiScore: 0.2,
    previousActions: 0,
  },
  {
    id: "2",
    type: "comment",
    content:
      "This is complete nonsense. The government is lying to us about everything and you people are just sheep following along.",
    author: {
      id: "user3",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 45,
    },
    reportedBy: {
      id: "user4",
      name: "Emma Wilson",
    },
    reason: "Misinformation and inflammatory language",
    severity: "high",
    status: "pending",
    timestamp: new Date("2024-01-15T09:15:00"),
    category: "Community Guidelines",
    aiScore: 0.8,
    previousActions: 2,
  },
  {
    id: "3",
    type: "post",
    content:
      "URGENT: Selling premium hay bales at discount prices! Contact me immediately for the best deals in the region!",
    author: {
      id: "user5",
      name: "Dave Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 30,
    },
    reason: "Excessive promotional content",
    severity: "medium",
    status: "pending",
    timestamp: new Date("2024-01-15T08:45:00"),
    category: "Marketplace",
    aiScore: 0.9,
    previousActions: 1,
  },
]

export function PostModerationSystem() {
  const [moderationQueue, setModerationQueue] = useState<ModerationItem[]>(mockModerationQueue)
  const [selectedTab, setSelectedTab] = useState("pending")
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)
  const [moderationNote, setModerationNote] = useState("")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const handleModeration = (itemId: string, action: "approve" | "reject" | "escalate", note?: string) => {
    setModerationQueue((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "escalated",
            }
          : item,
      ),
    )
    setSelectedItem(null)
    setModerationNote("")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredQueue = moderationQueue.filter((item) => {
    if (selectedTab !== "all" && item.status !== selectedTab) return false
    if (filterSeverity !== "all" && item.severity !== filterSeverity) return false
    return true
  })

  const ModerationItemCard = ({ item }: { item: ModerationItem }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{item.author.name}</p>
              <p className="text-xs text-muted-foreground">Reputation: {item.author.reputation}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
            {getStatusIcon(item.status)}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-700 line-clamp-3">{item.content}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Reported: {item.reason}</span>
          <span>{item.timestamp.toLocaleDateString()}</span>
        </div>

        {item.aiScore && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs">
              <span>AI Risk Score</span>
              <span
                className={
                  item.aiScore > 0.7 ? "text-red-600" : item.aiScore > 0.4 ? "text-yellow-600" : "text-green-600"
                }
              >
                {Math.round(item.aiScore * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className={`h-1.5 rounded-full ${item.aiScore > 0.7 ? "bg-red-500" : item.aiScore > 0.4 ? "bg-yellow-500" : "bg-green-500"}`}
                style={{ width: `${item.aiScore * 100}%` }}
              />
            </div>
          </div>
        )}

        {item.status === "pending" && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
              onClick={() => handleModeration(item.id, "approve")}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
              onClick={() => handleModeration(item.id, "reject")}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Review Content</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">{item.content}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Author:</strong> {item.author.name}
                    </div>
                    <div>
                      <strong>Reputation:</strong> {item.author.reputation}
                    </div>
                    <div>
                      <strong>Previous Actions:</strong> {item.previousActions || 0}
                    </div>
                    <div>
                      <strong>AI Score:</strong> {item.aiScore ? Math.round(item.aiScore * 100) + "%" : "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Moderation Note (Optional)</label>
                    <Textarea
                      value={moderationNote}
                      onChange={(e) => setModerationNote(e.target.value)}
                      placeholder="Add a note about your decision..."
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1" onClick={() => handleModeration(item.id, "approve", moderationNote)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleModeration(item.id, "reject", moderationNote)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleModeration(item.id, "escalate", moderationNote)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Escalate
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Moderation</h2>
          <p className="text-muted-foreground">Review and moderate community content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{moderationQueue.filter((i) => i.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{moderationQueue.filter((i) => i.status === "approved").length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{moderationQueue.filter((i) => i.status === "rejected").length}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{moderationQueue.filter((i) => i.status === "escalated").length}</p>
                <p className="text-sm text-muted-foreground">Escalated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({moderationQueue.filter((i) => i.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="escalated">Escalated</TabsTrigger>
          <TabsTrigger value="all">All Items</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {filteredQueue.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No items to review</h3>
                <p className="text-muted-foreground">All content in this category has been processed.</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {filteredQueue.map((item) => (
                <ModerationItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
