import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { eq } from "drizzle-orm";
import { categoryTable, wordTable, wordCategoryTable } from "$lib/db/schema";

export const load = (async ({ params, url }) => {
  const categoryId = parseInt(params.id);

  const cat = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.id, categoryId),
  });

  const words = await db
    .select({ id: wordTable.id, word: wordTable.word })
    .from(wordCategoryTable)
    .innerJoin(wordTable, eq(wordCategoryTable.wordId, wordTable.id))
    .innerJoin(
      categoryTable,
      eq(wordCategoryTable.categoryId, categoryTable.id),
    )
    .where(eq(categoryTable.id, categoryId))
    .limit(10);

  return {
    words,
    category: cat?.name,
  };
}) satisfies PageServerLoad;
