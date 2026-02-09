/**
 * Date formatting and comparison helpers.
 * All inputs are ISO date strings (YYYY-MM-DD).
 */

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

function toDate(iso: string): Date {
  return new Date(iso + "T00:00:00")
}

function diffDays(isoA: string, isoB: string): number {
  const a = toDate(isoA)
  const b = toDate(isoB)
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24))
}

// === Display Formatting ===

export function formatDate(iso: string): string {
  const d = toDate(iso)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatRelativeDate(iso: string): string {
  const today = todayStr()
  const diff = diffDays(iso, today)

  if (diff === 0) return "Today"
  if (diff === 1) return "Tomorrow"
  if (diff === -1) return "Yesterday"
  if (diff > 1 && diff <= 7) return `In ${diff} days`
  if (diff < -1 && diff >= -7) return `${Math.abs(diff)} days ago`

  return formatDate(iso)
}

// === Boolean Checks ===

export function isOverdue(iso: string): boolean {
  return iso < todayStr()
}

export function isToday(iso: string): boolean {
  return iso === todayStr()
}

export function isUpcoming(iso: string, withinDays: number): boolean {
  const today = todayStr()
  const diff = diffDays(iso, today)
  return diff > 0 && diff <= withinDays
}

// === Formatting for datetime strings ===

export function formatDateTime(isoDatetime: string): string {
  const d = new Date(isoDatetime)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
