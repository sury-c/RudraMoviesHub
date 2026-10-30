import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '../../lib/auth';
import { db } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function addMovie(formData: FormData) {
  'use server';

  if (!isAdmin()) redirect('/admin/login');

  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const poster_url = String(formData.get('poster_url') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const language = String(formData.get('language') || '').trim();
  const content_url = String(formData.get('content_url') || '').trim();
  const release_year = Number(formData.get('release_year'));

  if (!title || !language || !Number.isInteger(release_year)) {
    throw new Error('Please fill in the required fields.');
  }

  const { error } = await db().from('movies').insert({
    title,
    description,
    poster_url,
    category,
    language,
    release_year,
    content_url,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin');
  revalidatePath('/');
}

async function deleteMovie(formData: FormData) {
  'use server';

  if (!isAdmin()) redirect('/admin/login');

  const id = Number(formData.get('id'));
  if (!Number.isSafeInteger(id)) throw new Error('Invalid movie ID.');

  const { error } = await db().from('movies').delete().eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin');
  revalidatePath('/');
}

export default async function AdminDashboard() {
  if (!isAdmin()) redirect('/admin/login');

  const { data: movies, error } = await db()
    .from('movies')
    .select('id,title,description,poster_url,category,release_year,language,content_url,created_at')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#080b0a] text-white p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">

        <header className="border-b border-gray-800 pb-6">
          <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
            RUDRA MOVIES
          </p>
          <h1 className="mt-3 text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your movie catalog</p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-[#111613] p-5">
            <p className="text-gray-400">Total Movies</p>
            <p className="mt-2 text-3xl font-bold text-lime-400">
              {movies?.length || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-[#111613] p-5">
            <p className="text-gray-400">Admin Status</p>
            <p className="mt-2 text-xl font-bold text-lime-400">Authenticated</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-800 bg-[#111613] p-6">
          <h2 className="text-xl font-bold">Add New Movie</h2>

          <form action={addMovie} className="mt-5 grid gap-4 sm:grid-cols-2">
            <input name="title" required placeholder="Movie title"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white" />

            <input name="release_year" type="number" required
              placeholder="Release year" defaultValue="2026"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white" />

            <input name="language" required placeholder="Language"
              defaultValue="Kannada"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white" />

            <input name="category" placeholder="Category"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white" />

            <input name="poster_url" placeholder="Poster image URL"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white sm:col-span-2" />

            <textarea name="description" placeholder="Movie description"
              rows={3}
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white sm:col-span-2" />

            <input name="content_url" type="url"
              placeholder="Authorized content URL (optional)"
              className="rounded-lg border border-gray-700 bg-[#080b0a] p-3 text-white sm:col-span-2" />

            <button type="submit"
              className="rounded-lg bg-lime-400 p-3 font-bold text-black sm:col-span-2">
              + Add Movie
            </button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold">Your Movies</h2>

          {error && (
            <p className="rounded-lg bg-red-900/30 p-4 text-red-300">
              Could not load movies: {error.message}
            </p>
          )}

          {!error && (!movies || movies.length === 0) && (
            <p className="rounded-xl border border-gray-800 p-6 text-gray-400">
              No movies added yet.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {movies?.map((movie) => (
              <div key={movie.id}
                className="rounded-xl border border-gray-800 bg-[#111613] p-5">

                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  {movie.language} · {movie.release_year}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {movie.category}
                </p>

                <form action={deleteMovie} className="mt-4">
                  <input type="hidden" name="id" value={movie.id} />
                  <button type="submit"
                    className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400">
                    Delete Movie
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RUDRA MOVIES
        </footer>
      </div>
    </main>
  );
}
