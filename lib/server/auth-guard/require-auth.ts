import { redirect } from "next/navigation"
import { getSession } from "./session"

export async function requireAuth(redirectTo = "/login") {
  const session = await getSession()

  if (!session?.user?.id) {
    redirect(redirectTo)
  }

  return session
}
