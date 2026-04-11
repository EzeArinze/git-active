function NotificationHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Intelligence Alerts
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:mt-2">
          Stay informed on critical repository states, peer reviews, and
          performance anomalies across your workspace.
        </p>
      </div>
      {/* Toggle – wraps on small screens */}
      <div className="flex self-start rounded-md border p-1 text-sm sm:self-auto">
        <button className="rounded bg-muted px-3 py-1">Real-time</button>
        <button className="px-3 py-1 text-muted-foreground hover:bg-muted/50">
          Daily Digest
        </button>
      </div>
    </div>
  )
}
export default NotificationHeader
