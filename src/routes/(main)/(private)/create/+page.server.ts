import { superValidate, message, setError } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/db";
import {
  categoryTable as categorySchema,
  wordTable as wordSchema,
  wordCategoryTable as wordCategorySchema,
  categoryUserTable as categoryUserSchema,
} from "$lib/db/schema";
import { getUser } from "$lib/utils/auth.js";
import { error } from "console";

// Define outside the load function so the adapter can be cached
const schema = z.object({
  category: z.string().min(3),
  icon: z.string(),
  words: z.array(z.string()),
});

export const load = async (event) => {
  const form = await superValidate(event, zod(schema));
  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request, locals }) => {
    // const data = await request.formData();
    const user = await getUser(locals);
    if (!user) {
      return error(401, "Unauthorized");
    }
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data
    const icon = form.data.icon;
    const formCategory = form.data.category;
    const words = form.data.words;

    try {
      await db.transaction(async (tx) => {
        const newCategory = await tx
          .insert(categorySchema)
          .values({ name: formCategory, icon, private: true })
          .returning();

        const wordIds = await tx
          .insert(wordSchema)
          .values(words.map((word) => ({ word })))
          .returning()
          .then((res) => res.map((r) => r.id));

        await tx.insert(categoryUserSchema).values({
          categoryId: newCategory[0].id,
          userId: user.id,
        });
        await tx.insert(wordCategorySchema).values(
          wordIds.map((wordId) => ({
            wordId,
            categoryId: newCategory[0].id,
          })),
        );
      });
    } catch (e) {
      throw new Error("Failed to insert data");
    }

    // Display a success status message
    return message(form, "Form posted successfully!");
  },
};
