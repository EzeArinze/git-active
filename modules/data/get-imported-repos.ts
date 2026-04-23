"use server"

import { db } from "@/lib/server/db"
import { repositories } from "@/lib/server/db/schema"
import { getServerSession } from "@/lib/server/auth-guard/session"
import { eq } from "drizzle-orm"

export async function getImportedRepos() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return await db.query.repositories.findMany({
    where: eq(repositories.userId, session.user.id),
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
