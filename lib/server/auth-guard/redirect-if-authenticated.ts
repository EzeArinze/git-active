import { redirect } from "next/navigation"
import { getServerSession } from "./session"

export async function redirectIfAuthenticated(redirectTo = "/") {
  const session = await getServerSession()

  if (session?.user?.id) {
    redirect(redirectTo)
  }

  return session
}
