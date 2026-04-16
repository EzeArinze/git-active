"use server"

import { db } from "@/lib/server/db"
import { eq } from "drizzle-orm"
import { githubInstallations } from "@/lib/server/db/schema"

export async function checkInstallationId(userId: string) {
  try {
    const installationRecord = await db.query.githubInstallations.findFirst({
      where: eq(githubInstallations.userId, userId),
      columns: {
        installationId: true,
        accountLogin: true,
      },
    })

    if (!installationRecord) {
      return null
    }

    return installationRecord
  } catch (error) {
    console.log(error)
    return null
  }
}
