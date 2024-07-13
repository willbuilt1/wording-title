import type { PageServerLoad } from "./$types";
import { categories } from "$lib/db/db";

export const load = (async () => {
  return {
    categories,
  };
}) satisfies PageServerLoad;
