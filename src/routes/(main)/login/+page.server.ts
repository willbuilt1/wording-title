import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { message } from "sveltekit-superforms";
import { error, fail, redirect } from "@sveltejs/kit";
import { getOrCreateUser } from "$lib/utils/auth";

// Define outside the load function so the adapter can be cached
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const load = async () => {
  const form = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  signup: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));
    const email = form.data.email;
    const password = form.data.password;

    if (!form.valid) {
      return fail(400, { form });
    }
    const { error } = await locals.supabase.auth.signUp({ email, password });
    if (error) {
      return message(form, error.message);
    } else {
      await getOrCreateUser(locals);
      redirect(303, "/");
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(schema));
    const email = form.data.email;
    const password = form.data.password;

    if (!form.valid) {
      return fail(400, { form });
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return message(form, { type: "error", message: error.message });
    } else {
      redirect(303, "/");
    }
  },
  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    if (session) {
      await supabase.auth.signOut();
      redirect(303, "/");
    }
  },
};
