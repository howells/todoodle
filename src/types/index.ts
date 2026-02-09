// === ID Types ===

export type DogId = string
export type TaskId = string
export type CompletionId = string

// === Dog ===

export interface Dog {
  id: DogId
  name: string
  breed: string
  weight: number | null
  birthday: string | null // ISO date (YYYY-MM-DD)
  avatarEmoji: string
  allergies: string[]
  vetName: string | null
  vetPhone: string | null
  microchipId: string | null
  notes: string
  isArchived: boolean
  createdAt: string // ISO datetime
}

// === Task Category ===

export type TaskCategory =
  | "health"
  | "medications"
  | "grooming"
  | "walks"
  | "feeding"
  | "training"
  | "supplies"

// === Recurrence ===

export type RecurrencePattern =
  | { type: "once" }
  | { type: "daily" }
  | { type: "weekly"; days: number[] } // 0=Sun, 6=Sat
  | { type: "monthly"; dayOfMonth: number } // 1-31
  | { type: "custom"; intervalDays: number }

// === Task Assignment ===

export type TaskAssignment =
  | { type: "all" }
  | { type: "specific"; dogIds: DogId[] }

// === Task ===

export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: TaskId
  title: string
  description: string
  category: TaskCategory
  assignment: TaskAssignment
  recurrence: RecurrencePattern
  nextDueDate: string | null // ISO date (YYYY-MM-DD)
  priority: TaskPriority
  isArchived: boolean
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
}

// === Task Completion ===

export interface TaskCompletion {
  id: CompletionId
  taskId: TaskId
  completedAt: string // ISO datetime
  notes: string
}
