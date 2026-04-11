import React from "react"

function SettingsFooter() {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="max-w-md">
        <p className="font-medium">Need Help?</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Our intelligence specialist team is available 24/7 to help you
          configure your Sahara workspace.
        </p>
      </div>

      <div className="flex gap-6 text-sm text-orange-600">
        <button className="hover:underline">Documentation</button>
        <button className="hover:underline">Contact Support</button>
      </div>
    </div>
  )
}

export default SettingsFooter
