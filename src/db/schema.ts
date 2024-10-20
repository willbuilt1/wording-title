import { bigint, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const words = pgTable("words", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  word: text("word"),
  ...timestamps,
});

export const wordCategories = pgTable("word_categories", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  wordId: bigint("word_id", { mode: "number" })
    .notNull()
    .references(() => words.id),
  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => categories.id),
  ...timestamps,
});

export const categories = pgTable("categories", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  name: varchar("name").notNull(),
  icon: varchar("icon").notNull(),
  ...timestamps,
});
