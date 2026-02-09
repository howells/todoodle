import { z } from "zod/v4"

export const dogSchema = z.object({
  name: z.string().min(1, "Every pup needs a name!"),
  breed: z.string(),
  weight: z.number().positive("Weight must be positive").nullable(),
  birthday: z.string().nullable(),
  avatarEmoji: z.string().min(1),
  allergies: z.array(z.string()),
  vetName: z.string().nullable(),
  vetPhone: z.string().nullable(),
  microchipId: z.string().nullable(),
  notes: z.string(),
})

export type DogFormData = z.infer<typeof dogSchema>

const recurrenceSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("once") }),
  z.object({ type: z.literal("daily") }),
  z.object({
    type: z.literal("weekly"),
    days: z.array(z.number().min(0).max(6)).min(1, "Pick at least one day"),
  }),
  z.object({
    type: z.literal("monthly"),
    dayOfMonth: z.number().min(1).max(31),
  }),
  z.object({
    type: z.literal("custom"),
    intervalDays: z.number().min(1, "Interval must be at least 1 day"),
  }),
])

const taskAssignmentSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("all") }),
  z.object({
    type: z.literal("specific"),
    dogIds: z.array(z.string()).min(1, "Assign to at least one pup"),
  }),
])

export const taskSchema = z.object({
  title: z.string().min(1, "What's the task?"),
  description: z.string(),
  category: z.enum([
    "health",
    "medications",
    "grooming",
    "walks",
    "feeding",
    "training",
    "supplies",
  ]),
  assignment: taskAssignmentSchema,
  recurrence: recurrenceSchema,
  nextDueDate: z.string().nullable(),
  priority: z.enum(["low", "medium", "high"]),
})

export type TaskFormData = z.infer<typeof taskSchema>
