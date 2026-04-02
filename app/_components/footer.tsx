

export default function Footer() {
  return (
     <div className="mt-20 flex flex-col items-center gap-4 text-xs text-muted-foreground">
          <div className="flex gap-6 font-medium [&>a]:transition-colors hover:[&>a]:text-foreground">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
          <div className="opacity-80">
            &copy; 2024 Terra Intelligence. Built for open source communities.
          </div>
        </div>
  )
}
