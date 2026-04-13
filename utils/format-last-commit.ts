export function formatLastCommit(date: string | null) {
  if (!date) return "No commits yet"

  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "Last commit: today"
  if (days === 1) return "Last commit: yesterday"
  if (days < 7) return `Last commit: ${days} days ago`
  if (days < 30) return `Last commit: ${Math.floor(days / 7)} weeks ago`

  return `Last commit: ${Math.floor(days / 30)} months ago`
}
