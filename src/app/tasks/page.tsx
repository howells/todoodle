"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { Header } from "@/components/layout/header"
import { TaskList } from "@/components/tasks/task-list"
import { cn } from "@/lib/utils"

function DogFilter() {
  const hydrated = useHydrated()
  const dogs = useStore((s) => s.dogs)
  const searchParams = useSearchParams()
  const dogFilter = searchParams.get("dog")

  if (!hydrated) return null

  const activeDogs = dogs.filter((d) => !d.isArchived)
  if (activeDogs.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Link
        href="/tasks"
        className={cn(
          "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors",
          !dogFilter
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </Link>
      {activeDogs.map((dog) => (
        <Link
          key={dog.id}
          href={`/tasks?dog=${dog.id}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors",
            dogFilter === dog.id
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <span>{dog.avatarEmoji}</span>
          {dog.name}
        </Link>
      ))}
    </div>
  )
}

function TasksContent() {
  const searchParams = useSearchParams()
  const dogFilter = searchParams.get("dog")

  return (
    <>
      <DogFilter />
      <TaskList dogFilter={dogFilter} />
    </>
  )
}

export default function TasksPage() {
  return (
    <>
      <Header />
      <div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
        <div className="flex items-end justify-between mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-[-0.03em] leading-[1.05]">
            Tasks
          </h1>
          <Link
            href="/tasks/new"
            className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1 flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
            New Task
          </Link>
        </div>
        <Suspense>
          <TasksContent />
        </Suspense>
      </div>
    </>
  )
}
