import type { RecurrencePattern } from "@/types"

/**
 * Calculate the next due date for a recurring task.
 *
 * The next date is always calculated from the ORIGINAL due date,
 * not the completion date. This prevents schedule drift — completing
 * a task late won't push the entire schedule back.
 *
 * For patterns that can produce a next date in the past (e.g., weekly
 * when you're multiple weeks late), we keep advancing until the next
 * date is in the future.
 */
export function calculateNextDueDate(
  pattern: RecurrencePattern,
  currentDueDate: string
): string | null {
  switch (pattern.type) {
    case "once":
      return null

    case "daily":
      return advanceToFuture(currentDueDate, (d) => addDays(d, 1))

    case "weekly":
      return advanceWeekly(currentDueDate, pattern.days)

    case "monthly":
      return advanceMonthly(currentDueDate, pattern.dayOfMonth)

    case "custom":
      return advanceToFuture(currentDueDate, (d) =>
        addDays(d, pattern.intervalDays)
      )
  }
}

// === Helpers ===

function today(): string {
  return new Date().toISOString().split("T")[0]
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate + "T00:00:00")
  d.setDate(d.getDate() + days)
  return d.toISOString().split("T")[0]
}

/**
 * Keep advancing a date using the step function until it's
 * strictly after today.
 */
function advanceToFuture(
  startDate: string,
  step: (date: string) => string
): string {
  const todayStr = today()
  let next = step(startDate)
  // Safety: limit iterations to prevent infinite loops
  let iterations = 0
  while (next <= todayStr && iterations < 1000) {
    next = step(next)
    iterations++
  }
  return next
}

/**
 * Advance to the next occurrence of one of the specified weekdays.
 */
function advanceWeekly(currentDueDate: string, days: number[]): string {
  if (days.length === 0) return addDays(currentDueDate, 7)

  const sortedDays = [...days].sort((a, b) => a - b)
  const todayStr = today()
  let candidate = addDays(currentDueDate, 1)

  // Safety limit
  let iterations = 0
  while (iterations < 1000) {
    const d = new Date(candidate + "T00:00:00")
    const dayOfWeek = d.getDay()
    if (sortedDays.includes(dayOfWeek) && candidate > todayStr) {
      return candidate
    }
    candidate = addDays(candidate, 1)
    iterations++
  }

  return addDays(currentDueDate, 7)
}

/**
 * Advance to the next month with the specified day, clamping to
 * the last day of the month if needed (e.g., 31st -> 28th in Feb).
 */
function advanceMonthly(
  currentDueDate: string,
  dayOfMonth: number
): string {
  const todayStr = today()
  const d = new Date(currentDueDate + "T00:00:00")
  let month = d.getMonth()
  let year = d.getFullYear()

  // Safety limit
  let iterations = 0
  while (iterations < 1000) {
    month++
    if (month > 11) {
      month = 0
      year++
    }

    // Clamp day to last day of month
    const lastDay = new Date(year, month + 1, 0).getDate()
    const clampedDay = Math.min(dayOfMonth, lastDay)
    const candidate = `${year}-${String(month + 1).padStart(2, "0")}-${String(clampedDay).padStart(2, "0")}`

    if (candidate > todayStr) {
      return candidate
    }
    iterations++
  }

  return addDays(currentDueDate, 30)
}
