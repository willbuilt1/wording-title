import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
const schema = z.object({
  name: z.string().default("Hello world!"),
  email: z.string().email(),
});

export const load = async () => {
  const form = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { form };
};

import { message } from "sveltekit-superforms";
import { fail } from "@sveltejs/kit";

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
