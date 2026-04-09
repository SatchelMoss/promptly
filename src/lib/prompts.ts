import { getDb } from "@/db"
import { prompts } from "@/db/schema"
import { eq, ilike, or, sql } from "drizzle-orm"
import type { NewPrompt } from "@/db/schema"

export async function getAllPrompts(search?: string, category?: string) {
  const db = getDb()
  let query = db.select().from(prompts).$dynamic()

  const conditions = []
  if (search) {
    conditions.push(
      or(
        ilike(prompts.title, `%${search}%`),
        ilike(prompts.description, `%${search}%`),
        ilike(prompts.promptText, `%${search}%`)
      )
    )
  }
  if (category && category !== "all") {
    conditions.push(eq(prompts.category, category))
  }

  if (conditions.length > 0) {
    const { and } = await import("drizzle-orm")
    query = query.where(and(...conditions))
  }

  return query.orderBy(sql`${prompts.likes} DESC, ${prompts.createdAt} DESC`)
}

export async function getPromptById(id: string) {
  const db = getDb()
  const result = await db.select().from(prompts).where(eq(prompts.id, id))
  return result[0] ?? null
}

export async function createPrompt(data: Omit<NewPrompt, "id" | "createdAt" | "updatedAt" | "likes">) {
  const db = getDb()
  const result = await db.insert(prompts).values(data).returning()
  return result[0]
}

export async function updatePrompt(id: string, data: Partial<Omit<NewPrompt, "id" | "createdAt">>) {
  const db = getDb()
  const result = await db
    .update(prompts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(prompts.id, id))
    .returning()
  return result[0]
}

export async function deletePrompt(id: string) {
  const db = getDb()
  await db.delete(prompts).where(eq(prompts.id, id))
}

export async function incrementLikes(id: string) {
  const db = getDb()
  const result = await db
    .update(prompts)
    .set({ likes: sql`${prompts.likes} + 1` })
    .where(eq(prompts.id, id))
    .returning({ likes: prompts.likes })
  return result[0]?.likes ?? 0
}
