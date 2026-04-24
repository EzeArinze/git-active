"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function requireAccessToken({ userId }: { userId: string }) {
  const { accessToken } = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "github",
      userId,
    },
  })

  if (!accessToken) throw new Error("Access token not found")

  return accessToken
}
