"use client";

import { useMemo, useState } from "react";

type Movie = {
  title: string;
  year: string;
  language: string;
  genre: string;
  rating: string;
  accent: string;
  art: string;
  description: string;
};

const movies: Movie[] = [
  { title: "Midnight Protocol", year: "2025", language: "KANNADA", genre: "Thriller", rating: "8.4", accent: "#c8ff3d", art: "protocol", description: "One signal. One city. No second chances." },
  { title: "Neon Horizon", year: "2024", language: "TELUGU", genre: "Action", rating: "8.1", accent: "#ff7b54", art: "horizon", description: "The future belongs to the fearless." },
  { title: "The Last Frame", year: "2025", language: "HINDI", genre: "Mystery", rating: "8.7", accent: "#b6a0ff", art: "frame", description: "Every memory hides a missing piece." },
  { title: "Coastal Echoes", year: "2023", language: "KANNADA", genre: "Drama", rating: "7.9", accent: "#55d6c2", art: "coast", description: "Some stories always find their way home." },
  { title: "Velvet Run", year: "2024", language: "TAMIL", genre: "Crime", rating: "8.2", accent: "#ffcc66", art: "velvet", description: "Trust is the most expensive mistake." },
  { title: "Monsoon Letters", year: "2025", language: "MALAYALAM", genre: "Romance", rating: "8.5", accent: "#84b8ff", art: "monsoon", description: "A letter arrives ten years too late." },
];

const languages = ["ALL", "KANNADA", "TELUGU", "HINDI", "TAMIL", "MALAYALAM"];

export default function Home() {
  const [language, setLanguage] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return movies.filter((movie) => {
      const languageMatch = language === "ALL" || movie.language === language;
      const queryMatch = !q || `${movie.title} ${movie.genre} ${movie.language}`.toLowerCase().includes(q);
      return languageMatch && queryMatch;
    });
  }, [language, query]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="RUDRA MOVIES home">
          <span className="brand-mark">R</span>
          <span>RUDRA<span className="brand-light">MOVIES</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className="active" href="#discover">Discover</a>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
        </nav>
        <a className="top-cta" href="#discover">Explore <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> YOUR NEXT MOVIE OBSESSION STARTS HERE</div>
          <h1>Stories hit<br /><em>different.</em></h1>
          <p>Find the films that stay with you. Fresh discoveries, cult favourites, and stories worth talking about.</p>
          <a className="hero-button" href="#discover">Discover movies <span>↘</span></a>
          <div className="hero-meta"><span>CURATED FOR CURIOUS MINDS</span><span className="meta-line" /><span>VOL. 01 / 2025</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract cinematic artwork">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-disc"><span>R</span></div>
          <div className="hero-art-label"><span>RUDRA SELECTS</span><strong>THE ART OF<br />A GOOD STORY</strong></div>
          <div className="hero-index">01 <span>/</span> 06</div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /><span>01 — DISCOVERY</span></div>
      </section>

      <section className="discover section-wrap" id="discover">
        <div className="section-heading">
          <div><div className="eyebrow">THE WATCHLIST</div><h2>Find your <em>next.</em></h2></div>
          <p>A handpicked lineup for every mood.<br />No endless scrolling. Just good stories.</p>
        </div>
        <div className="filter-row">
          <div className="language-filters" role="group" aria-label="Filter by language">
            {languages.map((item) => (
              <button key={item} className={language === item ? "filter active-filter" : "filter"} onClick={() => setLanguage(item)}>{item}</button>
            ))}
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, genres..." aria-label="Search titles and genres" />
            <kbd>/</kbd>
          </label>
        </div>
        <div className="results-line"><span>{String(filtered.length).padStart(2, "0")} FILMS SELECTED</span><span>UPDATED FOR THE CURIOUS <b>↗</b></span></div>
        <div className="movie-grid">
          {filtered.map((movie, index) => (
            <article className="movie-card" key={movie.title} style={{ "--accent": movie.accent } as React.CSSProperties}>
              <div className={`poster poster-${movie.art}`}>
                <span className="poster-number">RM — {String(index + 1).padStart(2, "0")}</span>
                <div className="poster-symbol">{movie.art === "protocol" ? "◉" : movie.art === "horizon" ? "◒" : movie.art === "frame" ? "▧" : movie.art === "coast" ? "〰" : movie.art === "velvet" ? "✳" : "☾"}</div>
                <div className="poster-title">{movie.title.split(" ").map((word) => <span key={word}>{word}</span>)}</div>
                <span className="poster-stamp">RUDRA<br />PICTURES</span>
              </div>
              <div className="movie-info">
                <div className="movie-title-row"><h3>{movie.title}</h3><span className="rating">★ {movie.rating}</span></div>
                <div className="movie-sub"><span>{movie.year}</span><i /> <span>{movie.language}</span><i /> <span>{movie.genre}</span></div>
                <p>{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty-state">No films match that search. Try another title or language.</div>}
      </section>

      <section className="manifesto" id="collections">
        <div className="manifesto-mark">R<span>.</span></div>
        <div><div className="eyebrow">LESS NOISE. MORE CINEMA.</div><h2>Good films deserve<br />to be <em>found.</em></h2></div>
        <p>RUDRA MOVIES is a growing space for movie lovers, curious minds, and anyone looking for a story that means something.</p>
      </section>

      <footer id="about">
        <a className="brand footer-brand" href="#"><span className="brand-mark">R</span><span>RUDRA<span className="brand-light">MOVIES</span></span></a>
        <span>MADE FOR THE LOVE OF STORIES.</span>
        <span>© 2025 RUDRA MOVIES</span>
      </footer>
    </main>
  );
}
