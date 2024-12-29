import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { eq } from "drizzle-orm";
import { category, word, wordCategory } from "$lib/db/schema";

export const load = (async ({ params, url }) => {
  const categoryId = parseInt(params.id);

  const cat = await db.query.category.findFirst({
    where: eq(category.id, categoryId),
  });

  const words = await db
    .select({ id: word.id, word: word.word })
    .from(wordCategory)
    .innerJoin(word, eq(wordCategory.wordId, word.id))
    .innerJoin(category, eq(wordCategory.categoryId, category.id))
    .where(eq(category.id, categoryId))
    .limit(10);

  return {
    words,
    category: cat?.name,
  };
}) satisfies PageServerLoad;
