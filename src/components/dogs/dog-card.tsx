"use client"

import Link from "next/link"
import type { Dog } from "@/types"

interface DogCardProps {
  dog: Dog
}

export function DogCard({ dog }: DogCardProps) {
  return (
    <Link href={`/dogs/${dog.id}`} className="group block">
      <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-[10px] hover:shadow-sm transition-all">
        <span className="text-4xl group-hover:scale-110 transition-transform">
          {dog.avatarEmoji}
        </span>
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg tracking-[-0.02em] truncate">
            {dog.name}
          </h3>
          {dog.breed && (
            <p className="text-sm text-muted-foreground truncate">
              {dog.breed}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
