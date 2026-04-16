import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import ConnectGithubActionButton from "./_components/connect-github-action-button"
import { IconBrandGithub } from "@tabler/icons-react"

export default async function OnboardingRoutePage() {
  const { user } = await requireAuth()
  return (
    <section className="flex flex-1 flex-col gap-8 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome, <span className="text-orange-600/70">{user.name}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Let’s get your workspace connected and start analyzing your
            repositories.
          </p>
        </div>

        <ConnectGithubActionButton className="hidden sm:flex" />
      </div>

      <div className="mx-auto mt-10 w-full max-w-3xl rounded-xl border bg-muted/30 p-8 shadow-sm transition-colors duration-400 hover:border-orange-500/50 sm:p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
            <IconBrandGithub className="h-6 w-6 text-orange-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Connect your GitHub account
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Import your repositories to start tracking commits, pull requests,
              and contributor activity. We’ll turn your GitHub data into
              actionable insights.
            </p>
          </div>

          <ConnectGithubActionButton className="bg-orange-600 px-6 py-4 text-white hover:bg-orange-700" />

          <p className="text-xs text-muted-foreground">
            You’ll be able to choose which repositories to monitor after
            connecting.
          </p>
        </div>
      </div>
    </section>
  )
}
