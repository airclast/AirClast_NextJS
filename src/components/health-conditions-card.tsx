"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { User } from "@/lib/types"
import { Heart, Plus, X } from "lucide-react"

interface HealthConditionsCardProps {
  user: User
}

export function HealthConditionsCard({ user }: HealthConditionsCardProps) {
  const [conditions, setConditions] = useState(user.healthConditions)
  const [newCondition, setNewCondition] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const addCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()])
      setNewCondition("")
      setIsAdding(false)
    }
  }

  const removeCondition = (conditionToRemove: string) => {
    setConditions(conditions.filter((condition) => condition !== conditionToRemove))
  }

  const commonConditions = ["asthma", "allergies", "copd", "heart disease", "diabetes", "pregnancy"]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <Heart className="w-5 h-5" />
          <span>Health Conditions</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help us provide personalized air quality recommendations based on your health needs.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Conditions */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Current Conditions</Label>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <Badge key={condition} variant="secondary" className="flex items-center space-x-1">
                <span className="capitalize">{condition}</span>
                <button
                  onClick={() => removeCondition(condition)}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {conditions.length === 0 && <p className="text-muted-foreground text-sm">No health conditions specified</p>}
          </div>
        </div>

        {/* Add New Condition */}
        <div>
          {isAdding ? (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter health condition"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCondition()}
              />
              <Button onClick={addCondition} size="sm">
                Add
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)} size="sm">
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsAdding(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Condition</span>
            </Button>
          )}
        </div>

        {/* Common Conditions */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Common Conditions</Label>
          <div className="flex flex-wrap gap-2">
            {commonConditions
              .filter((condition) => !conditions.includes(condition))
              .map((condition) => (
                <Button
                  key={condition}
                  variant="outline"
                  size="sm"
                  onClick={() => setConditions([...conditions, condition])}
                  className="capitalize"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {condition}
                </Button>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
