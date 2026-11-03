// Supabase client for the browser.
// Only uses the PUBLISHABLE key - the secret key must stay in the backend .env.
// Set these in a .env file in the project root (next to package.json):
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_PUBLISHABLE_KEY=...

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// If the values are missing the client is null, and pages can show a
// "please log in" message instead of crashing.
export const supabase = url && key ? createClient(url, key) : null;

// Returns the logged-in user's access token, or null if nobody is logged in.
export async function getAccessToken() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ? data.session.access_token : null;
}
