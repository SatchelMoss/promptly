import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CopyButton } from "@/components/CopyButton"
import { LikeButton } from "@/components/LikeButton"
import type { Prompt } from "@/db/schema"
import { Bot, Sparkles } from "lucide-react"

const OPTIMIZED_FOR_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  both: { label: "Works on all AIs", icon: <Sparkles className="h-3 w-3" /> },
  chatgpt: { label: "Best on ChatGPT", icon: <Bot className="h-3 w-3" /> },
  claude: { label: "Best on Claude", icon: <Sparkles className="h-3 w-3" /> },
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const optimized = OPTIMIZED_FOR_LABELS[prompt.optimizedFor] ?? OPTIMIZED_FOR_LABELS.both

  return (
    <Card className="flex flex-col gap-0 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight">{prompt.title}</h3>
            <p className="text-muted-foreground text-sm mt-1 leading-snug">{prompt.description}</p>
          </div>
          <CopyButton text={prompt.promptText} />
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <Badge variant="secondary" className="gap-1 text-xs">
            {optimized.icon}
            {optimized.label}
          </Badge>
          {prompt.optimizedFor !== "both" && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Works on other AIs too
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col gap-3">
        <div className="bg-muted/50 rounded-lg p-3 text-sm font-mono leading-relaxed whitespace-pre-wrap select-text">
          {prompt.promptText}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {prompt.tags?.map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground bg-muted rounded px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <LikeButton promptId={prompt.id} initialLikes={prompt.likes} />
        </div>
      </CardContent>
    </Card>
  )
}
