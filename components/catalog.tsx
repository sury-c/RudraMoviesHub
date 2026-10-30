'use client';

import { useMemo, useState } from 'react';

type Movie = {
  id: number; title: string; description: string | null; poster_url: string | null;
  category: string | null; release_year: number | null; language: string | null; content_url: string | null;
};

export default function Catalog({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('All');
  const [selected, setSelected] = useState<Movie | null>(null);
  const languages = useMemo(() => ['All', ...Array.from(new Set(movies.map(m => m.language).filter((x): x is string => Boolean(x)))).sort()], [movies]);
  const filtered = useMemo(() => movies.filter(m => (language === 'All' || m.language === language) && `${m.title} ${m.category ?? ''} ${m.language ?? ''}`.toLowerCase().includes(query.toLowerCase())), [movies, language, query]);

  return <>
    <section className="catalog" id="catalog">
      <div className="section-head"><div><div className="eyebrow">THE COLLECTION</div><h2>Find your <em>next.</em></h2><p>Explore films and stories selected for curious minds.</p></div><div className="count-pill">{String(filtered.length).padStart(2, '0')} TITLES</div></div>
      <div className="catalog-tools"><div className="filters" role="group" aria-label="Filter by language">{languages.map(lang => <button key={lang} className={language === lang ? 'filter active' : 'filter'} onClick={() => setLanguage(lang)}>{lang}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search titles, genres, languages..."/><button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button></label></div>
      <div className="catalog-meta"><span>SHOWING {String(filtered.length).padStart(2, '0')} TITLES</span><span>RUDRA MOVIES / CATALOG</span></div>
      {filtered.length ? <div className="movie-grid">{filtered.map((movie, index) => <article className="movie-card" key={movie.id}>
        <button className="poster" onClick={() => setSelected(movie)} aria-label={`View details for ${movie.title}`}>
          {movie.poster_url ? <img src={movie.poster_url} alt={`${movie.title} poster`} loading="lazy" /> : <span className="poster-fallback"><small>RUDRA SELECTS / {String(index + 1).padStart(2, '0')}</small><b>R</b><i>ARTWORK PENDING</i></span>}
          <span className="poster-open">↗</span>
        </button>
        <div className="movie-info"><button className="movie-title" onClick={() => setSelected(movie)}>{movie.title}</button><span className="movie-year">{movie.release_year ?? '—'}</span></div>
        <div className="movie-sub">{movie.language || 'Language TBA'} <span>•</span> {movie.category || 'Uncategorized'}</div>
        <div className="card-actions"><button onClick={() => setSelected(movie)}>View details <span>↗</span></button><span className="card-index">RM — {String(index + 1).padStart(2, '0')}</span></div>
      </article>)}</div> : <div className="empty-state"><span>⌕</span><h3>{movies.length ? 'No titles found' : 'The collection is being curated.'}</h3><p>{movies.length ? 'Try another title or language.' : 'New stories will appear here as they are added to the catalog.'}</p>{movies.length > 0 && <button onClick={() => { setQuery(''); setLanguage('All'); }}>Reset filters</button>}</div>}
    </section>
    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
      <div className="detail-art">{selected.poster_url ? <img src={selected.poster_url} alt={`${selected.title} poster`} /> : <strong>R</strong>}</div>
      <div className="detail-content"><div className="eyebrow gold-text">RUDRA SELECTS</div><h2 id="detail-title">{selected.title}</h2><div className="detail-meta"><span>{selected.release_year ?? 'Year TBA'}</span><span>{selected.language || 'Language TBA'}</span><span>{selected.category || 'Uncategorized'}</span></div><p>{selected.description || 'More details about this title will be added soon.'}</p>{selected.content_url ? <a className="primary-btn" href={selected.content_url} target="_blank" rel="noreferrer">Open authorized link <span>↗</span></a> : <p className="link-note">An authorized viewing link has not been added yet.</p>}</div>
    </section></div>}
  </>;
}
