import { superValidate, message, setError } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/db";
import {
  category as categorySchema,
  word as wordSchema,
  wordCategory as wordCategorySchema,
} from "$lib/db/schema";

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
  default: async (event) => {
    // const data = await request.formData();
    const form = await superValidate(event, zod(schema));
    console.log(form);
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
          .values({ name: formCategory, icon })
          .returning();

        const wordIds = await tx
          .insert(wordSchema)
          .values(words.map((word) => ({ word })))
          .returning()
          .then((res) => res.map((r) => r.id));

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
