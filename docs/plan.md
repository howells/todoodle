# Todoodle - Implementation Plan

> Generated from architecture.md. Each task is a self-contained unit of work.

## Phase 1: Foundation + Type System

### Task 1.1: Scaffold Next.js project
- Run `create-next-app` with TypeScript, Tailwind CSS v4, App Router
- Initialize shadcn/ui (new-york style, Radix)
- Install: `zustand`, `zod`, `nanoid`, `lucide-react`
- Add shadcn components: `button`, `card`, `input`, `label`, `select`, `dialog`, `badge`, `separator`, `textarea`, `checkbox`, `tabs`
- Initialize git repo
- Verify `npm run dev` works

### Task 1.2: Define TypeScript types
- **File:** `types/index.ts`
- All types from architecture: `DogId`, `TaskId`, `CompletionId`, `Dog`, `TaskCategory`, `RecurrencePattern`, `TaskAssignment`, `Task`, `TaskCompletion`
- Export everything

### Task 1.3: Create constants
- **File:** `lib/constants.ts`
- `TASK_CATEGORIES`: array of `{ value, label, color, icon }` for each category
- `PRIORITIES`: array of `{ value, label }`
- `DOG_EMOJI_OPTIONS`: array of dog/animal emojis for the avatar picker
- `CATEGORY_COLORS`: map of category -> tailwind color classes

### Task 1.4: Create Zod validation schemas
- **File:** `lib/schemas.ts`
- `dogSchema`: validates Dog form input (name required, weight positive or null, etc.)
- `taskSchema`: validates Task form input (title required, valid category, valid recurrence, etc.)
- Dog-themed error messages ("Every pup needs a name!")

### Task 1.5: Set up Zustand store with persist
- **File:** `lib/store.ts`
- Full `TodoodleStore` interface from architecture
- All actions: `addDog`, `updateDog`, `archiveDog`, `restoreDog`, `addTask`, `updateTask`, `archiveTask`, `restoreTask`, `completeTask`
- Persist middleware with `localStorage`, store version 1
- `completeTask` creates a `TaskCompletion` and advances `nextDueDate` for recurring tasks (calls recurrence engine)
- Use `nanoid` for ID generation

### Task 1.6: Build recurrence engine
- **File:** `lib/recurrence.ts`
- `calculateNextDueDate(pattern, currentDueDate)` -> ISO date string | null
- Rules: once=null, daily=+1day, weekly=next matching day, monthly=same day clamped, custom=+N days
- Calculate from ORIGINAL due date, not completion date (no schedule drift)
- **File:** `lib/dates.ts`
- `formatDate(iso)`: human-friendly date display
- `formatRelativeDate(iso)`: "Today", "Tomorrow", "Yesterday", "3 days ago", etc.
- `isOverdue(iso)`, `isToday(iso)`, `isUpcoming(iso, days)`: boolean date checks

### Task 1.7: Build layout shell
- **File:** `components/layout/sidebar.tsx` — Desktop left sidebar with 4 nav items (Dashboard, Dogs, Tasks, History) using Lucide icons. Active state highlighting. "Todoodle" logo/title at top.
- **File:** `components/layout/mobile-nav.tsx` — Bottom tab bar for mobile, same 4 items. Hidden on desktop.
- **File:** `components/layout/header.tsx` — Top bar with page title area. Placeholder for dog switcher + add task button.
- **File:** `app/layout.tsx` — Root layout using sidebar + header + mobile nav. Warm cream background. Import font (rounded/friendly feel).
- **File:** `app/globals.css` — Tailwind config + CSS variables for the warm color palette from architecture.

### Task 1.8: Create shared components + dashboard empty state
- **File:** `components/shared/empty-state.tsx` — Reusable empty state with emoji, title, description, optional CTA button. Dog-themed defaults.
- **File:** `components/shared/page-header.tsx` — Consistent page header with title + optional action button.
- **File:** `app/page.tsx` — Dashboard page. For now, shows empty state: "No tasks yet! Add your first pup to get started." with link to `/dogs`.

---

## Phase 2: Dogs

### Task 2.1: Dog form component
- **File:** `components/dogs/dog-form.tsx`
- Client component. Fields: name, breed, weight, birthday, emoji avatar picker, allergies (tag input or comma-separated), vet name, vet phone, microchip ID, notes
- Uses Zod `dogSchema` for validation
- Emoji picker: grid of `DOG_EMOJI_OPTIONS` from constants
- Props: `initialData?` for edit mode, `onSubmit` callback
- Uses shadcn `input`, `label`, `textarea`, `button`

### Task 2.2: Dog card component
- **File:** `components/dogs/dog-card.tsx`
- Client component. Shows: emoji avatar (large), name, breed, quick stats placeholder
- Links to `/dogs/[id]`
- Warm card styling with subtle hover effect

### Task 2.3: Dogs list page
- **File:** `app/dogs/page.tsx`
- Reads dogs from Zustand store
- Grid layout of `DogCard` components
- "Add a pup" button (opens dialog with `DogForm` or links to inline form)
- Empty state: "No pups yet! Let's add your first furry friend."
- Filters out archived dogs

### Task 2.4: Dog profile detail page
- **File:** `app/dogs/[id]/page.tsx`
- Client component. Reads single dog from store by URL param
- Displays all dog details in organized sections
- Edit button -> `/dogs/[id]/edit`
- Archive button with confirmation
- Placeholder sections for "Tasks" and "Recent Activity" (populated in later phases)

### Task 2.5: Dog edit page
- **File:** `app/dogs/[id]/edit/page.tsx`
- Renders `DogForm` pre-filled with existing dog data
- On submit, calls `updateDog` and redirects to profile

---

## Phase 3: Tasks Core

### Task 3.1: Task form component
- **File:** `components/tasks/task-form.tsx`
- Client component. Fields: title, description, category (select with colored badges), dog assignment (multi-select with "All dogs" toggle), recurrence pattern picker, due date, priority
- Recurrence picker: radio/select for type, conditional fields (days for weekly, dayOfMonth for monthly, intervalDays for custom)
- Uses Zod `taskSchema` for validation
- Props: `initialData?` for edit mode, `onSubmit` callback

### Task 3.2: Category badge component
- **File:** `components/tasks/category-badge.tsx`
- Small colored pill showing category name with appropriate color from constants
- Used in task cards and task list

### Task 3.3: Task card component
- **File:** `components/tasks/task-card.tsx`
- Client component. Shows: title, category badge, assigned dogs (emoji avatars), due date (with color: red=overdue, orange=today, gray=future), priority indicator, recurrence icon
- Checkbox to complete task (triggers `completeTask` action)
- Click to expand or navigate to edit
- Subtle completion animation

### Task 3.4: Create task page
- **File:** `app/tasks/new/page.tsx`
- Renders `TaskForm`
- On submit, calls `addTask` and redirects to `/tasks`

### Task 3.5: Task list page with filtering
- **File:** `components/tasks/task-list.tsx` — Reusable filtered task list component
- **File:** `app/tasks/page.tsx` — All tasks view
- Filters: category dropdown, dog filter, show/hide completed
- Sort: by due date (default), priority, category
- Groups tasks by: Overdue, Due Today, Upcoming, No Due Date
- Uses `TaskCard` for each item
- Empty state: "All caught up! Time for belly rubs."

### Task 3.6: Edit task page
- **File:** `app/tasks/[id]/edit/page.tsx`
- Renders `TaskForm` pre-filled with existing task data
- On submit, calls `updateTask` and redirects back

### Task 3.7: Complete task flow
- Wire up checkbox in `TaskCard` to `completeTask` store action
- Store action creates `TaskCompletion`, calls `calculateNextDueDate`, updates task
- For one-off tasks (`recurrence.type === 'once'`): archive the task after completion
- Visual feedback on completion (brief animation or toast)

---

## Phase 4: Dashboard + Filtering

### Task 4.1: Derived state hooks
- **File:** `hooks/use-tasks.ts`
- `useOverdueTasks(dogFilter)`: tasks where `nextDueDate < today` and not archived
- `useTodayTasks(dogFilter)`: tasks where `nextDueDate === today`
- `useUpcomingTasks(days, dogFilter)`: tasks where `nextDueDate` is within N days
- `useTasksByDog(dogId)`: tasks assigned to a specific dog (or all-dogs tasks)
- `useLastCompletion(taskId)`: most recent completion for a task
- All hooks use Zustand selectors for efficiency

### Task 4.2: Dog filter hook + switcher
- **File:** `hooks/use-dog-filter.ts` — reads/writes `?dog=` URL search param using `useSearchParams`
- **File:** `components/dogs/dog-switcher.tsx` — Horizontal tab bar: "All" + each dog's emoji+name. Highlights active. Updates URL param on click.
- Integrate dog-switcher into `header.tsx`

### Task 4.3: Dashboard assembly
- **File:** `app/page.tsx` — Replace empty state with real dashboard
- Sections: Overdue (red), Due Today, Upcoming (7 days)
- Each section renders `TaskCard` list
- Dog switcher at top
- "Add task" floating action button
- Empty state when no tasks at all
- Per-section empty states ("No overdue tasks — good human!")

### Task 4.4: Task completion celebration
- Brief toast/message on task completion with randomized dog-themed messages
- Examples: "Good human! Walkies done!", "Paws up! Task complete!", "Treat yourself — you earned it!"
- Uses shadcn toast or simple animated message

---

## Phase 5: History + Polish

### Task 5.1: Activity log page
- **File:** `components/history/timeline.tsx` — Timeline component showing completions in reverse chronological order
- **File:** `app/history/page.tsx` — History page with timeline
- Each entry shows: task title, category badge, completion date, notes
- Filter by: dog, category, date range
- "Last time" cards: for each recurring task, show when it was last completed
- Empty state: "No history yet — complete some tasks to see them here!"

### Task 5.2: Browser notifications
- **File:** `hooks/use-notifications.ts`
- Permission request flow (only ask once, respect denial)
- Check for overdue/due-today tasks on app load
- Show notification for overdue tasks: "Biscuit has 3 overdue tasks!"
- Store notification preference in localStorage (separate from Zustand)

### Task 5.3: Empty states with personality
- Review all pages and add dog-themed empty states where missing
- Dashboard (no dogs): "Add your first pup to get started!"
- Dashboard (no tasks): "No tasks — time for belly rubs!"
- Dogs list (empty): "No pups yet! Let's fix that."
- Task list (all done): "All caught up! Extra treat time."
- History (empty): "Nothing here yet — your adventure is just beginning!"

### Task 5.4: Responsive polish
- Sidebar: hidden on mobile, visible on desktop (md: breakpoint)
- Mobile nav: visible on mobile only
- Task cards: stack nicely on small screens
- Dog form: single column on mobile, two columns on desktop
- Dashboard sections: responsive grid
- Test at 375px, 768px, 1024px, 1440px

### Task 5.5: Micro-interactions and final polish
- Checkbox completion animation (paw stamp or confetti burst)
- Card hover effects (subtle lift)
- Page transitions (if time permits)
- Favicon (paw print or dog emoji)
- Meta tags for social sharing (title, description, OG image)
- `<title>` per page: "Todoodle — Dashboard", "Todoodle — My Pups", etc.
