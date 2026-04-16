"use client"

import { Button } from "@/components/ui/button"
import { IconBrandGithub } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { envClient } from "@/env/client"

export default function ConnectGithubActionButton({
  className,
}: {
  className?: string
}) {
  const [isConnecting, startConnecting] = useTransition()

  const handleConnectGitHub = () => {
    startConnecting(() => {
      const state = encodeURIComponent("connect_github")

      window.location.href = `${envClient.NEXT_PUBLIC_GITHUB_INSTALLATION_HREF}?state=${state}`
    })
  }

  return (
    <Button
      onClick={handleConnectGitHub}
      disabled={isConnecting}
      className={cn("flex items-center gap-2", className)}
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <IconBrandGithub className="h-4 w-4" />
          Connect GitHub
        </>
      )}
    </Button>
  )
}
