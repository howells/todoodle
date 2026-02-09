import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export function PageHeader({
  title,
  description,
  actionLabel,
  actionHref,
}: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-[-0.03em] leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2 text-[15px]">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
