"use server"

import { db } from "@/lib/server/db"
import { repositories } from "@/lib/server/db/schema"
import { eq } from "drizzle-orm"
import { cacheLife, cacheTag } from "next/cache"

export async function getImportedRepos({ userId }: { userId: string }) {
  "use cache"
  cacheLife("minutes")
  cacheTag(`imported-repos`)

  return await db.query.repositories.findMany({
    where: eq(repositories.userId, userId),
    columns: {
      id: true,
      name: true,
      fullName: true,
      owner: true,
      url: true,
      private: true,
      updatedAt: true,
    },
  })
}

export type getImportedReposType = Awaited<ReturnType<typeof getImportedRepos>>
export type importedRepotype = Awaited<
  ReturnType<typeof getImportedRepos>
>[number]
