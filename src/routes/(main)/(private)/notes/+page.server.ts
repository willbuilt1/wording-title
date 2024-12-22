import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({
  depends,
  locals: { supabase },
}) => {
  depends("supabase:db:notes");
  const { data: notes } = await supabase
    .from("notes")
    .select("id,note")
    .order("id");
  return { notes: notes ?? [] };
};

const schema = z.object({
  note: z.string().min(1),
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Display a success status message
    return message(form, "Form posted successfully!");
  },
};
