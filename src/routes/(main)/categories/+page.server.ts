import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { category } from "$lib/db/schema";

export const load = (async () => {
  const categories = await db
    .select({ id: category.id, name: category.name, icon: category.icon })
    .from(category)
    .orderBy(category.id);

  return {
    categories,
  };
}) satisfies PageServerLoad;
