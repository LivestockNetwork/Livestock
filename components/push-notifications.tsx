"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  BellOff,
  AlertTriangle,
  Users,
  MessageCircle,
  Truck,
  MapPin,
  Clock,
  X,
  Settings,
  Volume2,
  VolumeX,
  Smartphone,
} from "lucide-react"

interface PushNotification {
  id: string
  type: "emergency" | "community" | "message" | "equipment" | "weather"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  priority: "low" | "normal" | "high" | "urgent"
  actionUrl?: string
  sender?: string
}

interface NotificationSettings {
  enabled: boolean
  emergency: boolean
  community: boolean
  messages: boolean
  equipment: boolean
  weather: boolean
  sound: boolean
  vibration: boolean
  quietHours: boolean
  quietStart: string
  quietEnd: string
}

export default function PushNotifications() {
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: "1",
      type: "emergency",
      title: "🚨 EMERGENCY ALERT",
      message: "Bushfire approaching Manning Valley. Evacuate Zone A immediately.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      priority: "urgent",
      actionUrl: "/emergency-alerts",
    },
    {
      id: "2",
      type: "community",
      title: "Help Request",
      message: "Sarah M. needs urgent cattle transport - flood evacuation",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      priority: "high",
      sender: "Sarah Mitchell",
      actionUrl: "/community",
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      message: "Tom: Thanks for the tractor help yesterday!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true,
      priority: "normal",
      sender: "Tom Roberts",
      actionUrl: "/messages",
    },
    {
      id: "4",
      type: "weather",
      title: "Weather Alert",
      message: "Severe storm warning - damaging winds expected tonight",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      priority: "high",
      actionUrl: "/weather",
    },
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    emergency: true,
    community: true,
    messages: true,
    equipment: false,
    weather: true,
    sound: true,
    vibration: true,
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "07:00",
  })

  const [showSettings, setShowSettings] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default")

  useEffect(() => {
    // Check notification permission status
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)

      if (permission === "granted") {
        // Show a test notification
        new Notification("Rural Community Hub", {
          body: "Notifications enabled! You'll now receive emergency alerts and community updates.",
          icon: "/favicon.ico",
        })
      }
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId))
  }

  const updateSetting = (key: keyof NotificationSettings, value: boolean | string) => {
    setSettings({ ...settings, [key]: value })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "community":
        return <Users className="h-4 w-4 text-blue-500" />
      case "message":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "equipment":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "weather":
        return <MapPin className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-slate-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "low":
        return "bg-slate-100 text-slate-800 border-slate-300"
      default:
        return "bg-slate-100 text-slate-800 border-slate-300"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
          <p className="text-slate-600">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="border-slate-300 bg-transparent"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>

          {permissionStatus !== "granted" && (
            <Button onClick={requestNotificationPermission} className="bg-teal-500 hover:bg-teal-600 text-white">
              <Bell className="h-4 w-4 mr-2" />
              Enable Notifications
            </Button>
          )}
        </div>
      </div>

      {/* Permission Status */}
      {permissionStatus === "denied" && (
        <Card className="border-l-4 border-red-500 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BellOff className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Notifications Blocked</h3>
                <p className="text-sm text-red-700">
                  Please enable notifications in your browser settings to receive emergency alerts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {permissionStatus === "default" && (
        <Card className="border-l-4 border-amber-500 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">Enable Notifications</h3>
                <p className="text-sm text-amber-700">
                  Get instant alerts for emergencies and important community updates.
                </p>
              </div>
              <Button
                onClick={requestNotificationPermission}
                className="bg-amber-600 hover:bg-amber-700 text-white ml-auto"
              >
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Recent Notifications</h3>

          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No notifications</h3>
                <p className="text-slate-600">You're all caught up! New notifications will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? "ring-2 ring-teal-200 bg-teal-50" : ""
                } ${notification.priority === "urgent" ? "border-l-4 border-red-500" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-800">{notification.title}</h4>
                          <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          {!notification.isRead && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
                        </div>

                        <p className="text-sm text-slate-700 mb-2">{notification.message}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(notification.timestamp)}
                          </div>
                          {notification.sender && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {notification.sender}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          View
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          dismissNotification(notification.id)
                        }}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Settings Panel */}
        <div className={showSettings ? "" : "hidden lg:block"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Master Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">Push Notifications</div>
                  <div className="text-sm text-slate-600">Enable all notifications</div>
                </div>
                <Switch checked={settings.enabled} onCheckedChange={(checked) => updateSetting("enabled", checked)} />
              </div>

              {settings.enabled && (
                <>
                  {/* Notification Types */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Notification Types</h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium text-sm">Emergency Alerts</div>
                            <div className="text-xs text-slate-600">Critical safety alerts</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.emergency}
                          onCheckedChange={(checked) => updateSetting("emergency", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="font-medium text-sm">Community Posts</div>
                            <div className="text-xs text-slate-600">New posts and help requests</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.community}
                          onCheckedChange={(checked) => updateSetting("community", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          <div>
                            <div className="font-medium text-sm">Messages</div>
                            <div className="text-xs text-slate-600">Direct messages from locals</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.messages}
                          onCheckedChange={(checked) => updateSetting("messages", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="font-medium text-sm">Equipment Sharing</div>
                            <div className="text-xs text-slate-600">Equipment available for hire</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.equipment}
                          onCheckedChange={(checked) => updateSetting("equipment", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <div>
                            <div className="font-medium text-sm">Weather Alerts</div>
                            <div className="text-xs text-slate-600">Severe weather warnings</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.weather}
                          onCheckedChange={(checked) => updateSetting("weather", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sound & Vibration */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Sound & Vibration</h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {settings.sound ? (
                            <Volume2 className="h-4 w-4 text-slate-600" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-slate-600" />
                          )}
                          <div>
                            <div className="font-medium text-sm">Sound</div>
                            <div className="text-xs text-slate-600">Play notification sounds</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.sound}
                          onCheckedChange={(checked) => updateSetting("sound", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-slate-600" />
                          <div>
                            <div className="font-medium text-sm">Vibration</div>
                            <div className="text-xs text-slate-600">Vibrate on notifications</div>
                          </div>
                        </div>
                        <Switch
                          checked={settings.vibration}
                          onCheckedChange={(checked) => updateSetting("vibration", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Quiet Hours</div>
                        <div className="text-sm text-slate-600">Silence non-emergency notifications</div>
                      </div>
                      <Switch
                        checked={settings.quietHours}
                        onCheckedChange={(checked) => updateSetting("quietHours", checked)}
                      />
                    </div>

                    {settings.quietHours && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Start</label>
                          <input
                            type="time"
                            value={settings.quietStart}
                            onChange={(e) => updateSetting("quietStart", e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">End</label>
                          <input
                            type="time"
                            value={settings.quietEnd}
                            onChange={(e) => updateSetting("quietEnd", e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
