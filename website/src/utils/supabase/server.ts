"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "./database";
import { auth } from "@clerk/nextjs/server";

export async function createClient() {
  const cookieStore = await cookies();
  const { getToken, userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const token = await getToken();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
