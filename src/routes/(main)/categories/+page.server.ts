import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/index";
import { categoryTable, categoryUserTable } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { getUser } from "$lib/utils/auth";

export const load = (async ({ locals }) => {
  const user = await getUser(locals);
  const categories = await db
    .select({
      id: categoryTable.id,
      name: categoryTable.name,
      icon: categoryTable.icon,
    })
    .from(categoryTable)
    .where(eq(categoryTable.private, false))
    .orderBy(categoryTable.id);

  let userCategoryIds: { id: number; name: string; icon: string }[] = [];
  if (user) {
    userCategoryIds = await db
      .select({
        id: categoryTable.id,
        name: categoryTable.name,
        icon: categoryTable.icon,
      })
      .from(categoryTable)
      .leftJoin(
        categoryUserTable,
        eq(categoryUserTable.categoryId, categoryTable.id),
      )
      .where(eq(categoryUserTable.userId, user.id));
  }

  const displayCategories = [...categories, ...userCategoryIds];

  return {
    categories: displayCategories,
  };
}) satisfies PageServerLoad;
