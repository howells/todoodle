import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import type {
  Dog,
  DogId,
  Task,
  TaskId,
  TaskCompletion,
  TaskPriority,
  TaskCategory,
  TaskAssignment,
  RecurrencePattern,
} from "@/types"
import { calculateNextDueDate } from "./recurrence"
import { SEED_DOGS, SEED_TASKS } from "./seed-data"

const STORE_VERSION = 2

export interface TodoodleStore {
  _version: number

  // Dogs
  dogs: Dog[]
  addDog: (
    dog: Omit<Dog, "id" | "createdAt" | "isArchived">
  ) => DogId
  updateDog: (id: DogId, updates: Partial<Dog>) => void
  archiveDog: (id: DogId) => void
  restoreDog: (id: DogId) => void

  // Tasks
  tasks: Task[]
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "isArchived">
  ) => TaskId
  updateTask: (id: TaskId, updates: Partial<Task>) => void
  archiveTask: (id: TaskId) => void
  restoreTask: (id: TaskId) => void
  completeTask: (taskId: TaskId, notes?: string) => void

  // Completions
  completions: TaskCompletion[]
}

export const useStore = create<TodoodleStore>()(
  persist(
    (set, get) => ({
      _version: STORE_VERSION,

      // === Dogs ===
      dogs: SEED_DOGS,

      addDog: (dogData) => {
        const id = nanoid()
        const dog: Dog = {
          ...dogData,
          id,
          isArchived: false,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ dogs: [...state.dogs, dog] }))
        return id
      },

      updateDog: (id, updates) => {
        set((state) => ({
          dogs: state.dogs.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        }))
      },

      archiveDog: (id) => {
        set((state) => ({
          dogs: state.dogs.map((d) =>
            d.id === id ? { ...d, isArchived: true } : d
          ),
        }))
      },

      restoreDog: (id) => {
        set((state) => ({
          dogs: state.dogs.map((d) =>
            d.id === id ? { ...d, isArchived: false } : d
          ),
        }))
      },

      // === Tasks ===
      tasks: SEED_TASKS,

      addTask: (taskData) => {
        const id = nanoid()
        const now = new Date().toISOString()
        const task: Task = {
          ...taskData,
          id,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ tasks: [...state.tasks, task] }))
        return id
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      },

      archiveTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, isArchived: true, updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      },

      restoreTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, isArchived: false, updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      },

      completeTask: (taskId, notes = "") => {
        const task = get().tasks.find((t) => t.id === taskId)
        if (!task) return

        const completion: TaskCompletion = {
          id: nanoid(),
          taskId,
          completedAt: new Date().toISOString(),
          notes,
        }

        // Calculate next due date for recurring tasks
        const nextDueDate =
          task.nextDueDate && task.recurrence.type !== "once"
            ? calculateNextDueDate(task.recurrence, task.nextDueDate)
            : null

        // For one-off tasks, archive after completion
        const shouldArchive = task.recurrence.type === "once"

        set((state) => ({
          completions: [...state.completions, completion],
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  nextDueDate,
                  isArchived: shouldArchive ? true : t.isArchived,
                  updatedAt: new Date().toISOString(),
                }
              : t
          ),
        }))
      },

      // === Completions ===
      completions: [],
    }),
    {
      name: "todoodle-store",
      version: STORE_VERSION,
      migrate: () => ({} as TodoodleStore),
    }
  )
)
