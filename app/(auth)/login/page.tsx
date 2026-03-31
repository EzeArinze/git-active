import Logo from "@/components/logo"

function LoginRoute() {
  return (
    <main className="flex min-h-[calc(100vh-60px)] items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <div className="mb-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>

          <h1 className="mb-2 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            GitActive
          </h1>
          <p className="mx-auto max-w-[320px] text-center text-lg leading-relaxed text-muted-foreground">
            Understand what matters across your repositories
          </p>
        </div>

        <div className="border-outline/60 w-97.5 space-y-2 rounded-xl border bg-white p-6 text-center shadow-sm">
          <form method="post" action="?/signInSocial">
            <input type="hidden" name="provider" value="github" />
            <input type="hidden" name="callbackURL" value="/user" />
            <button className="w-full rounded-md bg-primary px-4 py-3 text-white transition hover:bg-primary/70">
              Continue with GitHub
            </button>
          </form>
          <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
            By continuing, you agree to Sahara’s Terms of Service and Privacy
            Policy. We only request read access to your public and private
            repository metadata.
          </p>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 text-sm font-medium text-primary">
            <a className="transition-colors hover:text-primary/90" href="/#">
              Documentation
            </a>
            <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
            <a className="transition-colors hover:text-primary/90" href="/#">
              Support
            </a>
            <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
            <a className="transition-colors hover:text-primary/90" href="/#">
              Security
            </a>
          </div>
        </footer>

        <div className="via-outline-variant/30 fixed top-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent"></div>
        <div className="via-outline-variant/30 h-1px fixed bottom-0 left-0 w-full bg-linear-to-r from-transparent to-transparent"></div>
      </section>
    </main>
  )
}

export default LoginRoute
