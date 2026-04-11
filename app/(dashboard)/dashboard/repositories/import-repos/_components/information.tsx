import { GitBranch, Shield, Sparkles } from "lucide-react"

function InformationComponent() {
  return (
    <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
      <div className="space-y-2">
        <Shield className="text-orange-500" />
        <h3 className="font-medium">Secure Access</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          Git uses read-only access to analyze code patterns without modifying
          your sources.
        </p>
      </div>

      <div className="space-y-2">
        <Sparkles className="text-orange-500" />
        <h3 className="font-medium">Auto-Discovery</h3>
        <p className="text-sm text-muted-foreground">
          Newly created repositories can be automatically imported based on your
          naming conventions.
        </p>
      </div>

      <div className="space-y-2">
        <GitBranch className="text-orange-500" />
        <h3 className="font-medium">Smart Mapping</h3>
        <p className="text-sm text-muted-foreground">
          Repositories are automatically grouped by language and team for better
          navigation.
        </p>
      </div>
    </div>
  )
}

export default InformationComponent
