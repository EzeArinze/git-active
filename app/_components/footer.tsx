import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 w-full border-t border-border/40 py-12 flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground">
        <Link className="transition-colors hover:text-foreground" href="/#product">
          Product
        </Link>
        <span className="bg-border h-1 w-1 rounded-full"></span>
        <a className="transition-colors hover:text-foreground" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="bg-border h-1 w-1 rounded-full"></span>
        <Link className="transition-colors hover:text-foreground" href="/#privacy">
          Privacy
        </Link>
        <span className="bg-border h-1 w-1 rounded-full"></span>
        <Link className="transition-colors hover:text-foreground" href="/#contact">
          Contact
        </Link>
      </div>
      <div className="opacity-80 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Git Active. Built for open source communities.
      </div>
    </footer>
  );
}
