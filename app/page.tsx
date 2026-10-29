"use client";

import { useMemo, useState } from "react";

type Movie = {
  id: number; title: string; year: number; language: string; genre: string; rating: string;
  duration: string; synopsis: string; cast: string; tag: string; art: string; symbol: string;
};

const movies: Movie[] = [
  { id: 1, title: "Kantara: Chapter One", year: 2025, language: "Kannada", genre: "Action · Drama", rating: "8.7", duration: "2h 45m", synopsis: "A mysterious forest, ancient traditions and a destiny tied to the land collide in this atmospheric action drama.", cast: "Rishab Shetty · Jayaram · Rukmini Vasanth", tag: "TRENDING", art: "art-forest", symbol: "ಕ" },
  { id: 2, title: "Salaar", year: 2023, language: "Telugu", genre: "Action · Thriller", rating: "8.1", duration: "2h 55m", synopsis: "A fierce friendship is tested in a brutal world of power, loyalty and rival kingdoms.", cast: "Prabhas · Prithviraj Sukumaran · Shruti Haasan", tag: "POPULAR", art: "art-fire", symbol: "S" },
  { id: 3, title: "Lucky Baskhar", year: 2024, language: "Telugu", genre: "Crime · Drama", rating: "8.0", duration: "2h 28m", synopsis: "An ordinary bank employee finds himself drawn into a risky game of money, ambition and deception.", cast: "Dulquer Salmaan · Meenakshi Chaudhary", tag: "EDITOR'S PICK", art: "art-gold", symbol: "₹" },
  { id: 4, title: "Maharaja", year: 2024, language: "Tamil", genre: "Crime · Thriller", rating: "8.4", duration: "2h 21m", synopsis: "A quiet barber seeks justice after a deeply personal incident, uncovering a complicated chain of events.", cast: "Vijay Sethupathi · Anurag Kashyap", tag: "MUST WATCH", art: "art-red", symbol: "M" },
  { id: 5, title: "Manjummel Boys", year: 2024, language: "Malayalam", genre: "Adventure · Thriller", rating: "8.2", duration: "2h 15m", synopsis: "A group of friends on a trip face the ultimate test of courage when one of them disappears in a cave.", cast: "Soubin Shahir · Sreenath Bhasi · Balu Varghese", tag: "FAN FAVOURITE", art: "art-blue", symbol: "MB" },
  { id: 6, title: "12th Fail", year: 2023, language: "Hindi", genre: "Biography · Drama", rating: "8.8", duration: "2h 27m", synopsis: "A young student rebuilds his life and keeps pursuing a dream despite repeated setbacks.", cast: "Vikrant Massey · Medha Shankar", tag: "INSPIRING", art: "art-paper", symbol: "12" },
  { id: 7, title: "777 Charlie", year: 2022, language: "Kannada", genre: "Adventure · Drama", rating: "8.7", duration: "2h 44m", synopsis: "A lonely man's routine changes when an energetic dog enters his life and opens up a new world.", cast: "Rakshit Shetty · Charlie", tag: "HEARTWARMING", art: "art-sky", symbol: "🐾" },
  { id: 8, title: "Jailer", year: 2023, language: "Tamil", genre: "Action · Comedy", rating: "7.2", duration: "2h 48m", synopsis: "A retired jailer is pulled into a dangerous mission when his family is threatened.", cast: "Rajinikanth · Ramya Krishnan · Vinayakan", tag: "BLOCKBUSTER", art: "art-neon", symbol: "J" },
];
const languages = ["All", "Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [selected, setSelected] = useState<Movie | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const filtered = useMemo(() => movies.filter(m => (language === "All" || m.language === language) && `${m.title} ${m.genre} ${m.language}`.toLowerCase().includes(query.toLowerCase())), [query, language]);
  const toggleWatchlist = (id: number) => setWatchlist(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Rudra Movies home"><span className="brand-mark">R</span><span>RUDRA <b>MOVIES</b></span></a>
      <nav><a href="#catalog">Explore</a><a href="#catalog">Movies</a><a href="#about">About</a></nav>
      <a className="top-cta" href="#catalog">Explore titles <span>↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> THE HOME OF YOUR NEXT FAVOURITE STORY</div>
        <h1>Stories hit<br/><em>different.</em></h1>
        <p>Discover films worth your time. Regional favourites, cult classics and stories that stay with you.</p>
        <a className="primary-btn" href="#catalog">Explore the collection <span>↘</span></a>
        <div className="hero-foot"><span>CURATED FOR CURIOUS MINDS</span><span>VOL. 01 / 2026</span></div>
      </div>
      <div className="hero-art" aria-label="Abstract RUDRA MOVIES poster artwork">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="hero-poster"><span className="poster-mini">RUDRA<br/>PICTURES</span><strong>R</strong><span className="poster-bottom">A GOOD STORY<br/>STAYS WITH YOU.</span></div>
        <div className="floating-label"><small>RUDRA SELECTS</small><b>YOUR NEXT<br/>OBSESSION</b></div>
        <div className="hero-index">01 <span>/ 08</span></div>
      </div>
    </section>

    <section className="catalog" id="catalog">
      <div className="section-head"><div><div className="eyebrow">THE WATCHLIST</div><h2>Find your <em>next.</em></h2><p>A handpicked lineup for every mood. No endless scrolling, just good stories.</p></div><div className="count-pill">{filtered.length.toString().padStart(2,"0")} TITLES</div></div>
      <div className="filters" role="group" aria-label="Filter by language">{languages.map(lang => <button key={lang} className={language === lang ? "filter active" : "filter"} onClick={() => setLanguage(lang)}>{lang}</button>)}</div>
      <label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search titles, genres, languages..."/><kbd>↵</kbd></label>
      <div className="catalog-meta"><span>SHOWING {filtered.length.toString().padStart(2,"0")} TITLES</span><span>UPDATED FOR THE CURIOUS ↗</span></div>
      {filtered.length ? <div className="movie-grid">{filtered.map((movie, i) => <article className="movie-card" key={movie.id}>
        <button className={`poster ${movie.art}`} onClick={() => setSelected(movie)} aria-label={`View details for ${movie.title}`}>
          <span className="poster-code">RM — {String(movie.id).padStart(2,"0")}</span><span className="poster-symbol">{movie.symbol}</span><span className="poster-title">{movie.title}</span><span className="poster-tag">{movie.tag}</span><span className="poster-open">↗</span>
        </button>
        <div className="movie-info"><button className="movie-title" onClick={() => setSelected(movie)}>{movie.title}</button><span className="rating">★ {movie.rating}</span></div>
        <div className="movie-sub">{movie.year} <span>•</span> {movie.language} <span>•</span> {movie.genre.split(" · ")[0]}</div>
        <div className="card-actions"><button onClick={() => setSelected(movie)}>View details <span>↗</span></button><button className={watchlist.includes(movie.id) ? "save saved" : "save"} onClick={() => toggleWatchlist(movie.id)} aria-label={watchlist.includes(movie.id) ? "Remove from watchlist" : "Add to watchlist"}>{watchlist.includes(movie.id) ? "♥" : "♡"}</button></div>
      </article>)}</div> : <div className="empty-state"><span>⌕</span><h3>No titles found</h3><p>Try another title or language.</p><button onClick={() => {setQuery(""); setLanguage("All");}}>Reset filters</button></div>}
    </section>

    <section className="feature-strip" id="about"><div className="feature-mark">R</div><div><div className="eyebrow">THE RUDRA STANDARD</div><h2>Less scrolling.<br/><em>More stories.</em></h2></div><p>Made for film lovers who want a clean place to discover what to watch next. Your next favourite is waiting.</p><a href="#catalog">Browse films ↗</a></section>
    <footer><a className="brand" href="#top"><span className="brand-mark">R</span><span>RUDRA <b>MOVIES</b></span></a><span>STORIES WORTH YOUR TIME.</span><span>© 2026 RUDRA MOVIES</span></footer>

    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
      <div className={`detail-art ${selected.art}`}><span className="detail-code">RUDRA SELECTS / {String(selected.id).padStart(2,"0")}</span><strong>{selected.symbol}</strong><span className="detail-art-title">{selected.title}</span></div>
      <div className="detail-content"><div className="eyebrow">{selected.tag}</div><h2 id="detail-title">{selected.title}</h2><div className="detail-meta"><span>{selected.year}</span><span>{selected.language}</span><span>{selected.duration}</span><span className="rating">★ {selected.rating}</span></div><p>{selected.synopsis}</p><div className="detail-genre">{selected.genre.split(" · ").map(g => <span key={g}>{g}</span>)}</div><div className="cast"><small>CAST</small><p>{selected.cast}</p></div><button className="primary-btn link-placeholder" onClick={() => alert("Movie link ಇನ್ನೂ ಸೇರಿಸಿಲ್ಲ. ಅನುಮತಿ ಪಡೆದ file ಅಥವಾ official streaming link ಸಿದ್ಧವಾದಾಗ ಇದಕ್ಕೆ ಜೋಡಿಸೋಣ.")}>Get Movie Link <span>↗</span></button><p className="link-note">Movie links will be added after the catalog is ready.</p></div>
    </section></div>}
  </main>;
}
