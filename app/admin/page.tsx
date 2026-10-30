
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '../../lib/auth';
import { db } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function addMovie(formData: FormData) {
  'use server';

  if (!isAdmin()) redirect('/admin/login');

  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const language = String(formData.get('language') || '').trim();
  const year = Number(formData.get('release_year'));
  const poster = String(formData.get('poster_url') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const contentUrl = String(formData.get('content_url') || '').trim();

  if (!title) throw new Error('Movie title is required');

  const { error } = await db().from('movies').insert({
    title,
    category: category || null,
    language: language || null,
    release_year: Number.isFinite(year) && year > 0 ? year : null,
    poster_url: poster || null,
    description: description || null,
    content_url: contentUrl || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin');
}

async function deleteMovie(formData: FormData) {
  'use server';

  if (!isAdmin()) redirect('/admin/login');

  const id = Number(formData.get('id'));
  if (!Number.isInteger(id) || id < 1) throw new Error('Invalid movie ID');

  const { error } = await db().from('movies').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/admin');
}

export default async function AdminDashboard() {
  if (!isAdmin()) redirect('/admin/login');

  const { data: movies, error } = await db()
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#080b0a] p-5 text-white sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-gray-800 pb-6">
          <p className="font-bold tracking-[0.3em] text-lime-400">RUDRA MOVIES</p>
          <h1 className="mt-3 text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your authorized movie catalog</p>
        </header>

        <section className="mt-8 rounded-2xl border border-lime-400/30 bg-[#111613] p-6">
          <h2 className="text-2xl font-bold">Add New Movie</h2>
          <form action={addMovie} className="mt-5 grid gap-4 sm:grid-cols-2">
            <input name="title" required placeholder="Movie title" className="rounded-lg bg-gray-900 p-3" />
            <input name="category" placeholder="Category" className="rounded-lg bg-gray-900 p-3" />
            <input name="language" placeholder="Language" className="rounded-lg bg-gray-900 p-3" />
            <input name="release_year" type="number" placeholder="Release year" className="rounded-lg bg-gray-900 p-3" />
            <input name="poster_url" type="url" placeholder="Poster image URL" className="rounded-lg bg-gray-900 p-3 sm:col-span-2" />
            <textarea name="description" placeholder="Description" className="min-h-24 rounded-lg bg-gray-900 p-3 sm:col-span-2" />
            <input name="content_url" type="url" placeholder="Authorized watch/download URL" className="rounded-lg bg-gray-900 p-3 sm:col-span-2" />
            <button className="rounded-lg bg-lime-400 p-3 font-bold text-black sm:col-span-2">
              Add Movie
            </button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Movies ({movies?.length ?? 0})</h2>

          {error && (
            <p className="mt-4 rounded-lg bg-red-950 p-4 text-red-300">
              Database error: {error.message}
            </p>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movies?.map((movie) => (
              <article key={movie.id} className="rounded-xl border border-gray-800 bg-[#111613] p-4">
                {movie.poster_url && (
                  <img src={movie.poster_url} alt="" className="mb-3 h-48 w-full rounded-lg object-cover" />
                )}
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {movie.language || 'Language not set'} · {movie.release_year || 'Year not set'}
                </p>
                <p className="mt-2 text-sm text-gray-400">{movie.category || 'No category'}</p>
                <form action={deleteMovie} className="mt-4">
                  <input type="hidden" name="id" value={movie.id} />
                  <button className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-300">
                    Delete
                  </button>
                </form>
              </article>
            ))}
          </div>

          {(!movies || movies.length === 0) && !error && (
            <p className="mt-4 text-gray-400">No movies added yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
