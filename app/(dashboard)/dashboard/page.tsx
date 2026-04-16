import DashboardHeader from "./_components/dashboard-content/dashboard-header"
import DashboardActivities from "./_components/dashboard-content/dashboard-activities"
import ActivitiesPreview from "./_components/dashboard-content/activities-preview"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { checkInstallationId } from "@/modules/data/check-installation-id"
import { redirect } from "next/navigation"

export default async function DashboardRoutePage() {
  const session = await requireAuth("/login")

  const installationRecord = await checkInstallationId(session.user.id)

  if (!installationRecord) {
    redirect("/dashboard/onboarding")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DashboardHeader />
      <ActivitiesPreview />

      {/* Activity Feed Header */}
      <DashboardActivities />
    </div>
  )
}
