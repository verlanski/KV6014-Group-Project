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
// Our login page logs in through the backend and saves the token in
// localStorage as "access_token", so we read that first. If it isn't there,
// we fall back to a Supabase session in the browser (if one exists).
export async function getAccessToken() {
  try {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) return savedToken;
  } catch {
    // localStorage can be blocked (e.g. private browsing) - just carry on.
  }

  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ? data.session.access_token : null;
}
