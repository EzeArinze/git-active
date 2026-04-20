"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-12 flex w-full flex-col items-center gap-6 border-t border-border/40 py-12">
      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground md:gap-8">
        <Link
          className="transition-colors hover:text-foreground"
          href="/#product"
        >
          Product
        </Link>
        <span className="h-1 w-1 rounded-full bg-border"></span>
        <a
          className="transition-colors hover:text-foreground"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <span className="h-1 w-1 rounded-full bg-border"></span>
        <Link
          className="transition-colors hover:text-foreground"
          href="/#privacy"
        >
          Privacy
        </Link>
        <span className="h-1 w-1 rounded-full bg-border"></span>
        <Link
          className="transition-colors hover:text-foreground"
          href="/#contact"
        >
          Contact
        </Link>
      </div>
      <div className="text-xs text-muted-foreground opacity-80">
        &copy; {new Date().getFullYear()} Git Active. Built for open source
        communities.
      </div>
    </footer>
  )
}
