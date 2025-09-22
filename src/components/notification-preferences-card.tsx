"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/types"
import { Bell, Save } from "lucide-react"

interface NotificationPreferencesCardProps {
  user: User
}

export function NotificationPreferencesCard({ user }: NotificationPreferencesCardProps) {
  const [preferences, setPreferences] = useState(user.notificationPreferences)

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving notification preferences:", preferences)
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Bell className="w-5 h-5" />
          <span>Notification Preferences</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how and when you want to receive air quality alerts and updates.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Methods */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-card-foreground">Notification Methods</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch
                checked={preferences.email}
                onCheckedChange={(checked) => setPreferences({ ...preferences, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts via text message</p>
              </div>
              <Switch
                checked={preferences.sms}
                onCheckedChange={(checked) => setPreferences({ ...preferences, sms: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts in your browser</p>
              </div>
              <Switch
                checked={preferences.push}
                onCheckedChange={(checked) => setPreferences({ ...preferences, push: checked })}
              />
            </div>
          </div>
        </div>

        {/* Severity Threshold */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-card-foreground">Alert Threshold</Label>
          <Select
            value={preferences.severityThreshold}
            onValueChange={(value: any) => setPreferences({ ...preferences, severityThreshold: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - All air quality changes</SelectItem>
              <SelectItem value="moderate">Moderate - Moderate air quality and above</SelectItem>
              <SelectItem value="high">High - Unhealthy air quality and above</SelectItem>
              <SelectItem value="very-high">Very High - Very unhealthy and hazardous only</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Only receive notifications when air quality reaches this level or higher
          </p>
        </div>

        {/* Notification Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Notification Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="air-quality-alerts" className="rounded" defaultChecked />
              <Label htmlFor="air-quality-alerts" className="text-sm text-card-foreground">
                Air Quality Alerts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="forecast-updates" className="rounded" defaultChecked />
              <Label htmlFor="forecast-updates" className="text-sm text-card-foreground">
                Forecast Updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="health-recommendations" className="rounded" defaultChecked />
              <Label htmlFor="health-recommendations" className="text-sm text-card-foreground">
                Health Recommendations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="system-updates" className="rounded" />
              <Label htmlFor="system-updates" className="text-sm text-card-foreground">
                System Updates
              </Label>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </Button>
      </CardContent>
    </Card>
  )
}
