import { Button } from "@/components/ui/button"
import { IconSparkles } from "@tabler/icons-react"
import React from "react"

function NotificationAds() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed p-10 text-center">
      <IconSparkles className="mb-4 size-8" />

      <h3 className="text-lg font-semibold">Refining your Intelligence</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Our model is analyzing your recent interactions to prioritize alerts
        that matter most to your workflow.
      </p>

      <Button className="mt-4" variant="outline">
        Configure AI Filters
      </Button>
    </div>
  )
}

export default NotificationAds
