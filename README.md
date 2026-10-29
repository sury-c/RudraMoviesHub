# RUDRA MOVIES — Secure Admin starter

## Features
- Existing dark/neon movie catalog design.
- Separate `/admin/login` page with server-checked username/password.
- HTTP-only signed session cookie; the admin CRUD API checks the session server-side.
- Movie catalog saved in Supabase so admin changes can appear for all visitors.
- Add/edit/delete movie, poster URL, synopsis, cast and authorized destination/short link.

## Important
This starter requires Supabase and Vercel environment variables before the admin features work. Do not commit `.env` values, API keys, service-role keys, or passwords. Use only movie files and destinations you own, are licensed to distribute, or official streaming pages.

## Setup (mobile-friendly)
1. Create a Supabase project at https://supabase.com/.
2. In Supabase, open SQL Editor, paste and run `supabase/schema.sql`.
3. In Supabase Project Settings → API, copy Project URL and `service_role` key. Keep the service-role key secret.
4. Upload project files to the root of a GitHub repository (the `app`, `lib`, `supabase` folders and package/config files).
5. Import the repository in Vercel. Framework: Next.js. Root Directory: `./`. Do not set Output Directory to `public`.
6. Vercel → Project Settings → Environment Variables: add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Use your own strong unique values. For `SESSION_SECRET`, use a random secret of at least 32 characters.
7. Redeploy the project.
8. Open `/admin/login` on your website and sign in using the username/password you configured in Vercel.

## Notes
- Admin login is not configured until environment variables are set.
- Supabase data is shared across visitors; browser localStorage is not used for admin edits.
- The public catalog uses the demo list if the database is empty or unavailable.
- Never share your admin password, SESSION_SECRET, or Supabase service-role key in chat or screenshots.
