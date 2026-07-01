import { NextResponse } from 'next/server';
import { subscribeEmail } from '@/server/newsletter/service';
import type { SubscriberSource } from '@/server/newsletter/newsletter-types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      source?: SubscriberSource;
    };

    if (!body?.email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const result = await subscribeEmail({
      email: body.email,
      source: body.source || 'manifest_footer',
    });

    return NextResponse.json(
      {
        message: 'You are subscribed. Welcome to The Manifest.',
        subscriber: result.subscriber,
        loopsSync: result.loopsSync,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to subscribe right now.';

    return NextResponse.json({ message }, { status: 400 });
  }
}