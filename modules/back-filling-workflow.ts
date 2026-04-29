import { backfillRepoTypes } from "@/types/back-fill-repo"
import { backfillRepos } from "./github/sync/trigger-initial-sync"

export const backfillworkflow = async ({
  installationId,
  repos,
  userId,
}: backfillRepoTypes) => {
  "use workflow"

  console.log("Starting backfill workflow for installation:", installationId)
  await backfillRepos(installationId, userId, repos)
  console.log("Completed backfill workflow for installation:", installationId)
}
