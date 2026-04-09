"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CATEGORIES } from "@/components/CategoryFilter"
import type { Prompt } from "@/db/schema"

const OPTIMIZED_OPTIONS = [
  { value: "both", label: "Works on all AIs (recommended)" },
  { value: "chatgpt", label: "Best on ChatGPT" },
  { value: "claude", label: "Best on Claude" },
]

export function PromptForm({ prompt }: { prompt?: Prompt }) {
  const router = useRouter()
  const isEdit = !!prompt

  const [form, setForm] = useState({
    title: prompt?.title ?? "",
    description: prompt?.description ?? "",
    category: prompt?.category ?? "",
    promptText: prompt?.promptText ?? "",
    optimizedFor: prompt?.optimizedFor ?? "both",
    tags: prompt?.tags?.join(", ") ?? "",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const body = {
      title: form.title,
      description: form.description,
      category: form.category,
      promptText: form.promptText,
      optimizedFor: form.optimizedFor,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    try {
      const res = isEdit
        ? await fetch(`/api/prompts/${prompt.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch("/api/prompts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })

      if (!res.ok) throw new Error(await res.text())
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  const categories = CATEGORIES.filter((c) => c.id !== "all")

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={form.title} onChange={set("title")} required placeholder="e.g. Find Cheapest Flights" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={form.description} onChange={set("description")} required placeholder="One sentence explaining what this prompt does" />
      </div>

      <div className="grid gap-1.5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v ?? "" }))} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label>Optimized For</Label>
          <Select value={form.optimizedFor} onValueChange={(v) => setForm((p) => ({ ...p, optimizedFor: v ?? "both" }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPTIMIZED_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="promptText">Prompt Text</Label>
        <Textarea
          id="promptText"
          value={form.promptText}
          onChange={set("promptText")}
          required
          rows={8}
          placeholder="The actual prompt. Use [brackets] for variables the user should fill in."
          className="font-mono text-sm"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="tags">Tags <span className="text-muted-foreground font-normal">(comma-separated)</span></Label>
        <Input id="tags" value={form.tags} onChange={set("tags")} placeholder="e.g. flights, budget, travel" />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Prompt"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
