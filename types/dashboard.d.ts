import { DBActivity } from "@/lib/server/db/schema"

export type RepoActivityGroup = {
  repoId: number
  repoName: string
  activities: DBActivity[]
}

export type InsightSeverity = "info" | "warning" | "critical"

export type Insight = {
  id: string
  title: string
  description: string
  severity?: InsightSeverity
}

export type DashboardStats = {
  commitsToday: number
  openPRs: number
  activeContributors: number
}

export type DashboardData = {
  repoGroups: RepoActivityGroup[]
  insights: Insight[]
  stats: DashboardStats
}

export type DashboardFilters = {
  repoIds?: number[]
  eventTypes?: string[]
  timeRange?: "24h" | "7d" | "30d" | "all"
}
