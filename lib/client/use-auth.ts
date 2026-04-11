import { redirect } from "next/navigation"
import { authClient, getSession } from "../auth-client"

export function authSession() {
  const { data: session, isPending } = authClient.useSession()

  const user = session?.user

  const initials = user?.name.slice(0, 2).toUpperCase() || "CV"

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/"
        },
      },
    })
  }

  return {
    user: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image ?? `https://avatar.vercel.sh/${user?.email}`,
      initials,
    },
    session,
    isPending,
    isAuthenticated: !!session,
    signOut,
  }
}

export async function getAuthSession() {
  const { data, error } = await getSession()

  const user = data?.user
  const session = data?.session

  const initials = user ? user.name.slice(0, 2).toLocaleUpperCase() : "?"

  if (!user || !session) {
    redirect("/login")
  }

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"
        },
      },
    })
  }

  return {
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      initials,
    },
    session,
    error,
    signOut,
  }
}

export type authSessionType = Awaited<ReturnType<typeof authSession>>
export type getSessionType = Awaited<ReturnType<typeof getAuthSession>>
