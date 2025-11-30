import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Support both variable names
  const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Don't throw - return a client that will fail gracefully on API calls
    // This prevents the app from crashing on initial load
    console.error(
      '⚠️ Missing Supabase environment variables!\n' +
      'Please add these to your Vercel project settings:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL\n' +
      '- NEXT_PUBLIC_SUPABASE_ANON_KEY\n\n' +
      'Go to: Vercel Dashboard → Your Project → Settings → Environment Variables'
    );
    // Return a client with placeholder values - API calls will fail but app won't crash
    return createBrowserClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

