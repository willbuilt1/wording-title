import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { category } from "$lib/db/schema";
import { asc } from "drizzle-orm";

export const load = (async () => {
  const categories = await db.query.category.findMany({
    orderBy: [asc(category.id)],
  });

  return {
    categories,
  };
}) satisfies PageServerLoad;
