import { Header } from "@/components/header"
import { NotificationsPanel } from "@/components/notifications-panel"
import { NotificationFilters } from "@/components/notification-filters"
import { NotificationStats } from "@/components/notification-stats"
import { mockNotifications } from "@/lib/mock-data"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay informed about air quality changes and system updates</p>
          </div>
        </div>

        {/* Notification Stats */}
        <NotificationStats notifications={mockNotifications} />

        {/* Filters and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <NotificationFilters />
          </div>
          <div className="lg:col-span-3">
            <NotificationsPanel notifications={mockNotifications} showAll={true} />
          </div>
        </div>
      </main>
    </div>
  )
}
