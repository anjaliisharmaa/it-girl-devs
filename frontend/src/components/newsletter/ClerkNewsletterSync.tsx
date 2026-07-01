'use client';

import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ClerkNewsletterSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const syncedEmailRef = useRef<string | null>(null);

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!isLoaded || !isSignedIn || !email) {
      return;
    }

    if (syncedEmailRef.current === email) {
      return;
    }

    syncedEmailRef.current = email;

    const syncNewsletterSubscriber = async () => {
      try {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            source: 'clerk_signup',
          }),
        });
      } catch {
        // Keep auth and page rendering unaffected if newsletter sync fails.
      }
    };

    syncNewsletterSubscriber();
  }, [isLoaded, isSignedIn, user?.primaryEmailAddress?.emailAddress]);

  return null;
}