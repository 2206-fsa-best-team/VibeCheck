import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gnonzczxuhnuqkheukyc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdub256Y3p4dWhudXFraGV1a3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA3NDkyODQsImV4cCI6MTk3NjMyNTI4NH0.Ea1WrKc0rB4X8kg628H5Vp4FkdBTGpqoEhOJH_xErZ0"
);
