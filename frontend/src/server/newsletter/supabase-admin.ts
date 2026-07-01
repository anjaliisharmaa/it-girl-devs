import { createClient } from '@supabase/supabase-js';
import { getSupabaseServerConfig } from './config';

export const createSupabaseAdminClient = () => {
  const { url, serviceRoleKey } = getSupabaseServerConfig();

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};