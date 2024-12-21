import { bigint, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { baseMixin } from "./mixins";

export const word = pgTable("word", {
  word: text("word"),
  ...baseMixin,
});

export const wordCategory = pgTable("word_category", {
  wordId: bigint("word_id", { mode: "number" })
    .notNull()
    .references(() => word.id),
  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => category.id),
  ...baseMixin,
});

export const category = pgTable("category", {
  name: varchar("name").notNull(),
  icon: varchar("icon").notNull().default("❔"),
  ...baseMixin,
});

export const user = pgTable("user", {
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  ...baseMixin,
});
