import { createClient } from '@supabase/supabase-js';

// Extract base URL from the NEXT_PUBLIC_SUPABASE_URL by removing /rest/v1/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types for TypeScript support
export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'locked' | 'in-progress' | 'mastered';
  updated_at: string;
};


