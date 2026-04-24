import DashboardHeader from "./_components/dashboard-content/dashboard-header"
import DashboardActivities from "./_components/dashboard-content/dashboard-activities"
import ActivitiesPreview from "./_components/dashboard-content/activities-preview"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { getUserGithubState } from "@/modules/data/getUserGithubState"
import { getDashboardData } from "@/modules/data/get-dashboard-data"
import DashboardSkeleton from "./_components/dashboard-content/dashboard-skeleton"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function DashboardRoutePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DashboardHeader />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

async function DashboardContent() {
  const session = await requireAuth("/login")

  const state = await getUserGithubState(session.user.id)

  if (!state?.hasInstallation) {
    redirect("/dashboard/onboarding")
  }

  if (state?.hasInstallation && !state?.hasRepos) {
    redirect("/dashboard/repositories/import-repos")
  }

  const data = await getDashboardData(session.user.id)

  return (
    <>
      <ActivitiesPreview stats={data.stats} insights={data.insights} />
      <DashboardActivities repoGroups={data.repoGroups} />
    </>
  )
}
