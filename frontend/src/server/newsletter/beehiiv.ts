import { getBeehiivConfig } from './config';
import type { SubscriberSource } from './newsletter-types';

export const syncSubscriberToBeehiiv = async (email: string, source: SubscriberSource) => {
  const beehiivConfig = getBeehiivConfig();
  const endpoint = `${beehiivConfig.apiBaseUrl}/publications/${beehiivConfig.publicationId}/subscriptions`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${beehiivConfig.apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: beehiivConfig.automationIds.length === 0,
        utm_source: source,
        automation_ids: beehiivConfig.automationIds.length > 0 ? beehiivConfig.automationIds : undefined,
      }),
    });

    if (!response.ok) {
      const beehiivError = await response.text();
      return {
        status: 'failed' as const,
        message: beehiivError || 'Beehiiv sync failed.',
      };
    }

    return {
      status: 'sent' as const,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Beehiiv sync error';
    return {
      status: 'failed' as const,
      message,
    };
  }
};