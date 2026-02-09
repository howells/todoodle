"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/dogs", label: "My Pups" },
  { href: "/tasks", label: "Tasks" },
  { href: "/history", label: "History" },
]

export function TopBar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block sticky top-0 z-50 border-b border-border bg-background">
      <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-fraunces)] text-[22px] font-semibold tracking-[-0.02em]"
          >
            🐾 Todoodle
          </Link>
          <div className="flex gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium pb-0.5 border-b-2 transition-colors",
                    isActive
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <Link
          href="/tasks/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-[13px] font-semibold hover:brightness-110 active:scale-[0.97] transition-all"
        >
          + New Task
        </Link>
      </div>
    </nav>
  )
}
