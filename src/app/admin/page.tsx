import { getAllPrompts } from "@/lib/prompts"
import { AdminPromptTable } from "@/components/AdminPromptTable"

export const metadata = { title: "Admin — PromptVault" }

export default async function AdminPage() {
  const prompts = await getAllPrompts()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Prompts</h1>
        <p className="text-muted-foreground text-sm mt-1">{prompts.length} prompts total</p>
      </div>
      <AdminPromptTable prompts={prompts} />
    </div>
  )
}
