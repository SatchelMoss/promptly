import { getAllPrompts } from "@/lib/prompts"
import { PromptBrowser } from "@/components/PromptBrowser"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "PromptVault — Better prompts, better results",
  description:
    "A curated library of high-quality prompts for ChatGPT, Claude, and other AI tools. Copy, customize, and get dramatically better responses.",
}

export default async function HomePage() {
  const prompts = await getAllPrompts()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Better prompts.<br className="hidden sm:block" /> Better results.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated library of high-quality prompts for ChatGPT, Claude, and other AI tools.
            Copy any prompt and get dramatically better responses instantly.
          </p>
        </div>

        <PromptBrowser initialPrompts={prompts} />
      </div>
    </main>
  )
}
