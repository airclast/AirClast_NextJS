"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/lib/types"
import { UserIcon, Save, X } from "lucide-react"

interface PersonalInfoCardProps {
  user: User
}

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving user data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    })
    setIsEditing(false)
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <UserIcon className="w-5 h-5" />
            <span>Personal Information</span>
          </CardTitle>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2 bg-transparent">
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Full Name</Label>
              <p className="text-card-foreground font-medium">{user.name}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email Address</Label>
              <p className="text-card-foreground font-medium">{user.email}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Account Created</Label>
              <p className="text-card-foreground font-medium">{user.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Last Updated</Label>
              <p className="text-card-foreground font-medium">{user.updatedAt.toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
