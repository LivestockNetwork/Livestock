"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  WifiOff,
  Wifi,
  Download,
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  FileText,
  Radio,
  Signal,
  Smartphone,
  HardDrive,
  RefreshCw,
} from "lucide-react"

interface OfflineData {
  emergencyPlans: any[]
  contacts: any[]
  maps: any[]
  weatherData: any[]
  communityMembers: any[]
  lastSync: Date
  size: number
}

interface NetworkStatus {
  online: boolean
  connectionType: string
  effectiveType: string
  downlink: number
  rtt: number
}

export function OfflineEmergencySystem() {
  const [isOnline, setIsOnline] = useState(true)
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    online: true,
    connectionType: "wifi",
    effectiveType: "4g",
    downlink: 10,
    rtt: 100,
  })
  const [offlineData, setOfflineData] = useState<OfflineData>({
    emergencyPlans: [],
    contacts: [],
    maps: [],
    weatherData: [],
    communityMembers: [],
    lastSync: new Date(),
    size: 0,
  })
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [storageUsed, setStorageUsed] = useState(0)
  const [storageQuota, setStorageQuota] = useState(0)

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check initial status
    setIsOnline(navigator.onLine)

    // Monitor network connection quality
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      setNetworkStatus({
        online: navigator.onLine,
        connectionType: connection.type || "unknown",
        effectiveType: connection.effectiveType || "unknown",
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
      })

      const handleConnectionChange = () => {
        setNetworkStatus({
          online: navigator.onLine,
          connectionType: connection.type || "unknown",
          effectiveType: connection.effectiveType || "unknown",
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
        })
      }

      connection.addEventListener("change", handleConnectionChange)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
        connection.removeEventListener("change", handleConnectionChange)
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    // Check storage usage
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then((estimate) => {
        setStorageUsed(estimate.usage || 0)
        setStorageQuota(estimate.quota || 0)
      })
    }
  }, [])

  const downloadOfflineData = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    try {
      // Simulate downloading critical data
      const steps = [
        { name: "Emergency Plans", data: "emergency-plans" },
        { name: "Emergency Contacts", data: "contacts" },
        { name: "Offline Maps", data: "maps" },
        { name: "Weather Data", data: "weather" },
        { name: "Community Members", data: "members" },
      ]

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setDownloadProgress(((i + 1) / steps.length) * 100)
      }

      setOfflineData({
        emergencyPlans: [
          { id: "1", name: "Bushfire Plan", type: "bushfire", lastUpdated: new Date() },
          { id: "2", name: "Flood Plan", type: "flood", lastUpdated: new Date() },
        ],
        contacts: [
          { id: "1", name: "Emergency Services", number: "000", type: "emergency" },
          { id: "2", name: "Local SES", number: "132 500", type: "emergency" },
          { id: "3", name: "Rural Fire Service", number: "1800 679 737", type: "emergency" },
        ],
        maps: [
          { id: "1", name: "Local Area Map", size: "2.5MB", downloaded: true },
          { id: "2", name: "Evacuation Routes", size: "1.8MB", downloaded: true },
        ],
        weatherData: [{ id: "1", date: new Date(), temperature: 22, conditions: "Partly Cloudy" }],
        communityMembers: [
          { id: "1", name: "Sarah Mitchell", distance: "2.3km", available: true },
          { id: "2", name: "John Smith", distance: "4.1km", available: true },
        ],
        lastSync: new Date(),
        size: 15.7,
      })
    } catch (error) {
      console.error("Failed to download offline data:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const syncData = async () => {
    if (!isOnline) return

    try {
      // Simulate syncing data
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setOfflineData((prev) => ({ ...prev, lastSync: new Date() }))
    } catch (error) {
      console.error("Failed to sync data:", error)
    }
  }

  const getConnectionQuality = () => {
    if (!isOnline) return "offline"
    if (networkStatus.effectiveType === "4g" && networkStatus.downlink > 5) return "excellent"
    if (networkStatus.effectiveType === "4g" || networkStatus.downlink > 2) return "good"
    if (networkStatus.effectiveType === "3g" || networkStatus.downlink > 0.5) return "fair"
    return "poor"
  }

  const getConnectionColor = () => {
    const quality = getConnectionQuality()
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-orange-600"
      case "offline":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const storagePercentage = storageQuota > 0 ? (storageUsed / storageQuota) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={`border-l-4 ${isOnline ? "border-green-500" : "border-red-500"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isOnline ? <Wifi className="h-6 w-6 text-green-600" /> : <WifiOff className="h-6 w-6 text-red-600" />}
              <div>
                <h3 className={`font-semibold ${isOnline ? "text-green-800" : "text-red-800"}`}>
                  {isOnline ? "Online" : "Offline Mode"}
                </h3>
                <p className={`text-sm ${getConnectionColor()}`}>
                  {isOnline
                    ? `${networkStatus.effectiveType.toUpperCase()} • ${getConnectionQuality()} connection`
                    : "Emergency features available offline"}
                </p>
              </div>
            </div>
            {isOnline && (
              <Button variant="outline" size="sm" onClick={syncData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Offline Alert */}
      {!isOnline && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>You're currently offline.</strong> Emergency features and offline data are still available. The app
            will sync automatically when connection is restored.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Offline Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HardDrive className="h-5 w-5" />
              <span>Offline Emergency Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Last synced:</span>
              <span className="text-sm font-medium">
                {offlineData.lastSync.toLocaleDateString()} at {offlineData.lastSync.toLocaleTimeString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Data size:</span>
              <span className="text-sm font-medium">{offlineData.size} MB</span>
            </div>

            {isDownloading ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Downloading...</span>
                  <span className="text-sm font-medium">{Math.round(downloadProgress)}%</span>
                </div>
                <Progress value={downloadProgress} />
              </div>
            ) : (
              <Button
                onClick={downloadOfflineData}
                disabled={!isOnline}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                <Download className="h-4 w-4 mr-2" />
                {offlineData.size > 0 ? "Update Offline Data" : "Download Offline Data"}
              </Button>
            )}

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm">Available Offline:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <span className="text-sm">Emergency Plans</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{offlineData.emergencyPlans.length} plans</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-600" />
                    <span className="text-sm">Emergency Contacts</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">{offlineData.contacts.length} contacts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-600" />
                    <span className="text-sm">Offline Maps</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">{offlineData.maps.length} maps</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-600" />
                    <span className="text-sm">Community Members</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">{offlineData.communityMembers.length} members</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Actions</span>
              {!isOnline && <Badge className="bg-green-100 text-green-700">Available Offline</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button className="bg-red-500 hover:bg-red-600 text-white justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6" />
                  <div className="text-left">
                    <p className="font-semibold">Call Emergency Services</p>
                    <p className="text-sm opacity-90">000 - Police, Fire, Ambulance</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <div className="flex items-center space-x-3">
                  <Radio className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">Emergency Radio</p>
                    <p className="text-sm text-slate-600">Local emergency broadcasts</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">View Emergency Plan</p>
                    <p className="text-sm text-slate-600">Access your offline emergency plans</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold">Contact Neighbors</p>
                    <p className="text-sm text-slate-600">Reach out to nearby community members</p>
                  </div>
                </div>
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-3">Offline Emergency Contacts:</h4>
              <div className="space-y-2">
                {offlineData.contacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <span className="text-sm font-medium">{contact.name}</span>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-3 w-3 mr-1" />
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Storage Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Storage used:</span>
            <span className="text-sm font-medium">
              {formatBytes(storageUsed)} of {formatBytes(storageQuota)}
            </span>
          </div>
          <Progress value={storagePercentage} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Smartphone className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm font-medium">App Data</p>
              <p className="text-xs text-slate-600">5.2 MB</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium">Offline Maps</p>
              <p className="text-xs text-slate-600">8.3 MB</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-sm font-medium">Emergency Plans</p>
              <p className="text-xs text-slate-600">2.2 MB</p>
            </div>
          </div>

          {storagePercentage > 80 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Storage is running low. Consider clearing old data or freeing up space on your device.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Network Quality Monitor */}
      {isOnline && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Signal className="h-5 w-5" />
              <span>Network Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">{networkStatus.effectiveType.toUpperCase()}</p>
                <p className="text-sm text-slate-600">Connection Type</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">{networkStatus.downlink} Mbps</p>
                <p className="text-sm text-slate-600">Download Speed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">{networkStatus.rtt} ms</p>
                <p className="text-sm text-slate-600">Latency</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${getConnectionColor()}`}>
                  {getConnectionQuality().charAt(0).toUpperCase() + getConnectionQuality().slice(1)}
                </p>
                <p className="text-sm text-slate-600">Quality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
