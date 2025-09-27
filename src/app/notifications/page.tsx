import { Header } from "@/components/header"
import { NotificationsPanel } from "@/components/notifications-panel"
import { NotificationFilters } from "@/components/notification-filters"
import { NotificationStats } from "@/components/notification-stats"
import { mockNotifications } from "@/lib/mock-data"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        {/* Header */}
              <Header />
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-card sticky top-0 h-screen">
      
            <DashboardSidebar />
            </div>

      <main  className="flex-1 flex flex-col mt-14 p-2">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground mb-2">Stay informed about air quality changes and system updates</p>
          </div>
        </div>

        {/* Notification Stats */}
        <NotificationStats notifications={mockNotifications} />

        {/* Filters and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-4">
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
