"use server"

import { db } from "@/lib/server/db"
import { activities, repositories } from "@/lib/server/db/schema"
import {
  DashboardData,
  DashboardStats,
  Insight,
  RepoActivityGroup,
} from "@/types/dashboard"
import { eq, inArray, desc } from "drizzle-orm"
// import { cacheLife, cacheTag } from "next/cache"

export async function getDashboardData(userId: string): Promise<DashboardData> {
  // "use cache"

  // cacheLife("minutes")
  // cacheTag(`dashboard-${userId}`)

  // 1. Get user repos
  const userRepos = await db.query.repositories.findMany({
    where: eq(repositories.userId, userId),
    columns: {
      githubRepoId: true,
      name: true,
    },
  })

  if (userRepos.length === 0) {
    return {
      repoGroups: [],
      insights: [],
      stats: {
        commitsToday: 0,
        openPRs: 0,
        activeContributors: 0,
      },
    }
  }

  const repoIds = userRepos.map((r) => r.githubRepoId)

  // 🔥 2. Fetch recent activities
  const recentActivities = await db.query.activities.findMany({
    where: inArray(activities.githubRepoId, repoIds),
    orderBy: desc(activities.createdAt),
    limit: 50,
  })

  // 🔥 3. Group by repo
  const repoMap = new Map<number, RepoActivityGroup>()

  for (const repo of userRepos) {
    repoMap.set(repo.githubRepoId, {
      repoId: repo.githubRepoId,
      repoName: repo.name,
      activities: [],
    })
  }

  for (const activity of recentActivities) {
    const group = repoMap.get(activity.githubRepoId)
    if (group) {
      group.activities.push(activity)
    }
  }

  const repoGroups = Array.from(repoMap.values())

  // 🔥 4. Stats

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayActivities = recentActivities.filter(
    (a) => new Date(a.createdAt) >= today
  )

  const commitsToday = todayActivities.filter((a) => a.type === "push").length

  const openPRs = recentActivities.filter(
    (a) => a.type === "pull_request"
  ).length

  const contributors = new Set(recentActivities.map((a) => a.actor))

  const stats: DashboardStats = {
    commitsToday,
    openPRs,
    activeContributors: contributors.size,
  }

  // 🔥 5. Insights (basic rules, extend later)

  const insights: Insight[] = []

  if (commitsToday > 10) {
    insights.push({
      id: "high-activity",
      title: "High commit activity detected",
      repoName: repoGroups.map((repo) => repo.repoName),
      description: `${commitsToday} commits today across repositories`,
      severity: "info",
    })
  }

  const THIRTY_DAYS_AGO = new Date()
  THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30)

  const inactiveRepos = repoGroups.filter((repo) => {
    if (repo.activities.length === 0) return true

    const latestActivity = repo.activities[0]

    return new Date(latestActivity.eventCreatedAt) < THIRTY_DAYS_AGO
  })

  if (inactiveRepos.length > 0) {
    insights.push({
      id: "inactive-repos",
      title: "Inactive repositories detected",
      repoName: inactiveRepos.map((repo) => repo.repoName),
      description: `${inactiveRepos.length} repos have no recent activity`,
      severity: "warning",
    })
  }

  return {
    repoGroups,
    insights,
    stats,
  }
}
