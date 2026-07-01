import { createSupabaseAdminClient } from './supabase-admin';
import { isValidEmail, normalizeEmail } from './normalize';
import { syncSubscriberToBeehiiv } from './beehiiv';
import type { SubscribeInput, SubscribeResult } from './newsletter-types';

type SubscriberRow = {
  id: string;
  email: string;
  source: string | null;
  clerk_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export const subscribeEmail = async ({ email, source }: SubscribeInput): Promise<SubscribeResult> => {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .upsert(
      {
        email: normalizedEmail,
      },
      {
        onConflict: 'email',
      },
    )
    .select('id, email, source, clerk_user_id, created_at, updated_at')
    .single<SubscriberRow>();

  if (error || !data) {
    throw new Error(error?.message || 'Unable to save subscriber right now.');
  }

  const loopsSync = await syncSubscriberToBeehiiv(data.email, source);

  return {
    subscriber: {
      ...data,
      source: data.source ?? source,
      clerk_user_id: data.clerk_user_id,
    },
    loopsSync,
  };
};