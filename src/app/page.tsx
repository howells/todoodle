"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { Header } from "@/components/layout/header"
import { EmptyState } from "@/components/shared/empty-state"
import { TaskList } from "@/components/tasks/task-list"

export default function DashboardPage() {
  const hydrated = useHydrated()
  const dogs = useStore((s) => s.dogs)
  const tasks = useStore((s) => s.tasks)

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8" />
      </>
    )
  }

  const activeDogs = dogs.filter((d) => !d.isArchived)
  const activeTasks = tasks.filter((t) => !t.isArchived)
  const hasDogs = activeDogs.length > 0
  const hasTasks = activeTasks.length > 0

  if (!hasDogs) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8">
          <EmptyState
            emoji="🐶"
            title="Welcome to Todoodle"
            description="Add your first pup to get started. Then you can create tasks to track walks, vet visits, medications, and more."
            actionLabel="Add Your First Pup"
            actionHref="/dogs"
          />
        </div>
      </>
    )
  }

  if (!hasTasks) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8">
          <EmptyState
            emoji="✨"
            title="No tasks yet"
            description="Your pups are registered — now let's add some tasks to keep them happy and healthy."
            actionLabel="Create a Task"
            actionHref="/tasks/new"
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="max-w-[860px] mx-auto px-6 py-12">
        {/* Hero greeting — Fraunces serif, large, natural case */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.03em] mb-2">
            Good morning.
          </h1>
          <p className="text-[17px] text-muted-foreground leading-relaxed">
            {activeDogs.length === 1 ? activeDogs[0].name : "Your pups"}{" "}
            {activeTasks.length === 1 ? "has" : "have"} {activeTasks.length}{" "}
            {activeTasks.length === 1 ? "task" : "tasks"} today. Let&apos;s make it a great day.
          </p>
        </div>

        <TaskList />

        {/* Dog summary — small sidebar-like section on desktop */}
        {activeDogs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
                Your Pups
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-wrap gap-6">
              {activeDogs.map((dog) => (
                <Link
                  key={dog.id}
                  href={`/dogs/${dog.id}`}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {dog.avatarEmoji}
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.02em]">
                      {dog.name}
                    </p>
                    {dog.breed && (
                      <p className="text-xs text-muted-foreground">{dog.breed}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
