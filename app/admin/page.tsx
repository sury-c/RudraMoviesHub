import { redirect } from 'next/navigation';
import { isAdmin } from '../../lib/auth';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  // Protect dashboard from unauthorized access
  if (!isAdmin()) {
    redirect('/admin/login');
  }

  return (
    <main className="min-h-screen bg-[#080b0a] text-white p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
              RUDRA MOVIES
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Manage your movie catalog
            </p>
          </div>

          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm text-lime-400">
            Admin Panel
          </span>
        </header>

        {/* Welcome Section */}
        <section className="mt-8 rounded-2xl border border-lime-400/30 bg-[#111613] p-6">
          <h2 className="text-2xl font-bold">
            Welcome to RUDRA MOVIES
          </h2>

          <p className="mt-3 text-gray-400">
            Your admin login is successful.
            Your dashboard is ready.
          </p>
        </section>

        {/* Dashboard Cards */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-[#111613] p-6">
            <div className="text-4xl">🎬</div>

            <h3 className="mt-4 text-xl font-bold">
              Movies
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Manage your movie collection.
            </p>

            <span className="mt-5 inline-block text-sm text-lime-400">
              Coming Soon
            </span>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#111613] p-6">
            <div className="text-4xl">➕</div>

            <h3 className="mt-4 text-xl font-bold">
              Add Movie
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Add new movies to your catalog.
            </p>

            <span className="mt-5 inline-block text-sm text-lime-400">
              Coming Soon
            </span>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#111613] p-6">
            <div className="text-4xl">⚙️</div>

            <h3 className="mt-4 text-xl font-bold">
              Settings
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Manage dashboard settings.
            </p>

            <span className="mt-5 inline-block text-sm text-lime-400">
              Coming Soon
            </span>
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RUDRA MOVIES
        </footer>

      </div>
    </main>
  );
}
