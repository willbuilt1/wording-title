import type { PageServerLoad } from "./$types";
import { words } from "$lib/db/db";

export const load = (async ({ params }) => {
  const category = params.category as keyof typeof words;

  return {
    words: words[category].map((word) => word.name),
  };
}) satisfies PageServerLoad;
