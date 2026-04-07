"use client"
import { useRouter } from "next/navigation"
import { authClient, useSession } from "../auth-client"
import { useCallback } from "react"

export function useAuth() {
  const router = useRouter()
  const { data: session, isPending, isRefetching, error } = useSession()

  const isLoading = isPending && !isRefetching

  const user = session?.user
  const initials = user ? user.name.slice(0, 2).toLocaleUpperCase() : "?"

  const data = user
    ? {
        name: user.name,
        email: user.email,
        image: user.image,
        initials,
        user,
      }
    : null

  const signOut = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }, [router])

  return {
    user: data,
    error,
    isLoading,
    signOut,
  }
}
