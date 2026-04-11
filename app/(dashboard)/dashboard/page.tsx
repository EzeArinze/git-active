import DashboardHeader from "./_components/dashboard-content/dashboard-header"
import DashboardActivities from "./_components/dashboard-content/dashboard-activities"
import ActivitiesPreview from "./_components/dashboard-content/activities-preview"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DashboardHeader />
      <ActivitiesPreview />

      {/* Activity Feed Header */}
      <DashboardActivities />
    </div>
  )
}
