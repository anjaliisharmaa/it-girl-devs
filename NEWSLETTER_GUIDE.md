# Newsletter Implementation Guide

## What the app already does

The newsletter feature is wired so the same email can come in from two places and still end up as one subscriber record in Supabase:

- The footer "The Manifest" form submits a guest email.
- Clerk user creation and profile updates also sync the same email.
- Supabase remains the master list.
- Beehiiv is the newsletter platform that receives the synced subscriber.

## Files that were implemented or renamed

- `frontend/src/components/layout/Footer.tsx` - footer form UI and submit handler.
- `frontend/src/app/api/newsletter/subscribe/route.ts` - guest subscription endpoint.
- `frontend/src/app/api/clerk/webhook/route.ts` - Clerk webhook receiver.
- `frontend/src/server/newsletter/service.ts` - shared subscribe flow.
- `frontend/src/server/newsletter/config.ts` - server environment config.
- `frontend/src/server/newsletter/supabase-admin.ts` - Supabase admin client.
- `frontend/src/server/newsletter/normalize.ts` - email normalization.
- `frontend/src/server/newsletter/beehiiv.ts` - Beehiiv sync adapter.
- `frontend/src/server/newsletter/types.ts` - shared newsletter types.

## What you still need to do manually

### 1. Create a Beehiiv account

If you do not already have one:

1. Open Beehiiv in your browser.
2. Click the sign up button.
3. Create the account with your email.
4. Verify your email if Beehiiv sends a confirmation message.
5. Log in to the Beehiiv dashboard.

### 2. Create or confirm your Beehiiv publication

Beehiiv organizes newsletters around a publication.

1. In the Beehiiv dashboard, open the workspace area.
2. Create a publication if one does not already exist.
3. Open the publication settings.
4. Copy the publication ID.

You will need that publication ID for the app environment variables.

### 3. Create a Beehiiv API key

This is the secret token your app will use to add subscribers.

1. In Beehiiv, go to `Settings`.
2. Open `API` under workspace settings.
3. Click `Create New API Key`.
4. Save the key somewhere safe immediately.
5. If Beehiiv asks you to verify your identity, complete that step.

Important:
- The key is only shown once in full.
- Treat it like a password.
- Keep it server-side only.

### 4. Create the Beehiiv automation you want for welcome emails

This replaces the earlier welcome-email platform behavior.

1. In Beehiiv, open `Automations`.
2. Create a new automation.
3. Choose a trigger such as `Add by API`.
4. Build the welcome email you want new subscribers to receive.
5. Save the automation.
6. Copy the automation ID.

If you want the app to enroll every new subscriber into that automation automatically, you will place the automation ID in the environment file.

### 5. Decide whether you want Beehiiv to send the welcome email immediately or through automation

Recommended setup for your case:

- Use Beehiiv automation for the welcome email.
- Keep broadcasts manual in Beehiiv.
- Keep Supabase as the source of truth.

That keeps the app behavior closest to what you already wanted.

### 6. Update `frontend/.env.local`

Add these values:

```bash
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
BEEHIIV_API_KEY=your-beehiiv-api-key
BEEHIIV_PUBLICATION_ID=your-beehiiv-publication-id
BEEHIIV_AUTOMATION_IDS=automation_id_1,automation_id_2
CLERK_WEBHOOK_SIGNING_SECRET=your-clerk-webhook-signing-secret
```

Notes:
- `BEEHIIV_AUTOMATION_IDS` can be one ID or multiple IDs separated by commas.
- If you have no automation yet, leave it blank for now.
- Do not put real secrets in frontend UI code.

### 7. Create the Supabase table if you have not already

Run this SQL in Supabase:

```sql
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text null,
  clerk_user_id text null
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_subscribers_updated_at on public.subscribers;
create trigger set_subscribers_updated_at
before update on public.subscribers
for each row
execute function public.set_updated_at();

grant all on table public.subscribers to service_role;
```

### 8. Set up Clerk webhooks

This keeps account creation synced into the same subscriber list.

1. Open the Clerk dashboard.
2. Go to the webhook settings.
3. Create a new webhook endpoint.
4. Set the URL to `https://your-domain.com/api/clerk/webhook`.
5. Subscribe to these events:
   - `user.created`
   - `user.updated`
6. Copy the webhook signing secret.
7. Put that secret into `frontend/.env.local`.

### 9. Restart the app after environment changes

If you changed `.env.local`, restart the dev server:

1. Stop the current dev process.
2. Run `npm run dev` again in `frontend`.

You only need `npm run build` when you want to check production compilation.

## How to test the newsletter

### Test 1: Footer signup

1. Open the site locally.
2. Scroll to the footer.
3. Type an email into `The Manifest` field.
4. Click `Claim It`.
5. Confirm the success message appears.
6. Open Supabase table editor.
7. Confirm one row exists in `subscribers`.

### Test 2: Duplicate prevention

1. Submit the same email again from the footer.
2. Confirm Supabase still shows only one row.
3. Confirm the app shows a success or already-subscribed style response rather than an error.

### Test 3: Clerk signup sync

1. Create a new user through Clerk sign up.
2. Confirm Clerk sends the webhook event.
3. Check Supabase again.
4. Confirm the same email is still one row only.

### Test 4: Updated timestamp trigger

1. Open a row in `subscribers`.
2. Update a field in Supabase manually.
3. Save it.
4. Confirm `updated_at` changes.
5. Confirm `created_at` stays the same.

### Test 5: Beehiiv sync

1. Add a new email through the footer.
2. Confirm the subscriber appears in Beehiiv.
3. If you set `BEEHIIV_AUTOMATION_IDS`, confirm the welcome automation is triggered.
4. If you did not set automation IDs, confirm the subscriber still gets created successfully.

## Why this does not break existing behavior

- The footer form still exists in the same place.
- The Clerk webhook route still exists in the same place.
- Supabase still stores one master subscriber row.
- Duplicate emails still collapse into one record.
- The user-facing UI still behaves the same.
- Only the downstream newsletter provider changed.

## Notes

- Beehiiv’s API key lives in Beehiiv workspace settings under `API`.
- The app does not need a paid custom domain just to accept newsletter signups through the API.
- If Beehiiv returns a different response for existing subscribers, the app still treats the Supabase write as the authoritative step.
- If you change any Beehiiv or Clerk secrets, restart the dev server before testing.
