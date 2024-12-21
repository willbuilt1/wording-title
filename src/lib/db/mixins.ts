import { integer, timestamp } from "drizzle-orm/pg-core";

export const baseMixin = {
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  created_at: timestamp().defaultNow().notNull(),
};
