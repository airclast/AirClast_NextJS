"use client"

import { Header } from "@/components/header"
import { ProfileHeader } from "@/components/profile-header"
import { PersonalInfoCard } from "@/components/personal-info-card"
import { HealthConditionsCard } from "@/components/health-conditions-card"
import { NotificationPreferencesCard } from "@/components/notification-preferences-card"
import { LocationManagementCard } from "@/components/location-management-card"
import { AccountSettingsCard } from "@/components/account-settings-card"
import { mockUser, mockUserLocations } from "@/lib/mock-data"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        {/* Header */}
        <Header />
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card sticky top-0 h-screen">

      <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-12">

        {/* Page Content */}
        <main className="flex-1 px-4 py-8 space-y-8">
          {/* Profile Header */}
          <ProfileHeader user={mockUser} />

          {/* Grid Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <PersonalInfoCard user={mockUser} />
              <HealthConditionsCard user={mockUser} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <NotificationPreferencesCard user={mockUser} />
              <LocationManagementCard locations={mockUserLocations} />
            </div>
          </div>

          {/* Account Settings Card */}
          <AccountSettingsCard user={mockUser} />
        </main>
      </div>
    </div>
  )
}
