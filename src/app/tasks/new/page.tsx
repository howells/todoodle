"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Header } from "@/components/layout/header"
import { TaskForm } from "@/components/tasks/task-form"
import type { TaskFormData } from "@/lib/schemas"

export default function NewTaskPage() {
  const addTask = useStore((s) => s.addTask)
  const router = useRouter()

  function handleSubmit(data: TaskFormData) {
    addTask({
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
          New Task
        </h1>
        <div className="max-w-2xl">
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/tasks")}
            submitLabel="Create Task"
          />
        </div>
      </div>
    </>
  )
}
