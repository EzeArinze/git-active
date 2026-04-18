export function logIfMissing(label: string, data: unknown) {
  if (!data) {
    console.warn(`[Webhook Warning] Missing ${label}`)
  }
}
