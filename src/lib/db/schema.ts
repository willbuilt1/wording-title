import { bigint, pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { baseMixin } from "./mixins";

export const wordTable = pgTable("word", {
  word: text("word"),
  ...baseMixin,
});

export const wordCategoryTable = pgTable("word_category", {
  wordId: bigint("word_id", { mode: "number" })
    .notNull()
    .references(() => wordTable.id),
  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => categoryTable.id),
  ...baseMixin,
});

export const categoryTable = pgTable("category", {
  name: varchar("name").notNull(),
  icon: varchar("icon").notNull().default("❔"),
  private: boolean("private").notNull().default(false),
  ...baseMixin,
});

export const categoryUserTable = pgTable("category_user", {
  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => categoryTable.id),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => userTable.id),
  ...baseMixin,
});

export const userTable = pgTable("user", {
  userId: varchar("user_id").notNull(),
  email: varchar("email").unique(),
  ...baseMixin,
});
