import { DBActivity } from "@/lib/server/db/schema"

type RepoActivityGroup = {
  repoId: number
  repoName: string
  activities: DBActivity[]
}

type InsightSeverity = "info" | "warning" | "critical"

type Insight = {
  id: string
  title: string
  description: string
  severity?: InsightSeverity
}

type DashboardStats = {
  commitsToday: number
  openPRs: number
  activeContributors: number
}

type DashboardData = {
  repoGroups: RepoActivityGroup[]
  insights: Insight[]
  stats: DashboardStats
}

type DashboardFilters = {
  repoIds?: number[]
  eventTypes?: string[]
  timeRange?: "24h" | "7d" | "30d" | "all"
}
