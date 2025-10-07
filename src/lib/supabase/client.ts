// Supabase Client for Client Components
// SECURITY: See SECURITY_ANALYSIS.md Section 2.2 - Secure database access

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
