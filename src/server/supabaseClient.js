import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gnonzczxuhnuqkheukyc.supabase.co",
  process.env.SUPABASE_KEY
);
