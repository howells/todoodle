"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DOG_EMOJI_OPTIONS } from "@/lib/constants"
import { dogSchema, type DogFormData } from "@/lib/schemas"
import { cn } from "@/lib/utils"

interface DogFormProps {
  initialData?: DogFormData
  onSubmit: (data: DogFormData) => void
  onCancel?: () => void
  submitLabel?: string
}

const defaultData: DogFormData = {
  name: "",
  breed: "",
  weight: null,
  birthday: null,
  avatarEmoji: "🐶",
  allergies: [],
  vetName: null,
  vetPhone: null,
  microchipId: null,
  notes: "",
}

export function DogForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Pup",
}: DogFormProps) {
  const [data, setData] = useState<DogFormData>({
    ...defaultData,
    ...initialData,
  })
  const [allergiesInput, setAllergiesInput] = useState(
    initialData?.allergies?.join(", ") ?? ""
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData: DogFormData = {
      ...data,
      allergies: allergiesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    const result = dogSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (key) fieldErrors[String(key)] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {/* Emoji Avatar Picker */}
      <div>
        <Label>Avatar</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {DOG_EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setData((d) => ({ ...d, avatarEmoji: emoji }))}
              className={cn(
                "text-3xl p-2 rounded-lg transition-all",
                data.avatarEmoji === emoji
                  ? "bg-primary/15 ring-2 ring-primary scale-110"
                  : "hover:bg-muted"
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          placeholder="Biscuit"
          className="mt-1"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Breed */}
      <div>
        <Label htmlFor="breed">Breed</Label>
        <Input
          id="breed"
          value={data.breed}
          onChange={(e) => setData((d) => ({ ...d, breed: e.target.value }))}
          placeholder="Golden Retriever"
          className="mt-1"
        />
      </div>

      {/* Weight + Birthday row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            value={data.weight ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                weight: e.target.value ? Number(e.target.value) : null,
              }))
            }
            placeholder="65"
            className="mt-1"
          />
          {errors.weight && (
            <p className="text-sm text-destructive mt-1">{errors.weight}</p>
          )}
        </div>
        <div>
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            type="date"
            value={data.birthday ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                birthday: e.target.value || null,
              }))
            }
            className="mt-1"
          />
        </div>
      </div>

      {/* Allergies */}
      <div>
        <Label htmlFor="allergies">Allergies</Label>
        <Input
          id="allergies"
          value={allergiesInput}
          onChange={(e) => setAllergiesInput(e.target.value)}
          placeholder="Chicken, pollen (comma separated)"
          className="mt-1"
        />
      </div>

      {/* Vet Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vetName">Vet Name</Label>
          <Input
            id="vetName"
            value={data.vetName ?? ""}
            onChange={(e) =>
              setData((d) => ({ ...d, vetName: e.target.value || null }))
            }
            placeholder="Dr. Pawson"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="vetPhone">Vet Phone</Label>
          <Input
            id="vetPhone"
            value={data.vetPhone ?? ""}
            onChange={(e) =>
              setData((d) => ({ ...d, vetPhone: e.target.value || null }))
            }
            placeholder="(555) 123-4567"
            className="mt-1"
          />
        </div>
      </div>

      {/* Microchip */}
      <div>
        <Label htmlFor="microchipId">Microchip ID</Label>
        <Input
          id="microchipId"
          value={data.microchipId ?? ""}
          onChange={(e) =>
            setData((d) => ({ ...d, microchipId: e.target.value || null }))
          }
          placeholder="Optional"
          className="mt-1"
        />
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={data.notes}
          onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
          placeholder="Loves belly rubs, scared of thunder..."
          className="mt-1"
          rows={3}
        />
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
