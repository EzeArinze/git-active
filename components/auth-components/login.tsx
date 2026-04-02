"use client"

import { useTransition } from "react"
import Logo from "../logo"
import { Loader } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
// import { Button } from "../ui/button"

type auth_provider = "github" | "google"

function Login() {
  const [loggingIn, startLoggingIn] = useTransition()

  function handleLogin(method: auth_provider) {
    startLoggingIn(async () => {
      authClient.signIn.social({
        provider: method,
        callbackURL: "/",
      })
    })
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mb-4 text-center">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          GitActive
        </h1>
        <p className="mx-auto max-w-[320px] text-center text-lg leading-relaxed text-muted-foreground">
          Understand what matters across your repositories
        </p>
      </div>

      <div className="border-outline/60 w-full max-w-[390px] space-y-2 rounded-xl border bg-background p-6 text-center shadow-sm">
        <button
          disabled={loggingIn}
          onClick={() => handleLogin("github")}
          className="w-full rounded-md bg-primary px-4 py-3 text-primary-foreground transition hover:bg-primary/70"
        >
          {loggingIn ? (
            <div className="flex items-center gap-2 cursor-not-allowed px-4 py-3">
              <Loader className="size-4 animate-spin" />
              Signing in...
            </div>
          ) : (
            <span className="px-4 py-3">
              Continue with GitHub
            </span>
          )}
        </button>

        <p className="text-on-surface-variant text-xs leading-relaxed font-medium text-muted-foreground">
          By continuing, you agree to Sahara’s Terms of Service and Privacy
          Policy. We only request read access to your public and private
          repository metadata.
        </p>
      </div>

      <footer className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-8 text-sm font-medium text-primary">
          <Link className="transition-colors hover:text-primary/90" href="/#">
            Documentation
          </Link>
          <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
          <Link className="transition-colors hover:text-primary/90" href="/#">
            Support
          </Link>
          <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
          <Link className="transition-colors hover:text-primary/90" href="/#">
            Security
          </Link>
        </div>
      </footer>

      <div className="via-outline-variant/30 fixed top-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent"></div>
      <div className="via-outline-variant/30 h-1px fixed bottom-0 left-0 w-full bg-linear-to-r from-transparent to-transparent"></div>
    </section>
  )
}

export default Login
