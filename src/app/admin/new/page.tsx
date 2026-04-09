import { PromptForm } from "@/components/PromptForm"

export const metadata = { title: "New Prompt — Promptly" }

export default function NewPromptPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">New Prompt</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a new prompt to the library</p>
      </div>
      <PromptForm />
    </div>
  )
}
