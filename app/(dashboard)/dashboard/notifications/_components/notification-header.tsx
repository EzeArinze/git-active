function NotificationHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold">Intelligence Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          Stay informed on critical repository states, peer reviews, and
          performance anomalies across your workspace.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex rounded-md border p-1 text-sm">
        <button className="rounded bg-muted px-3 py-1">Real-time</button>
        <button className="px-3 py-1 text-muted-foreground">
          Daily Digest
        </button>
      </div>
    </div>
  )
}

export default NotificationHeader
