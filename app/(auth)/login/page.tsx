import Login from "@/app/(auth)/_components/login"
import { redirectIfAuthenticated } from "@/lib/server/auth-guard/redirect-if-authenticated"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

async function LoginRoute() {
  await redirectIfAuthenticated()

  return (
    <>
      <div className="absolute top-6 left-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" />
          Back
        </Link>
      </div>
      <main className="flex min-h-screen px-4 items-center justify-center">
        <Login />
      </main>
    </>
  )
}

export default LoginRoute
