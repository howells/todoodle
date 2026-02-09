"use client"

import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { TaskCard } from "./task-card"
import { EmptyState } from "@/components/shared/empty-state"
import { isOverdue, isToday, isUpcoming } from "@/lib/dates"
import type { Dog, Task } from "@/types"

interface TaskListProps {
  dogFilter?: string | null
}

function groupTasks(tasks: Task[]) {
  const overdue: Task[] = []
  const today: Task[] = []
  const upcoming: Task[] = []
  const later: Task[] = []
  const noDueDate: Task[] = []

  for (const task of tasks) {
    if (!task.nextDueDate) {
      noDueDate.push(task)
    } else if (isOverdue(task.nextDueDate)) {
      overdue.push(task)
    } else if (isToday(task.nextDueDate)) {
      today.push(task)
    } else if (isUpcoming(task.nextDueDate, 7)) {
      upcoming.push(task)
    } else {
      later.push(task)
    }
  }

  return { overdue, today, upcoming, later, noDueDate }
}

function TaskGroup({ label, tasks, dogs }: { label: string; tasks: Task[]; dogs: Dog[] }) {
  if (tasks.length === 0) return null
  return (
    <div>
      {/* D1 section header: uppercase label + horizontal line */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          {label}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex flex-col gap-px">
        {tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            dogs={dogs}
            isFirst={i === 0}
            isLast={i === tasks.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export function TaskList({ dogFilter }: TaskListProps) {
  const hydrated = useHydrated()
  const tasks = useStore((s) => s.tasks)
  const dogs = useStore((s) => s.dogs)

  if (!hydrated) {
    return <div className="py-8" />
  }

  const activeDogs = dogs.filter((d) => !d.isArchived)

  // Filter: active tasks only, then by dog if filter is set
  let filtered = tasks.filter((t) => !t.isArchived)

  if (dogFilter) {
    filtered = filtered.filter((t) => {
      if (t.assignment.type === "all") return true
      return t.assignment.dogIds.includes(dogFilter)
    })
  }

  // Sort by priority weight then due date
  const priorityWeight = { high: 0, medium: 1, low: 2 }
  filtered.sort((a, b) => {
    const pw = priorityWeight[a.priority] - priorityWeight[b.priority]
    if (pw !== 0) return pw
    if (!a.nextDueDate && !b.nextDueDate) return 0
    if (!a.nextDueDate) return 1
    if (!b.nextDueDate) return -1
    return a.nextDueDate.localeCompare(b.nextDueDate)
  })

  if (filtered.length === 0) {
    return (
      <EmptyState
        emoji="📋"
        title="No tasks yet"
        description="Create your first task to start tracking your pup's needs."
        actionLabel="Create a Task"
        actionHref="/tasks/new"
      />
    )
  }

  const groups = groupTasks(filtered)

  return (
    <div className="space-y-10">
      <TaskGroup label="Overdue" tasks={groups.overdue} dogs={activeDogs} />
      <TaskGroup label="Today" tasks={groups.today} dogs={activeDogs} />
      <TaskGroup label="This Week" tasks={groups.upcoming} dogs={activeDogs} />
      <TaskGroup label="Later" tasks={groups.later} dogs={activeDogs} />
      <TaskGroup label="No Due Date" tasks={groups.noDueDate} dogs={activeDogs} />
    </div>
  )
}
