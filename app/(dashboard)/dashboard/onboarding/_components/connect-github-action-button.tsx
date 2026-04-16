"use client"

import { Button } from "@/components/ui/button"
import { IconBrandGithub } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export default function ConnectGithubActionButton({
  className,
}: {
  className?: string
}) {
  return (
    <Button className={cn("flex items-center gap-2", className)}>
      <IconBrandGithub className="h-4 w-4" />
      Connect GitHub
    </Button>
  )
}
