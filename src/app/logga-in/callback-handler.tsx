'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function CallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Check if there's a hash with auth tokens
      if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');

        if (accessToken) {
          console.log('Auth tokens found in URL, checking session...');

          // Session is automatically set by Supabase client
          const { data: { session } } = await supabase.auth.getSession();

          if (session) {
            console.log('Session confirmed, redirecting to dashboard');
            router.push('/dashboard');
          }
        }
      }
    };

    handleAuthCallback();
  }, [router]);

  return null;
}
