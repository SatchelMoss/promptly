import { getPromptById } from "@/lib/prompts"
import { PromptForm } from "@/components/PromptForm"
import { notFound } from "next/navigation"

export const metadata = { title: "Edit Prompt — Promptly" }

export default async function EditPromptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const prompt = await getPromptById(id)
  if (!prompt) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Prompt</h1>
        <p className="text-muted-foreground text-sm mt-1 truncate max-w-xl">{prompt.title}</p>
      </div>
      <PromptForm prompt={prompt} />
    </div>
  )
}
