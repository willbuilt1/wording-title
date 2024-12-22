import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { fail } from "@sveltejs/kit";

// Define outside the load function so the adapter can be cached
const schema = z.object({
  category: z.string().min(3),
  icon: z.string(),
  // words: z.array(z.string()),
});

export const load = async (event) => {
  const form = await superValidate(event, zod(schema));

  // Always return { form } in load functions
  return { form };
};

// export const actions = {
//   default: async (event) => {
//     // const data = await request.formData();
//     const form = await superValidate(event, zod(schema));
//     console.log(form);
//     if (!form.valid) {
//       console.log("here");
//       // Again, return { form } and things will just work.
//       return fail(400, { form });
//     }

//     // TODO: Do something with the validated form.data
//     // const icon = form.data.icon;
//     // const formCategory = form.data.category;

//     // await db.insert(category).values({ name: formCategory, icon });
//     // Display a success status message
//     return message(form, "Form posted successfully!");
//   },
// };

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(schema));
    console.log(form);

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    return { form };
  },
};
