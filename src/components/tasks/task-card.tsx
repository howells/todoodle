"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Pencil } from "lucide-react"
import { useStore } from "@/lib/store"
import { CategoryBadge } from "./category-badge"
import { cn } from "@/lib/utils"
import { formatRelativeDate, isOverdue, isToday } from "@/lib/dates"
import { getRandomCompletionMessage, getPriorityBorderColor } from "@/lib/constants"
import { toast } from "sonner"
import type { Task, Dog } from "@/types"

interface TaskCardProps {
  task: Task
  dogs: Dog[]
  isFirst?: boolean
  isLast?: boolean
}

function getAssignedDogs(task: Task, dogs: Dog[]): Dog[] {
  if (task.assignment.type === "all") return dogs
  const { dogIds } = task.assignment
  return dogs.filter((d) => dogIds.includes(d.id))
}

export function TaskCard({ task, dogs, isFirst, isLast }: TaskCardProps) {
  const completeTask = useStore((s) => s.completeTask)
  const [completing, setCompleting] = useState(false)
  const assignedDogs = getAssignedDogs(task, dogs)

  function handleComplete() {
    setCompleting(true)
    completeTask(task.id)
    toast.success(getRandomCompletionMessage())
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-5 py-4 bg-card transition-all",
        !isFirst && "border-t border-[oklch(0.93_0.008_80)]",
        completing && "opacity-50 scale-[0.98]"
      )}
      style={{
        borderLeft: `3px solid ${getPriorityBorderColor(task.priority)}`,
        borderRadius: isFirst && isLast
          ? "10px"
          : isFirst
            ? "10px 10px 0 0"
            : isLast
              ? "0 0 10px 10px"
              : 0,
      }}
    >
      {/* Completion checkbox */}
      <button
        type="button"
        onClick={handleComplete}
        disabled={completing}
        className={cn(
          "flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all",
          completing
            ? "bg-primary border-primary text-primary-foreground"
            : "border-[oklch(0.78_0.01_80)] hover:border-primary hover:bg-primary/10"
        )}
      >
        {completing && <Check className="h-3 w-3" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[15px] truncate">{task.title}</p>
        {task.description && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {task.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <CategoryBadge category={task.category} />

          {task.recurrence.type !== "once" && (
            <span className="text-xs text-muted-foreground">
              🔄 {task.recurrence.type}
            </span>
          )}

          {assignedDogs.length > 0 && (
            <span className="text-xs">
              {assignedDogs.map((d) => d.avatarEmoji).join("")}
            </span>
          )}
        </div>
      </div>

      {/* Due date + edit */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {task.nextDueDate && (
          <span
            className={cn(
              "text-[13px] font-semibold",
              isOverdue(task.nextDueDate) && "text-primary",
              isToday(task.nextDueDate) && "text-primary",
              !isOverdue(task.nextDueDate) &&
                !isToday(task.nextDueDate) &&
                "text-muted-foreground"
            )}
          >
            {formatRelativeDate(task.nextDueDate)}
          </span>
        )}
        <Link
          href={`/tasks/${task.id}/edit`}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
