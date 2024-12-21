import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";

const client = postgres(env.VITE_DATABASE_URL);
export const db = drizzle(client, { schema });
