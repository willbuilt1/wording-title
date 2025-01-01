import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { categoryTable } from "$lib/db/schema";

export const load = (async () => {
  const categories = await db
    .select({
      id: categoryTable.id,
      name: categoryTable.name,
      icon: categoryTable.icon,
    })
    .from(categoryTable)
    .orderBy(categoryTable.id);

  return {
    categories,
  };
}) satisfies PageServerLoad;
