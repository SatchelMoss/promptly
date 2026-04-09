"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "travel", label: "Travel & Flights" },
  { id: "writing", label: "Writing" },
  { id: "coding", label: "Coding" },
  { id: "planning", label: "Project Planning" },
  { id: "learning", label: "Learning" },
  { id: "career", label: "Career" },
  { id: "creative", label: "Creative" },
  { id: "business", label: "Business" },
]

export function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string
  onChange: (category: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors border",
            selected === cat.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
