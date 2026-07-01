export type SubscriberSource = 'manifest_footer' | 'clerk_signup' | 'clerk_update' | 'system';

export type SubscribeInput = {
  email: string;
  source: SubscriberSource;
  clerkUserId?: string;
};

export type SubscriberRecord = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  updated_at: string;
  clerk_user_id: string | null;
};

export type SubscribeResult = {
  subscriber: SubscriberRecord;
  loopsSync: {
    status: 'sent' | 'skipped' | 'failed';
    message?: string;
  };
};