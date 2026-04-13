export function formatSize(sizeInKB: number) {
  if (!sizeInKB) return "0 KB"

  const sizeInMB = sizeInKB / 1024

  if (sizeInMB < 1) return `${sizeInKB} KB`
  return `${sizeInMB.toFixed(1)}MB`
}
