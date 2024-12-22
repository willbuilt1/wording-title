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
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  // default: async ({ request }) => {
  //   const form = await superValidate(request, zod(schema));
  //   console.log(form);

  //   if (!form.valid) {
  //     // Again, return { form } and things will just work.
  //     return fail(400, { form });
  //   }

  //   // TODO: Do something with the validated form.data

  //   // Display a success status message
  //   return message(form, "Form posted successfully!");
  // },
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      redirect(303, "/auth/error");
    } else {
      redirect(303, "/");
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      redirect(303, "/auth/error");
    } else {
      redirect(303, "/");
    }
  },
};
