"use client"

import Link from "next/link"

export function Header({ title }: { title?: string }) {
  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-5 border-b border-border bg-background">
      {/* Mobile logo */}
      <Link
        href="/"
        className="font-[family-name:var(--font-fraunces)] text-lg font-semibold tracking-[-0.02em]"
      >
        🐾 Todoodle
      </Link>

      {/* Quick add */}
      <Link
        href="/tasks/new"
        className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold"
      >
        + New Task
      </Link>
    </header>
  )
}
