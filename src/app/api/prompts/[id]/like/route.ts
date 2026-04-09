import { NextResponse } from "next/server"
import { incrementLikes } from "@/lib/prompts"
import { revalidateTag } from "next/cache"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const likes = await incrementLikes(id)
  revalidateTag("prompts", "max")
  return NextResponse.json({ likes })
}
