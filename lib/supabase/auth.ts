import { createClient } from "@supabase/supabase-js";

/**
 * Verifies a Supabase Auth JWT from the Authorization header.
 * Returns the user, or null if missing/invalid.
 */
export async function getUserFromRequest(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) return null;
  const token = header.slice(7);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const supabase = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data.user;
}
