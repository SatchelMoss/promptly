import { NextResponse } from "next/server"
import { getPromptById, updatePrompt, deletePrompt } from "@/lib/prompts"
import { auth } from "@/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const prompt = await getPromptById(id)
  if (!prompt) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(prompt)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const prompt = await updatePrompt(id, body)
  return NextResponse.json(prompt)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await deletePrompt(id)
  return new NextResponse(null, { status: 204 })
}
