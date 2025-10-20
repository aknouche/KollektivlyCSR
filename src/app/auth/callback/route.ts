// Auth Callback Handler
// Handles magic link redirects from email

export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  // Supabase sends either 'code' (PKCE flow) or 'token_hash' (magic link)
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');

  console.log('Auth callback params:', { code, token_hash, type, url: request.url });

  if (token_hash && type) {
    const supabase = createClient();

    // Verify OTP for magic link
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'email' | 'recovery' | 'invite' | 'magiclink' | 'email_change',
    });

    if (error) {
      console.error('Magic link verification error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/logga-in?error=verification_failed`);
    }

    // Successful login - redirect to dashboard
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  if (code) {
    const supabase = createClient();

    // Exchange code for session (PKCE flow)
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/logga-in?error=authentication_failed`);
    }

    // Successful login - redirect to dashboard
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  // No code or token provided - redirect to login
  console.log('No auth params found, redirecting to login');
  return NextResponse.redirect(`${requestUrl.origin}/logga-in`);
}
