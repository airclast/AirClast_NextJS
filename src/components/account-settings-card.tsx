"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { User } from "@/lib/types"
import { Settings, Download, Trash2, Shield } from "lucide-react"

interface AccountSettingsCardProps {
  user: User
}

export function AccountSettingsCard({ user }: AccountSettingsCardProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Settings className="w-5 h-5" />
          <span>Account Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Privacy Settings */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-card-foreground">Privacy & Data</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">Data Sharing</Label>
                <p className="text-xs text-muted-foreground">Share anonymized data for research</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">Location Tracking</Label>
                <p className="text-xs text-muted-foreground">Allow location-based recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm text-card-foreground">Analytics</Label>
                <p className="text-xs text-muted-foreground">Help improve our service</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-card-foreground">Data Management</Label>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="flex items-center space-x-2 justify-start bg-transparent">
              <Download className="w-4 h-4" />
              <span>Download My Data</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 justify-start bg-transparent">
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4 pt-4 border-t border-border">
          <Label className="text-sm font-medium text-destructive">Danger Zone</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2 justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
