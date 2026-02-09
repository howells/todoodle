import Link from "next/link"

interface EmptyStateProps {
  emoji?: string
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  children?: React.ReactNode
}

export function EmptyState({
  emoji = "🐾",
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <span className="text-5xl mb-6">{emoji}</span>
      <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-[-0.03em] mb-3">
        {title}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm text-[15px] leading-relaxed">
        {description}
      </p>
      {children}
      {!children && actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
