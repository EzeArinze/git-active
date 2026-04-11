import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After")
        console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`)
      }
    },
  },
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchInterval: 30 * 60 * 1000,
  },
})

export const {
  signIn,
  signUp,
  useSession,
  getAccessToken,
  getSession,
  signOut,
} = createAuthClient()
