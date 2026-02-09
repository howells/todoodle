# Todoodle - Architecture Plan

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| Components | shadcn/ui (new-york style, Radix) | latest |
| State / Persistence | Zustand + persist middleware | 5.x |
| Validation | Zod | 3.x |
| Icons | Lucide React + emoji | latest |
| Deployment | Vercel | — |

## Data Model

```typescript
// === Core Types ===

type DogId = string        // nanoid
type TaskId = string       // nanoid
type CompletionId = string // nanoid

interface Dog {
  id: DogId
  name: string
  breed: string
  weight: number | null        // in lbs
  birthday: string | null      // ISO date
  avatarEmoji: string          // emoji avatar (e.g. "🐕", "🦮", "🐩")
  allergies: string[]
  vetName: string | null
  vetPhone: string | null
  microchipId: string | null
  notes: string
  isArchived: boolean          // soft-delete for dogs that pass away
  createdAt: string            // ISO datetime
}

type TaskCategory =
  | 'health'        // Health & Vet
  | 'medications'   // Medications
  | 'grooming'      // Grooming
  | 'walks'         // Walks & Exercise
  | 'feeding'       // Feeding
  | 'training'      // Training
  | 'supplies'      // Supplies & Errands

type RecurrencePattern =
  | { type: 'once' }
  | { type: 'daily' }
  | { type: 'weekly'; days: number[] }          // required: 0=Sun, 6=Sat
  | { type: 'monthly'; dayOfMonth: number }     // required: 1-31
  | { type: 'custom'; intervalDays: number }

type TaskAssignment = { type: 'all' } | { type: 'specific'; dogIds: DogId[] }

interface Task {
  id: TaskId
  title: string
  description: string
  category: TaskCategory
  assignment: TaskAssignment
  recurrence: RecurrencePattern
  nextDueDate: string | null   // ISO date, null = no due date
  priority: 'low' | 'medium' | 'high'
  isArchived: boolean          // soft-delete
  createdAt: string
  updatedAt: string
}

// A single completion record per task check-off.
// For "all dogs" tasks, one completion covers all dogs.
// For specific-dog tasks, one completion per dog when checked off individually.
interface TaskCompletion {
  id: CompletionId
  taskId: TaskId
  completedAt: string          // ISO datetime
  notes: string
}
```

## Store Schema Versioning

The persist middleware supports migrations. We track a version number to handle future data model changes.

```typescript
const STORE_VERSION = 1

// Example future migration:
// version 1 -> 2: Added `reminderTime` field to Task
// { version: 2, migrate: (state) => { state.tasks.forEach(t => t.reminderTime = null) } }
```

## Zustand Store Structure

```typescript
interface TodoodleStore {
  // --- Schema ---
  _version: number

  // --- Dogs ---
  dogs: Dog[]
  addDog: (dog: Omit<Dog, 'id' | 'createdAt' | 'isArchived'>) => DogId
  updateDog: (id: DogId, updates: Partial<Dog>) => void
  archiveDog: (id: DogId) => void
  restoreDog: (id: DogId) => void

  // --- Tasks ---
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => TaskId
  updateTask: (id: TaskId, updates: Partial<Task>) => void
  archiveTask: (id: TaskId) => void
  restoreTask: (id: TaskId) => void
  completeTask: (taskId: TaskId, notes?: string) => void

  // --- Completions (Activity Log) ---
  completions: TaskCompletion[]
}
```

**Dog filter state lives in URL search params (`?dog=all` or `?dog=<id>`), not in Zustand.** This enables bookmarkable filtered views and natural browser back/forward behavior.

## Derived State Hooks

Instead of bloating the store, derived queries live in custom hooks using Zustand selectors:

```typescript
// hooks/use-tasks.ts
function useOverdueTasks(dogFilter?: DogId | 'all'): Task[]
function useTodayTasks(dogFilter?: DogId | 'all'): Task[]
function useUpcomingTasks(days: number, dogFilter?: DogId | 'all'): Task[]
function useTasksByCategory(category: TaskCategory): Task[]
function useLastCompletion(taskId: TaskId): TaskCompletion | null
```

## Recurrence Engine

Located in `lib/recurrence.ts`. Core function:

```typescript
/**
 * Given a recurrence pattern and the current due date, calculate the next due date.
 *
 * Rules:
 * - 'once': returns null (no next date)
 * - 'daily': next calendar day
 * - 'weekly': next occurrence of the specified days
 * - 'monthly': same day of month, clamped (31st -> 28th in Feb)
 * - 'custom': current due date + intervalDays
 *
 * Next due date is always calculated from the ORIGINAL due date, not the
 * completion date. This prevents schedule drift (completing late shouldn't
 * push everything back).
 */
function calculateNextDueDate(
  pattern: RecurrencePattern,
  currentDueDate: string  // ISO date
): string | null
```

## Validation Strategy

Forms validate with Zod schemas before calling store actions. Store actions trust their inputs (no double-validation).

```typescript
// lib/schemas.ts
const dogSchema = z.object({
  name: z.string().min(1, "Every pup needs a name!"),
  breed: z.string(),
  weight: z.number().positive().nullable(),
  // ...
})

const taskSchema = z.object({
  title: z.string().min(1, "What's the task?"),
  category: z.enum(['health', 'medications', ...]),
  // ...
})
```

## Folder Structure

```
todoodle/
├── app/
│   ├── layout.tsx              # Root layout, fonts, providers
│   ├── page.tsx                # Dashboard (today's tasks, overdue, upcoming)
│   ├── dogs/
│   │   ├── page.tsx            # Dog profiles list
│   │   └── [id]/
│   │       ├── page.tsx        # Single dog profile + their tasks
│   │       └── edit/
│   │           └── page.tsx    # Edit dog form
│   ├── tasks/
│   │   ├── page.tsx            # All tasks view with filters
│   │   ├── new/
│   │   │   └── page.tsx        # Create new task
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx    # Edit existing task
│   ├── history/
│   │   └── page.tsx            # Activity log / completion timeline
│   └── globals.css             # Tailwind + shadcn CSS variables
├── components/
│   ├── ui/                     # shadcn/ui components (button, card, dialog, etc.)
│   ├── layout/
│   │   ├── sidebar.tsx         # Main navigation sidebar
│   │   ├── header.tsx          # Top bar with dog filter + add task
│   │   └── mobile-nav.tsx      # Bottom nav for mobile
│   ├── dogs/
│   │   ├── dog-card.tsx        # Dog profile card
│   │   ├── dog-form.tsx        # Add/edit dog form
│   │   └── dog-switcher.tsx    # Quick-switch between dogs (reads URL params)
│   ├── tasks/
│   │   ├── task-card.tsx       # Single task display
│   │   ├── task-form.tsx       # Add/edit task form
│   │   ├── task-list.tsx       # Filtered task list
│   │   └── category-badge.tsx  # Category pill/badge
│   ├── history/
│   │   └── timeline.tsx        # Completion timeline view
│   └── shared/
│       ├── empty-state.tsx     # Fun empty states with dog messages
│       ├── page-header.tsx     # Consistent page headers
│       └── confirm-dialog.tsx  # Reusable confirmation dialog
├── lib/
│   ├── store.ts                # Zustand store definition + persist config
│   ├── recurrence.ts           # Next-due-date calculation engine
│   ├── schemas.ts              # Zod validation schemas
│   ├── utils.ts                # cn() + general utilities
│   ├── constants.ts            # Categories, priorities, colors, emoji options
│   └── dates.ts                # Date formatting helpers (display only)
├── hooks/
│   ├── use-tasks.ts            # Derived task queries (overdue, due today, etc.)
│   ├── use-dog-filter.ts       # Read/write dog filter from URL search params
│   └── use-notifications.ts    # Browser notification permission + scheduling
├── types/
│   └── index.ts                # All TypeScript types
└── public/
    └── favicon.ico
```

## Page Breakdown

### Dashboard (`/`)
The main screen. Shows:
- **Overdue** tasks (red, top priority)
- **Due Today** tasks
- **Upcoming** (next 7 days)
- Dog filter tabs at the top (All Dogs | Biscuit | Luna | ...) — driven by URL `?dog=` param
- Quick-add task button (floating or in header)

### Dogs (`/dogs`)
Grid of dog profile cards. Each card shows:
- Emoji avatar, name, breed
- Quick stats: X tasks today, Y overdue
- Click to view full profile

### Dog Profile (`/dogs/[id]`)
Full profile for one dog:
- All details (name, breed, weight, birthday, allergies, vet info)
- Edit button -> `/dogs/[id]/edit`
- Their assigned tasks
- Their recent activity/completions

### All Tasks (`/tasks`)
Filterable list of all tasks:
- Filter by: category, dog, recurrence type
- Sort by: due date, priority, category

### Create Task (`/tasks/new`)
Form to create a new task:
- Title, description, category selector
- Dog assignment (multi-select or "all dogs")
- Recurrence pattern picker
- Due date, priority

### Edit Task (`/tasks/[id]/edit`)
Same form, pre-filled with existing task data.

### Activity Log (`/history`)
Timeline of completed tasks:
- Filter by dog, category, date range
- "Last time" quick-answers per task type

## Navigation

**Desktop:** Left sidebar with:
- Dashboard (home icon)
- Dogs (paw emoji)
- Tasks (checklist icon)
- History (clock icon)

**Mobile:** Bottom tab bar with the same 4 items.

## Theming

### Color Palette (CSS Variables)
```
--primary:       warm orange (#F97316 range)    — energetic, playful
--secondary:     soft teal (#14B8A6 range)      — calm, trustworthy
--background:    warm cream (#FFFBF5 range)     — cozy, inviting
--foreground:    warm charcoal (#1C1917 range)   — readable, soft
--destructive:   soft red (#EF4444 range)        — for overdue/delete
--muted:         warm gray (#A8A29E range)       — secondary text
--accent:        golden yellow (#EAB308 range)   — highlights, badges
```

### Category Colors
```
health:      blue      (#3B82F6)
medications: purple    (#8B5CF6)
grooming:    pink      (#EC4899)
walks:       green     (#22C55E)
feeding:     orange    (#F97316)
training:    teal      (#14B8A6)
supplies:    amber     (#F59E0B)
```

## Key Architecture Decisions

### Why App Router pages (not a SPA)?
Even though the data is local, using Next.js file-based routing gives us:
- URL-based navigation (bookmark `/dogs/biscuit-123`)
- Built-in code splitting per page
- Clean separation of concerns
- Easy to add SSR/API routes later when we add cloud sync

### Why Zustand over React Context?
- Built-in persist middleware (one line to enable localStorage)
- No provider wrapper needed
- Selectors prevent unnecessary re-renders
- Simpler API for derived state

### Why not a database (Dexie/IndexedDB)?
- For V1, we'll have at most ~5 dogs and ~100 active tasks
- localStorage handles this trivially (~5KB of data)
- Zustand persist serializes/deserializes automatically
- If we outgrow this, swapping to IndexedDB is a storage adapter change

### Why filter state in URL, not Zustand?
- Bookmarkable: `/dogs?dog=biscuit-123` works on refresh
- Browser back/forward naturally navigates filter changes
- Prepares for future sharing (household mode)
- One fewer thing in the global store

### Client Components Strategy
- All interactive components will be `'use client'`
- Page components can be server components that import client components
- The Zustand store is inherently client-side
- Layout and static chrome can stay as server components

### Emoji Avatars Instead of Photos (V1)
- No base64 bloat in localStorage
- Instant setup (pick an emoji, done)
- Fun and on-brand for the playful personality
- Photos can be added in V2 with proper storage

### Single Completion Model
- Completing a task creates one `TaskCompletion` record
- For "all dogs" tasks (like buying supplies), one check-off covers everyone
- Simpler UI, simpler data, matches user mental model

## Implementation Phases

### Phase 1: Foundation + Type System
1. Scaffold Next.js + Tailwind + shadcn/ui
2. Define TypeScript types and Zod schemas
3. Set up Zustand store with persist + versioning
4. Create constants (categories, colors, emoji options)
5. Build layout shell (sidebar, header, mobile nav)
6. Create dashboard page with empty state

### Phase 2: Dogs
7. Dog form component (add/edit) with emoji picker
8. Dog card component
9. Dogs list page (`/dogs`)
10. Dog profile detail page (`/dogs/[id]`)
11. Dog edit page (`/dogs/[id]/edit`)

### Phase 3: Tasks Core
12. Recurrence calculation engine (`lib/recurrence.ts`)
13. Task form component with category + recurrence picker
14. Task card component
15. Create task page (`/tasks/new`)
16. Task list page (`/tasks`) with filtering
17. Edit task page (`/tasks/[id]/edit`)
18. Complete task action with next-due-date calculation

### Phase 4: Dashboard + Filtering
19. Derived state hooks (overdue, today, upcoming)
20. Dog filter via URL search params (`use-dog-filter` hook)
21. Dog switcher component in header
22. Dashboard assembly with real data sections
23. Task completion celebration feedback

### Phase 5: History + Polish
24. Activity log / completion timeline
25. "Last time" queries per task type
26. Browser notifications (permission flow + scheduling)
27. Empty states with dog personality messages
28. Responsive polish + mobile nav
29. Fun micro-interactions (check-off animation, paw stamps)
