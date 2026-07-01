const missingEnvironmentValue = (name: string) => {
  throw new Error(`Missing required environment variable: ${name}`);
};

const normalizePublicationId = (publicationId: string) => {
  const trimmedPublicationId = publicationId.trim();

  if (trimmedPublicationId.startsWith('pub_')) {
    return trimmedPublicationId;
  }

  return `pub_${trimmedPublicationId}`;
};

export const getSupabaseServerConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    missingEnvironmentValue('NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!serviceRoleKey) {
    missingEnvironmentValue('SUPABASE_SERVICE_ROLE_KEY');
  }

  return {
    url,
    serviceRoleKey,
  };
};

export const getBeehiivConfig = () => {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey) {
    missingEnvironmentValue('BEEHIIV_API_KEY');
  }

  if (!publicationId) {
    missingEnvironmentValue('BEEHIIV_PUBLICATION_ID');
  }

  return {
    apiKey,
    publicationId: normalizePublicationId(publicationId),
    automationIds: (process.env.BEEHIIV_AUTOMATION_IDS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
    apiBaseUrl: process.env.BEEHIIV_API_BASE_URL || 'https://api.beehiiv.com/v2',
  };
};
