import { db } from "$lib/db";
import { userTable } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export async function getOrCreateUser(locals: App.Locals) {
  const { user } = await locals.safeGetSession();

  if (!user) return null;

  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.userId, user.id),
  });

  if (existingUser) return existingUser;

  const newUser = await db
    .insert(userTable)
    .values({
      userId: user.id,
      email: user.email,
    })
    .returning();

  return newUser[0];
}
