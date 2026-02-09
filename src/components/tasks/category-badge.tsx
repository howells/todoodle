import { getCategoryConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { TaskCategory } from "@/types"

interface CategoryBadgeProps {
  category: TaskCategory
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = getCategoryConfig(category)
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
