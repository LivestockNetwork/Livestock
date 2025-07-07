"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EmergencyService, type EmergencyAlert } from "@/lib/emergency-service"
import { AlertTriangle, Plus, Edit, Trash2 } from "lucide-react"

export function AdminDashboard() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAlert, setEditingAlert] = useState<EmergencyAlert | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    severity: "medium" as const,
    alert_type: "other" as const,
    affected_areas: "",
    expires_at: "",
  })

  const emergencyService = new EmergencyService()

  useEffect(() => {
    loadAlerts()
  }, [])

  const loadAlerts = async () => {
    try {
      const data = await emergencyService.getActiveAlerts()
      setAlerts(data)
    } catch (error) {
      console.error("Error loading alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const alertData = {
        ...formData,
        affected_areas: formData.affected_areas.split(",").map((area) => area.trim()),
        active: true,
        expires_at: formData.expires_at || undefined,
      }

      if (editingAlert) {
        await emergencyService.updateAlert(editingAlert.id, alertData)
      } else {
        await emergencyService.createAlert(alertData)
      }

      await loadAlerts()
      resetForm()
    } catch (error) {
      console.error("Error saving alert:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      try {
        await emergencyService.deleteAlert(id)
        await loadAlerts()
      } catch (error) {
        console.error("Error deleting alert:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      severity: "medium",
      alert_type: "other",
      affected_areas: "",
      expires_at: "",
    })
    setShowCreateForm(false)
    setEditingAlert(null)
  }

  const startEdit = (alert: EmergencyAlert) => {
    setEditingAlert(alert)
    setFormData({
      title: alert.title,
      message: alert.message,
      severity: alert.severity,
      alert_type: alert.alert_type,
      affected_areas: alert.affected_areas.join(", "),
      expires_at: alert.expires_at || "",
    })
    setShowCreateForm(true)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAlert ? "Edit Alert" : "Create New Alert"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Alert Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value: any) => setFormData({ ...formData, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="alert_type">Alert Type</Label>
                  <Select
                    value={formData.alert_type}
                    onValueChange={(value: any) => setFormData({ ...formData, alert_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bushfire">Bushfire</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="drought">Drought</SelectItem>
                      <SelectItem value="storm">Storm</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="affected_areas">Affected Areas (comma-separated)</Label>
                <Input
                  id="affected_areas"
                  value={formData.affected_areas}
                  onChange={(e) => setFormData({ ...formData, affected_areas: e.target.value })}
                  placeholder="NSW, VIC, QLD"
                />
              </div>

              <div>
                <Label htmlFor="expires_at">Expires At (optional)</Label>
                <Input
                  id="expires_at"
                  type="datetime-local"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingAlert ? "Update Alert" : "Create Alert"}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Active Emergency Alerts</h2>
        {alerts.length === 0 ? (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>No active emergency alerts. Create one to notify users of emergencies.</AlertDescription>
          </Alert>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {alert.title}
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {alert.alert_type.toUpperCase()} • Created {new Date(alert.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(alert)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(alert.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{alert.message}</p>
                {alert.affected_areas.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {alert.affected_areas.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
