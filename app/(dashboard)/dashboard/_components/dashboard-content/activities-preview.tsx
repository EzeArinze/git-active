function ActivitiesPreview() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Golden Synthesis */}
      <div className="rounded-xl border bg-background p-6 md:col-span-2">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-orange-500">
          GOLDEN SYNTHESIS
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="font-medium">
                payment-service has unusual activity
              </p>
              <span className="text-xs text-orange-500/70">
                +12 commits in the last 4 hours
              </span>
            </div>

            <div>
              <p className="font-medium">PR #42 waiting for review</p>
              <span className="text-xs text-muted-foreground">
                Idle for 3 days · Needs attention
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium">landing-page inactive</p>
              <span className="text-xs text-muted-foreground">
                No activity for 6 days · Consider archiving?
              </span>
            </div>

            <div>
              <p className="font-medium">Overall Velocity increased</p>
              <span className="text-xs text-muted-foreground">
                15% higher than last week’s average
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">COMMITS TODAY</p>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">142</h2>
            <span className="text-xs text-red-500">+12%</span>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">OPEN PRS</p>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">24</h2>
            <span className="text-xs text-red-500">+2 new</span>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">ACTIVE CONTRIBUTORS</p>
          <h2 className="text-2xl font-semibold">8</h2>
          <span className="text-xs text-muted-foreground">of 12 total</span>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesPreview
