"use client"

import { use } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Pencil, Archive, RotateCcw } from "lucide-react"
import { useStore } from "@/lib/store"
import { useHydrated } from "@/hooks/use-hydrated"
import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatDate } from "@/lib/dates"

export default function DogProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const hydrated = useHydrated()
  const dog = useStore((s) => s.dogs.find((d) => d.id === id))
  const archiveDog = useStore((s) => s.archiveDog)
  const restoreDog = useStore((s) => s.restoreDog)
  const router = useRouter()
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8" />
      </>
    )
  }

  if (!dog) {
    return (
      <>
        <Header />
        <div className="max-w-[860px] mx-auto px-6 py-8">
          <p className="text-muted-foreground">Pup not found.</p>
          <Link
            href="/dogs"
            className="inline-block mt-4 px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
          >
            Back to My Pups
          </Link>
        </div>
      </>
    )
  }

  function handleArchive() {
    archiveDog(id)
    router.push("/dogs")
  }

  return (
    <>
      <Header />
      <div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
        {/* Header with avatar and actions */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-5">
            <span className="text-6xl">{dog.avatarEmoji}</span>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-[-0.03em]">
                {dog.name}
              </h1>
              {dog.breed && (
                <p className="text-muted-foreground mt-1">{dog.breed}</p>
              )}
              {dog.isArchived && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  Archived
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dogs/${dog.id}/edit`}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Link>
            {dog.isArchived ? (
              <button
                onClick={() => restoreDog(dog.id)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restore
              </button>
            ) : (
              <button
                onClick={() => setShowArchiveDialog(true)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted transition-colors"
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dog.weight && (
            <div className="p-5 bg-card border border-border rounded-[10px]">
              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Weight
              </p>
              <p className="font-semibold text-lg">{dog.weight} lbs</p>
            </div>
          )}

          {dog.birthday && (
            <div className="p-5 bg-card border border-border rounded-[10px]">
              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Birthday
              </p>
              <p className="font-semibold text-lg">{formatDate(dog.birthday)}</p>
            </div>
          )}

          {dog.allergies.length > 0 && (
            <div className="sm:col-span-2 p-5 bg-card border border-border rounded-[10px]">
              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Allergies
              </p>
              <div className="flex flex-wrap gap-2">
                {dog.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(dog.vetName || dog.vetPhone) && (
            <div className="sm:col-span-2 p-5 bg-card border border-border rounded-[10px]">
              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Vet Info
              </p>
              {dog.vetName && <p className="font-semibold">{dog.vetName}</p>}
              {dog.vetPhone && (
                <p className="text-muted-foreground">{dog.vetPhone}</p>
              )}
            </div>
          )}

          {dog.microchipId && (
            <div className="p-5 bg-card border border-border rounded-[10px]">
              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Microchip ID
              </p>
              <p className="text-sm font-medium">{dog.microchipId}</p>
            </div>
          )}
        </div>

        {dog.notes && (
          <div className="mt-4 p-5 bg-card border border-border rounded-[10px]">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
              Notes
            </p>
            <p className="whitespace-pre-wrap">{dog.notes}</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showArchiveDialog}
        onOpenChange={setShowArchiveDialog}
        title={`Archive ${dog.name}?`}
        description="This will hide the pup from your active list. You can restore them anytime."
        confirmLabel="Archive"
        onConfirm={handleArchive}
      />
    </>
  )
}
