import { Suspense } from "react"
import Repos from "./_components/repos"
import ReposPageHeader from "./_components/repos-page-header"

function ReposPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ReposPageHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Repos />
      </Suspense>

      <div className="flex flex-col gap-3 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span>● System Status: Optimal</span>
          <span>14.2 GB Used</span>
        </div>

        <div className="flex gap-4">
          <span>DOCUMENTATION</span>
          <span>API KEYS</span>
          <span>SUPPORT</span>
        </div>
      </div>
    </div>
  )
}

export default ReposPageRoute
