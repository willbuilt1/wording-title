import { getOrCreateUser } from "$lib/utils/auth";

export const load = async ({ locals }) => {
  const userProfile = await getOrCreateUser(locals);
  return { userProfile };
};
