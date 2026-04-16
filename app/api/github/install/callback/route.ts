import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/server/db"
import { githubInstallations } from "@/lib/server/db/schema"
import { getServerSession } from "@/lib/server/auth-guard/session"
import {
  getInstallationFallback,
  getInstallationMetadata,
} from "@/modules/github/github"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const installationId = searchParams.get("installation_id")

  if (!installationId) {
    return NextResponse.redirect(new URL("/dashboard/onboarding", req.url))
  }

  const session = await getServerSession()

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const { accountLogin, accountType } = await getInstallationMetadata(
      Number(installationId)
    )

    const safeAccountLogin =
      accountLogin ?? (await getInstallationFallback(Number(installationId)))

    if (!safeAccountLogin) {
      throw new Error("Unable to resolve GitHub account login")
    }

    await db
      .insert(githubInstallations)
      .values({
        userId: session.user.id,
        installationId: Number(installationId),
        accountLogin: safeAccountLogin,
        accountType: accountType ?? null,
      })
      .onConflictDoUpdate({
        target: githubInstallations.installationId,
        set: {
          userId: session.user.id,
          accountLogin,
          accountType,
        },
      })

    return NextResponse.redirect(
      new URL("/dashboard/repositories/import-repos", req.url)
    )
  } catch (error) {
    console.error("GitHub installation error:", error)

    return NextResponse.redirect(new URL("/dashboard/onboarding", req.url))
  }
}
