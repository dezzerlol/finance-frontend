export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('UTC', { year: 'numeric', month: 'numeric', day: 'numeric' })
}
