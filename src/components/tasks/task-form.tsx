"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { TASK_CATEGORIES, PRIORITIES } from "@/lib/constants"
import { taskSchema, type TaskFormData } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import type { TaskCategory, RecurrencePattern, TaskAssignment } from "@/types"

interface TaskFormProps {
  initialData?: TaskFormData
  onSubmit: (data: TaskFormData) => void
  onCancel?: () => void
  submitLabel?: string
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Task",
}: TaskFormProps) {
  const hydrated = useHydrated()
  const dogs = useStore((s) => s.dogs)
  const activeDogs = hydrated ? dogs.filter((d) => !d.isArchived) : []

  const [title, setTitle] = useState(initialData?.title ?? "")
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [category, setCategory] = useState<TaskCategory>(
    initialData?.category ?? "health"
  )
  const [priority, setPriority] = useState(initialData?.priority ?? "medium")
  const [nextDueDate, setNextDueDate] = useState(
    initialData?.nextDueDate ?? ""
  )

  // Recurrence
  const [recurrenceType, setRecurrenceType] = useState(
    initialData?.recurrence.type ?? "once"
  )
  const [weeklyDays, setWeeklyDays] = useState<number[]>(
    initialData?.recurrence.type === "weekly"
      ? initialData.recurrence.days
      : []
  )
  const [monthlyDay, setMonthlyDay] = useState(
    initialData?.recurrence.type === "monthly"
      ? initialData.recurrence.dayOfMonth
      : 1
  )
  const [customInterval, setCustomInterval] = useState(
    initialData?.recurrence.type === "custom"
      ? initialData.recurrence.intervalDays
      : 7
  )

  // Assignment
  const [assignAll, setAssignAll] = useState(
    initialData?.assignment.type === "all" ||
      !initialData?.assignment
  )
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>(
    initialData?.assignment.type === "specific"
      ? initialData.assignment.dogIds
      : []
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  function buildRecurrence(): RecurrencePattern {
    switch (recurrenceType) {
      case "daily":
        return { type: "daily" }
      case "weekly":
        return { type: "weekly", days: weeklyDays }
      case "monthly":
        return { type: "monthly", dayOfMonth: monthlyDay }
      case "custom":
        return { type: "custom", intervalDays: customInterval }
      default:
        return { type: "once" }
    }
  }

  function buildAssignment(): TaskAssignment {
    if (assignAll) return { type: "all" }
    return { type: "specific", dogIds: selectedDogIds }
  }

  function toggleWeekDay(day: number) {
    setWeeklyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  function toggleDog(dogId: string) {
    setSelectedDogIds((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData: TaskFormData = {
      title,
      description,
      category,
      assignment: buildAssignment(),
      recurrence: buildRecurrence(),
      nextDueDate: nextDueDate || null,
      priority,
    }

    const result = taskSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path.join(".")
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {/* Title */}
      <div>
        <Label htmlFor="title">Task *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Walk Biscuit"
          className="mt-1"
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          className="mt-1"
          rows={2}
        />
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {TASK_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isSelected = category === cat.value
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                  isSelected
                    ? `${cat.bgColor} ${cat.color} border-current`
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dog Assignment */}
      <div>
        <Label>Assign to</Label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={assignAll}
              onCheckedChange={() => {
                setAssignAll(true)
                setSelectedDogIds([])
              }}
            />
            <span className="text-sm">All dogs</span>
          </label>
          {activeDogs.length > 0 && (
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={!assignAll}
                onCheckedChange={() => setAssignAll(false)}
              />
              <span className="text-sm">Specific dogs</span>
            </label>
          )}
          {!assignAll && activeDogs.length > 0 && (
            <div className="flex flex-wrap gap-2 ml-6">
              {activeDogs.map((dog) => (
                <button
                  key={dog.id}
                  type="button"
                  onClick={() => toggleDog(dog.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all",
                    selectedDogIds.includes(dog.id)
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span>{dog.avatarEmoji}</span>
                  {dog.name}
                </button>
              ))}
            </div>
          )}
          {errors["assignment.dogIds"] && (
            <p className="text-sm text-destructive">
              {errors["assignment.dogIds"]}
            </p>
          )}
        </div>
      </div>

      {/* Due Date + Priority row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={nextDueDate}
            onChange={(e) => setNextDueDate(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Priority</Label>
          <div className="flex gap-2 mt-1">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium border transition-all flex-1",
                  priority === p.value
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recurrence */}
      <div>
        <Label>Recurrence</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {(
            [
              { value: "once", label: "One-time" },
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "custom", label: "Custom" },
            ] as const
          ).map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRecurrenceType(r.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                recurrenceType === r.value
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Conditional recurrence fields */}
        {recurrenceType === "weekly" && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground mb-2">
              Which days?
            </p>
            <div className="flex gap-1">
              {DAY_LABELS.map((label, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleWeekDay(idx)}
                  className={cn(
                    "w-10 h-10 rounded-full text-xs font-medium transition-all",
                    weeklyDays.includes(idx)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors["recurrence.days"] && (
              <p className="text-sm text-destructive mt-1">
                {errors["recurrence.days"]}
              </p>
            )}
          </div>
        )}

        {recurrenceType === "monthly" && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Day</span>
            <Input
              type="number"
              min={1}
              max={31}
              value={monthlyDay}
              onChange={(e) => setMonthlyDay(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">of each month</span>
          </div>
        )}

        {recurrenceType === "custom" && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Every</span>
            <Input
              type="number"
              min={1}
              value={customInterval}
              onChange={(e) => setCustomInterval(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit">{submitLabel}</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
