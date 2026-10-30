# RUDRA MOVIES

Premium black-and-gold movie catalog built with Next.js 14, TypeScript and Supabase.

## Features
- Live public catalog connected to `public.movies`
- Search and language filters
- Movie detail dialog and optional authorized destination link
- Signed-cookie protected admin login
- Admin add, edit and delete actions
- Poster upload from a phone to the `movie-posters` Supabase Storage bucket
- Responsive black-and-gold design

## Required Vercel environment variables
Set these in **Vercel → Project → Settings → Environment Variables**:

- `SUPABASE_URL` — Supabase project URL (root URL, no `/rest/v1/` suffix)
- `SUPABASE_SERVICE_ROLE_KEY` — service-role key; server-only, never expose it in browser code
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_SECRET` — long random secret, keep private

After changing environment variables, redeploy the project.

## Supabase setup
1. Open SQL Editor and run `supabase/schema.sql` if SQL execution is available. If the project was already created with the Table Editor, ensure the columns listed below exist.
2. In Storage, create a bucket named `movie-posters` and set it to **Public**. Public is needed only to display poster images by their URLs; do not add public upload/update/delete policies.
3. The admin uploads posters through a server action after admin-session verification.

The `public.movies` table columns used by this application are:
`id`, `created_at`, `title`, `description`, `poster_url`, `category`, `release_year`, `language`, `content_url`.

## Local development
```bash
npm install
npm run dev
```

## Deploy
Upload the project files to the connected GitHub repository or replace the repository contents, then let Vercel build and deploy. Do not upload `.env` files or secret keys.

## Content rights
Only add viewing or download destinations for content you own or are authorized to distribute. Use official or licensed destinations for third-party films.
