type BuildActivityParams = {
  githubRepoId: number
  type: string
  actor?: string
  message: string
  url?: string
  externalId: string
  eventCreatedAt: Date
}

export function buildActivity(params: BuildActivityParams) {
  return {
    githubRepoId: params.githubRepoId,
    type: params.type,
    actor: params.actor ?? "unknown",
    message: params.message,
    url: params.url,
    externalId: params.externalId,
    eventCreatedAt: params.eventCreatedAt,
  }
}
