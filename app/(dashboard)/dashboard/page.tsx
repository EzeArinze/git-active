import DashboardHeader from "./_components/dashboard-content/dashboard-header"
import DashboardActivities from "./_components/dashboard-content/dashboard-activities"
import ActivitiesPreview from "./_components/dashboard-content/activities-preview"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { getUserGithubState } from "@/modules/data/getUserGithubState"
import { getDashboardData } from "@/modules/data/get-dashboard-data"
import { redirect } from "next/navigation"

export default async function DashboardRoutePage() {
  const session = await requireAuth("/login")

  const state = await getUserGithubState(session.user.id)

  if (!state?.hasInstallation) {
    redirect("/dashboard/onboarding")
  }

  if (state?.hasInstallation && !state?.hasRepos) {
    redirect("/dashboard/repositories/import-repos")
  }

  // 🔥 FETCH DASHBOARD DATA
  const data = await getDashboardData(session.user.id)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DashboardHeader />

      <ActivitiesPreview stats={data.stats} insights={data.insights} />

      <DashboardActivities repoGroups={data.repoGroups} />
    </div>
  )
}
