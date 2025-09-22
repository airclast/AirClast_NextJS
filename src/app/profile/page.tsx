import { Header } from "@/components/header"
import { ProfileHeader } from "@/components/profile-header"
import { PersonalInfoCard } from "@/components/personal-info-card"
import { HealthConditionsCard } from "@/components/health-conditions-card"
import { NotificationPreferencesCard } from "@/components/notification-preferences-card"
import { LocationManagementCard } from "@/components/location-management-card"
import { AccountSettingsCard } from "@/components/account-settings-card"
import { mockUser, mockUserLocations } from "@/lib/mock-data"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <ProfileHeader user={mockUser} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PersonalInfoCard user={mockUser} />
            <HealthConditionsCard user={mockUser} />
          </div>
          <div className="space-y-6">
            <NotificationPreferencesCard user={mockUser} />
            <LocationManagementCard locations={mockUserLocations} />
          </div>
        </div>

        <AccountSettingsCard user={mockUser} />
      </main>
    </div>
  )
}
