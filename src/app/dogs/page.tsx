"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { Header } from "@/components/layout/header"
import { EmptyState } from "@/components/shared/empty-state"
import { DogCard } from "@/components/dogs/dog-card"
import { DogForm } from "@/components/dogs/dog-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { DogFormData } from "@/lib/schemas"

export default function DogsPage() {
  const hydrated = useHydrated()
  const dogs = useStore((s) => s.dogs)
  const addDog = useStore((s) => s.addDog)
  const router = useRouter()
  const [showAddDialog, setShowAddDialog] = useState(false)

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8" />
      </>
    )
  }

  const activeDogs = dogs.filter((d) => !d.isArchived)

  function handleAddDog(data: DogFormData) {
    const id = addDog(data)
    setShowAddDialog(false)
    router.push(`/dogs/${id}`)
  }

  return (
    <>
      <Header />
      <div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
        {activeDogs.length === 0 ? (
          <EmptyState
            emoji="🐕"
            title="No pups yet"
            description="Add your first furry friend to start tracking their care."
          >
            <button
              onClick={() => setShowAddDialog(true)}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add a Pup
            </button>
          </EmptyState>
        ) : (
          <>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-[-0.03em] leading-[1.05]">
                  My Pups
                </h1>
                <p className="text-muted-foreground mt-2 text-[15px]">
                  {activeDogs.length} {activeDogs.length === 1 ? "pup" : "pups"}
                </p>
              </div>
              <button
                onClick={() => setShowAddDialog(true)}
                className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1 flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
                Add a Pup
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.02em]">
              Add a New Pup
            </DialogTitle>
          </DialogHeader>
          <DogForm
            onSubmit={handleAddDog}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
