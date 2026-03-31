import { redirect } from "next/navigation"
import { getSession } from "./session"

export async function redirectIfAuthenticated(redirectTo = "/") {
  const session = await getSession()

  if (session?.user?.id) {
    redirect(redirectTo)
  }

  return session
}
