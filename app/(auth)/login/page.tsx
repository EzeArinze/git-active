import Login from "@/components/auth-components/login"
import { redirectIfAuthenticated } from "@/lib/server/auth-guard/redirect-if-authenticated"

async function LoginRoute() {
  await redirectIfAuthenticated()

  return (
    <main className="flex min-h-[calc(100vh-60px)] items-center justify-center">
      <Login />
    </main>
  )
}

export default LoginRoute
