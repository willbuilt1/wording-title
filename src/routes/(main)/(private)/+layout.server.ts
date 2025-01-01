/**
 * This file is necessary to ensure protection of all routes in the `private`
 * directory. It makes the routes in this directory _dynamic_ routes, which
 * send a server request, and thus trigger `hooks.server.ts`.
 **/
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    redirect(303, "/login");
  }
};
