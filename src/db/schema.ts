import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core"

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  promptText: text("prompt_text").notNull(),
  optimizedFor: text("optimized_for").notNull().default("both"),
  tags: text("tags").array().notNull().default([]),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export type Prompt = typeof prompts.$inferSelect
export type NewPrompt = typeof prompts.$inferInsert
