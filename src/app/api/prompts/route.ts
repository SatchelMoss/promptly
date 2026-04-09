import { NextResponse } from "next/server"
import { getAllPrompts, createPrompt } from "@/lib/prompts"
import { auth } from "@/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") ?? undefined
  const category = searchParams.get("category") ?? undefined

  const data = await getAllPrompts(search, category)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const prompt = await createPrompt(body)
  return NextResponse.json(prompt, { status: 201 })
}
