export type backfillRepoTypes = {
  installationId: number
  userId: string
  repos: {
    owner: string
    name: string
    githubRepoId: number
  }[]
}
