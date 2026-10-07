import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`[portal] missing env var ${name}`);
  return v;
}

/** Server-only client with the service_role key. NEVER import in client components. */
export function supabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(mustEnv("SUPABASE_URL"), mustEnv("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

/** Client-safe handle. Only used for the /api/health ping shape; all data access goes through server routes. */
export function supabasePublic(): SupabaseClient {
  if (!publicClient) {
    publicClient = createClient(mustEnv("SUPABASE_URL"), mustEnv("SUPABASE_ANON_KEY"), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return publicClient;
}

/** True when the portal database is configured. */
export function isPortalConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
