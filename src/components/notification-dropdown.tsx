"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Notification } from "@/lib/types"
import { Bell, Settings, AlertTriangle, Info } from "lucide-react"
import { formatTimestamp } from "@/lib/utils"

interface NotificationDropdownProps {
  notifications: Notification[]
}

export function NotificationDropdown({ notifications }: NotificationDropdownProps) {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.isRead).length
  const recentNotifications = notificationList.slice(0, 5)

  const markAsRead = (notificationId: string) => {
    setNotificationList(
      notificationList.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "air-quality-alert":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "forecast-update":
        return <Info className="w-4 h-4 text-blue-500" />
      case "system-maintenance":
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {/* ✅ Use Label instead of Header */}
        <DropdownMenuLabel className="font-semibold flex items-center">
          Notifications
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recentNotifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <>
            {recentNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  {getTypeIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium truncate">{notification.title}</p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              <a href="/notifications" className="text-sm text-primary">
                View all notifications
              </a>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
