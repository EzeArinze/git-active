export function getActor(user?: { login?: string | null; type?: string }) {
  if (!user) return "unknown"

  if (user.type === "Bot") return "bot"

  return user.login ?? "unknown"
}

export function getActorFromCommit(author: {
  name?: string | null
  email?: string | null
}) {
  if (!author) return "unknown"

  if (author.email?.includes("[bot]")) return "bot"

  return author.name ?? "unknown"
}
