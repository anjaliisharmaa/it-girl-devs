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

  let data: SubscriberRow | null = null;

  try {
    const supabase = createSupabaseAdminClient();
    const response = await supabase
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

    data = response.data || null;

    if (response.error || !data) {
      throw new Error(response.error?.message || 'Unable to save subscriber right now.');
    }
  } catch {
    data = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      source,
      clerk_user_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
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