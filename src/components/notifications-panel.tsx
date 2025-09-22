"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Notification } from "@/lib/types"
import { Bell, Check, CheckCheck, Trash2, AlertTriangle, Info, Settings } from "lucide-react"
import { formatTimestamp } from "@/lib/utils"

interface NotificationsPanelProps {
  notifications: Notification[]
  showAll?: boolean
  maxItems?: number
}

export function NotificationsPanel({ notifications, showAll = false, maxItems = 5 }: NotificationsPanelProps) {
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (notificationId: string) => {
    setNotificationList(
      notificationList.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (notificationId: string) => {
    setNotificationList(notificationList.filter((notif) => notif.id !== notificationId))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "very-high":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "air-quality-alert":
        return <AlertTriangle className="w-4 h-4" />
      case "forecast-update":
        return <Info className="w-4 h-4" />
      case "system-maintenance":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const displayNotifications = showAll ? notificationList : notificationList.slice(0, maxItems)
  const unreadCount = notificationList.filter((n) => !n.isRead).length

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {showAll && unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex items-center space-x-1 bg-transparent"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.isRead ? "bg-muted/50" : "bg-card"
              } ${getSeverityColor(notification.severity)}`}
            >
              <div className="flex items-start justify-between space-x-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-0.5">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-card-foreground text-sm">{notification.title}</h4>
                      <Badge variant="outline" className="text-xs capitalize">
                        {notification.severity}
                      </Badge>
                      {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <p className="text-sm text-card-foreground/80 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimestamp(notification.createdAt)}</span>
                      <Badge variant="outline" className="text-xs">
                        {notification.deliveryMethod}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {!showAll && notificationList.length > maxItems && (
          <div className="text-center pt-4">
            <Button variant="outline" size="sm">
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
