"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { Header } from "@/components/layout/header"
import { TaskForm } from "@/components/tasks/task-form"
import type { TaskFormData } from "@/lib/schemas"

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const hydrated = useHydrated()
  const task = useStore((s) => s.tasks.find((t) => t.id === id))
  const updateTask = useStore((s) => s.updateTask)
  const router = useRouter()

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8" />
      </>
    )
  }

  if (!task) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8">
          <p className="text-muted-foreground">Task not found.</p>
          <Link
            href="/tasks"
            className="inline-block mt-4 px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
          >
            Back to Tasks
          </Link>
        </div>
      </>
    )
  }

  function handleSubmit(data: TaskFormData) {
    updateTask(id, {
      title: data.title,
      description: data.description,
      category: data.category,
      assignment: data.assignment,
      recurrence: data.recurrence,
      nextDueDate: data.nextDueDate,
      priority: data.priority,
    })
    router.push("/tasks")
  }

  return (
    <>
      <Header />
      <div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
        <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-[-0.03em] leading-[1.05] mb-8">
          Edit Task
        </h1>
        <div className="max-w-2xl">
          <TaskForm
            initialData={{
              title: task.title,
              description: task.description,
              category: task.category,
              assignment: task.assignment,
              recurrence: task.recurrence,
              nextDueDate: task.nextDueDate ?? "",
              priority: task.priority,
            }}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/tasks")}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </>
  )
}
