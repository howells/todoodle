import type { Dog, Task } from "@/types"

function daysFromNow(offset: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().split("T")[0]
}

const now = new Date().toISOString()

// Fixed IDs so tasks can reference dogs
const BISCUIT_ID = "seed-dog-biscuit"
const LUNA_ID = "seed-dog-luna"

export const SEED_DOGS: Dog[] = [
  {
    id: BISCUIT_ID,
    name: "Biscuit",
    breed: "Golden Retriever",
    weight: 65,
    birthday: "2021-03-15",
    avatarEmoji: "🐕",
    allergies: ["Chicken"],
    vetName: "Dr. Patel",
    vetPhone: "(555) 123-4567",
    microchipId: null,
    notes: "",
    isArchived: false,
    createdAt: now,
  },
  {
    id: LUNA_ID,
    name: "Luna",
    breed: "Border Collie",
    weight: 42,
    birthday: "2022-08-02",
    avatarEmoji: "🐾",
    allergies: [],
    vetName: "Dr. Patel",
    vetPhone: "(555) 123-4567",
    microchipId: null,
    notes: "",
    isArchived: false,
    createdAt: now,
  },
]

export const SEED_TASKS: Task[] = [
  {
    id: "seed-task-1",
    title: "Morning walk",
    description: "30 min around the park loop",
    category: "walks",
    assignment: { type: "all" },
    recurrence: { type: "daily" },
    nextDueDate: daysFromNow(0),
    priority: "high",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-task-2",
    title: "Flea & tick treatment",
    description: "Apply topical treatment — check weight for dosage",
    category: "medications",
    assignment: { type: "all" },
    recurrence: { type: "monthly", dayOfMonth: 15 },
    nextDueDate: daysFromNow(-1),
    priority: "high",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-task-3",
    title: "Brush teeth",
    description: "",
    category: "grooming",
    assignment: { type: "specific", dogIds: [BISCUIT_ID] },
    recurrence: { type: "daily" },
    nextDueDate: daysFromNow(0),
    priority: "medium",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-task-4",
    title: "Vet checkup",
    description: "Annual wellness exam and vaccinations",
    category: "health",
    assignment: { type: "specific", dogIds: [LUNA_ID] },
    recurrence: { type: "once" },
    nextDueDate: daysFromNow(5),
    priority: "medium",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-task-5",
    title: "Order dog food",
    description: "Salmon & sweet potato formula, 30lb bag",
    category: "supplies",
    assignment: { type: "all" },
    recurrence: { type: "monthly", dayOfMonth: 1 },
    nextDueDate: daysFromNow(12),
    priority: "low",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-task-6",
    title: "Practice recall training",
    description: "15 min sessions in the backyard",
    category: "training",
    assignment: { type: "specific", dogIds: [LUNA_ID] },
    recurrence: { type: "weekly", days: [1, 3, 5] },
    nextDueDate: daysFromNow(1),
    priority: "low",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  },
]
