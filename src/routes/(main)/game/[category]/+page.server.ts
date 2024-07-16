import type { PageServerLoad } from "./$types";
import { words } from "$lib/db/db";

export const load = (async ({ params, url }) => {
  const colour = url.searchParams.get("colour");
  const category = params.category as keyof typeof words;

  return {
    words: words[category].map((word) => word.name),
    colour,
  };
}) satisfies PageServerLoad;
