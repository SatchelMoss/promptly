"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"

export function LikeButton({ promptId, initialLikes }: { promptId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLike() {
    if (liked || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/prompts/${promptId}/like`, { method: "POST" })
      const data = await res.json()
      setLikes(data.likes)
      setLiked(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleLike}
      disabled={liked || loading}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-current text-primary" : ""}`} />
      <span className="text-xs">{likes}</span>
    </Button>
  )
}
