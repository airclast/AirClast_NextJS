import { Card, CardContent } from "@/components/ui/card"
import type { Notification } from "@/lib/types"
import { AlertTriangle, Bell } from "lucide-react"

interface NotificationStatsProps {
  notifications: Notification[]
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    airQualityAlerts: notifications.filter((n) => n.type === "air-quality-alert").length,
    forecastUpdates: notifications.filter((n) => n.type === "forecast-update").length,
    systemMaintenance: notifications.filter((n) => n.type === "system-maintenance").length,
    highSeverity: notifications.filter((n) => n.severity === "high" || n.severity === "very-high").length,
  }

  const statCards = [
    {
      label: "Total Notifications",
      value: stats.total,
      icon: <Bell className="w-5 h-5 text-muted-foreground" />,
      color: "text-card-foreground",
    },
    {
      label: "Unread",
      value: stats.unread,
      icon: <Bell className="w-5 h-5 text-blue-500" />,
      color: "text-blue-600",
    },
    {
      label: "Air Quality Alerts",
      value: stats.airQualityAlerts,
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      color: "text-orange-600",
    },
    {
      label: "High Priority",
      value: stats.highSeverity,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.label} className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
