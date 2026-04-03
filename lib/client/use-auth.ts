"use client"
import { useRouter } from "next/navigation"
import { authClient } from "../auth-client"
import { useCallback } from "react"

export function useAuth() {
  const router = useRouter()
  const { data: session, isPending, error} = authClient.useSession()

  const user = session?.user

  const data = user
    ? {
        name: user.name,
        email: user.email,
        image: user.image,
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
    isLoading: isPending,
    signOut
  }
}
