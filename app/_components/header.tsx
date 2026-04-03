"use client"

import { useAuth } from "@/lib/client/use-auth"
import Logo from "../../components/logo"
import { Button } from "../../components/ui/button"
import { LogOut } from "lucide-react"
import { Activity } from "react"
import Link from "next/link"

function Header() {
  const { signOut,user,isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 mb-4 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Logo />

          <span className="font-serif text-xl tracking-tight text-foreground">
            {" "}
            GitActive{" "}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-secondary/50 px-2.5 py-1.5 rounded-md border border-border/50 select-none">
            Press <kbd className="px-1.5 py-0.5 rounded-sm bg-background border border-border shadow-sm font-mono text-[10px] text-foreground">D</kbd> to toggle theme
          </div>

          <Activity mode={isLoading ? "visible" : "hidden"}>
            <p className="rounded-md border border-border bg-secondary px-4 py-2 text-foreground transition hover:bg-secondary/70">
              Loading...
            </p>
          </Activity>

          <Activity mode={!user?.user.id && !isLoading ? "visible" : "hidden"}>
            <Link
            href={"/login"}
            className={
              "rounded-md border border-border bg-secondary px-4 py-1.5 text-foreground transition hover:bg-secondary/70"
            }
          >
            Login
          </Link>
          </Activity>

          <Activity mode={user?.user.id && !isLoading ? "visible" : "hidden"}>
            <Button
            onClick={signOut}
            variant={"outline"}
            size={"icon-sm"}
            className={
              "rounded-md border border-border bg-secondary px-4 py-2 text-foreground transition hover:bg-secondary/70"
            }
          >
            <LogOut className="size-4" />
          </Button>
          </Activity>
        </div>
      </div>
    </header>
  )
}

export default Header
