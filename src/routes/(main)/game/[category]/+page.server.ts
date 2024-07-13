import type { PageServerLoad } from "./$types";

export const load = (async ({ params, url }) => {
  const colour = url.searchParams.get("colour");
  console.log(params);
  // .innerJoin(wordCategories, eq(words.id, wordCategories.wordId));s
  return { colour };
}) satisfies PageServerLoad;
