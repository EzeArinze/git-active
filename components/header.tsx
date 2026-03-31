import Logo from "./logo"

function Header() {
  return (
    <header className="sticky top-0 z-50 mb-4 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <Logo />

          <span className="font-serif text-xl tracking-tight text-foreground">
            {" "}
            GitActivity{" "}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <p className="transition hover:text-foreground">toggle</p>

          <p className="rounded-md border border-border bg-secondary px-4 py-2 text-foreground transition hover:bg-secondary/70">
            user
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
