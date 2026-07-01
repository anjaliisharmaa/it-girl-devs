import { NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { subscribeEmail } from '@/server/newsletter/service';

type ClerkWebhookEvent = {
  type?: string;
  data?: {
    email_addresses?: Array<{ email_address?: string; id?: string }>;
    email_address?: string;
  };
};

const getPrimaryEmail = (event: ClerkWebhookEvent) => {
  const addresses = event.data?.email_addresses || [];
  return addresses.find((address) => address.email_address)?.email_address || event.data?.email_address || '';
};

export async function POST(request: Request) {
  const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!signingSecret) {
    return NextResponse.json({ message: 'Webhook signing secret is not configured.' }, { status: 500 });
  }

  try {
    const payload = await request.text();
    const headerPayload = Object.fromEntries(request.headers.entries());
    const webhook = new Webhook(signingSecret);
    const event = webhook.verify(payload, headerPayload) as ClerkWebhookEvent;

    if (event.type === 'user.created' || event.type === 'user.updated') {
      const email = getPrimaryEmail(event);

      if (email) {
        const result = await subscribeEmail({
          email,
          source: event.type === 'user.created' ? 'clerk_signup' : 'clerk_update',
        });

        return NextResponse.json(
          {
            message: 'Subscriber synced successfully.',
            loopsSync: result.loopsSync,
          },
          { status: 200 },
        );
      }
    }

    return NextResponse.json({ message: 'Event received.' }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook verification failed.';

    return NextResponse.json({ message }, { status: 400 });
  }
}