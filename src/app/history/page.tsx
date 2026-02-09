"use client"

import { Header } from "@/components/layout/header"
import { EmptyState } from "@/components/shared/empty-state"

export default function HistoryPage() {
  return (
    <>
      <Header />
      <div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-[-0.03em] leading-[1.05] mb-8">
          History
        </h1>
        <EmptyState
          emoji="📖"
          title="No history yet"
          description="Complete some tasks and your activity log will appear here."
        />
      </div>
    </>
  )
}
