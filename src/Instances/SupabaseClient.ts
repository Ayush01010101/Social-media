import { createClient } from "@supabase/supabase-js";

const SupabaseClient = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY)


export default SupabaseClient
