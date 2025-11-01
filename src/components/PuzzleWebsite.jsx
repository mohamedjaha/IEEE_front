import React, { useEffect, useRef, useState } from "react";
import puzzle3d from "../assets/3d puzzle.png";
import puzzle3dDark from "../assets/3d puzzle dark.png";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PuzzleGrid from "./PuzzleGrid";
import Modal from "./Modal";
import TeamGrid from "./TeamGrid";
import Activities from "./Activities";
import MiniGames from "./MiniGames";
import Footer from "./Footer";

const API_BASE =
  import.meta.env?.VITE_PUZZLES_API ?? "/api";

export default function PuzzleWebsite() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  // About section: cascade reveal when first in view (persist across theme toggles)
  useEffect(() => {
    if (typeof window === "undefined") {
      setAboutVisible(true);
      return;
    }
    const el = aboutRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setAboutVisible(true);
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!done && entry.isIntersecting) {
            done = true;
            setAboutVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 45% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchPuzzles() {
      setLoading(true);
      setError(null);
      setStatusMessage(null);

      try {
        const url =
          selectedCategory === "all"
            ? `${API_BASE}/GetAllPuzzles`
            : `${API_BASE}/GetPuzzlesByDifficultyLevel?level=${encodeURIComponent(
                selectedCategory
              )}`;
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const raw = await response.text();
        let data;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch (parseError) {
          data = raw;
        }

        if (typeof data === "string") {
          const trimmed = data.trim();
          setPuzzles([]);
          setStatusMessage(trimmed || "No puzzles found.");
          return;
        }

        if (Array.isArray(data)) {
          const normalized = data.map((entry) => normalizePuzzle(entry));
          setPuzzles(normalized);
          setStatusMessage(
            normalized.length === 0 ? "No puzzles found." : null
          );
          return;
        }

        setPuzzles([]);
        setStatusMessage("No puzzles found.");
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setPuzzles([]);
        setError(err.message ?? "Failed to load puzzles.");
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPuzzles();

    return () => controller.abort();
  }, [selectedCategory]);

  return (
    <div
      className={`no-select min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 dark" : "bg-gray-50"
      } smooth-scroll-enabled`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div>
        {/* Home */}
        <div
          className={`section-outer section-home-outer ${
            darkMode ? "" : "light-section-outer"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 home-top-pad">
            <section
              id="home"
              className={`section-home ${darkMode ? "" : "light-section"}`}
            >
              <div className="hero-section">
                <div className="hero-text">
                  <Hero darkMode={darkMode} />
                </div>
                <div className="hero-image-wrapper">
                  <img
                    src={darkMode ? puzzle3dDark : puzzle3d}
                    alt="3D Puzzle"
                    className="hero-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* About */}
        <div
          className={`section-outer section-about-outer ${
            darkMode ? "" : "light-section-outer"
          } about-bg`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            style={{ paddingTop: 24, paddingBottom: 24 }}
          >
            <section
              id="about"
              ref={aboutRef}
              className={`section-centered section-about about-cascade ${
                aboutVisible ? "visible" : ""
              } ${darkMode ? "" : "light-section"}`}
            >
              <h2 className="about-c-item about-c-head">About us</h2>
              <div className="about-grid">
                <article className="about-card about-c-item about-c-left">
                  <h3 className="about-card-title">We Are a Community</h3>
                  <p>
                    We are a small group of students who love puzzles, brain
                    games, and challenges.
                    <br />
                    <br />
                    Many people think we are a big organization, but we are
                    simply a friendly community that enjoys solving problems
                    together.
                    <br /> <br />
                    We work under the <strong>IEEE Puzzlers</strong> community
                    on <strong>IEEE Collabratec</strong>.
                  </p>
                </article>
                <article className="about-card about-c-item about-c-up">
                  <h3 className="about-card-title">What We Do</h3>
                  <ul className="about-list">
                    <li>
                      We organize fun puzzle contests and events for everyone.
                    </li>
                    <li>
                      We host team-building games where members learn from each
                      other.
                    </li>
                    <li>
                      We sometimes celebrate Puzzle Day in different places to
                      share the fun!
                    </li>
                  </ul>
                </article>
                <article className="about-card about-c-item about-c-down">
                  <h3 className="about-card-title">
                    IEEE Puzzlers on Collabratec
                  </h3>
                  <p>
                    <strong>IEEE Puzzlers</strong> is a global recreational math
                    community on IEEE Collabratec with more than 8,000
                    participants that develop and share brain-teasers tied to
                    mathematics and IEEE fields of interest.
                  </p>
                </article>
                <article className="about-card about-c-item about-c-right">
                  <h3 className="about-card-title">Our Goals</h3>
                  <ul className="about-list">
                    <li>Keep our minds active and creative through puzzles.</li>
                    <li>Help members make new friends and learn teamwork.</li>
                    <li>Make activities fun and welcoming for everyone.</li>
                    <li>
                      Grow our community and inspire more people to enjoy
                      puzzles with us!
                    </li>
                  </ul>
                </article>
              </div>
            </section>
          </div>
        </div>

        {/* Team */}
        <div
          className={`section-outer section-team-outer ${
            darkMode ? "" : "light-section-outer"
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            style={{ paddingTop: 24, paddingBottom: 24 }}
          >
            <section
              id="team"
              className={`section-centered section-team ${
                darkMode ? "" : "light-section"
              }`}
              style={{ marginTop: 16 }}
            >
              <h2 className="team-heading">
                <span className="meet-word">Meet</span>{" "}
                <span className="brand-accent">our team</span>
              </h2>
              <div className="team-eyebrow">Meet The People Behind This</div>
              <TeamGrid />
            </section>
          </div>
        </div>

        {/* Puzzles */}
        <div
          className={`section-outer section-puzzles-outer ${
            darkMode ? "" : "light-section-outer"
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            style={{ paddingTop: 24, paddingBottom: 16 }}
          >
            <section
              id="puzzles"
              className={`section-puzzles ${darkMode ? "" : "light-section"}`}
              style={{ marginTop: 16 }}
            >
              <h2 className="puzzles-heading">
                <span className="our-word">Our</span>{" "}
                <span className="brand-accent">Puzzles</span>
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {(() => {
                  const indexMap = { all: 0, easy: 1, medium: 2, hard: 3 };
                  const idx = indexMap[selectedCategory] ?? 0;
                  return (
                    <div className="filter-bar" style={{ ["--index"]: idx }}>
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`filter-item ${
                          selectedCategory === "all" ? "active" : ""
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedCategory("easy")}
                        className={`filter-item ${
                          selectedCategory === "easy" ? "active" : ""
                        }`}
                      >
                        Easy
                      </button>
                      <button
                        onClick={() => setSelectedCategory("medium")}
                        className={`filter-item ${
                          selectedCategory === "medium" ? "active" : ""
                        }`}
                      >
                        Medium
                      </button>
                      <button
                        onClick={() => setSelectedCategory("hard")}
                        className={`filter-item ${
                          selectedCategory === "hard" ? "active" : ""
                        }`}
                      >
                        Hard
                      </button>
                      <div className="filter-indicator" aria-hidden="true" />
                    </div>
                  );
                })()}
              </div>
              <div
                style={{ display: "flex", gap: 24, alignItems: "flex-start" }}
              >
                <div style={{ flex: 1 }}>
                  {error && !loading && (
                    <div
                      className="p-4 rounded-md mb-4"
                      style={{
                        background: darkMode
                          ? "rgba(239,68,68,0.12)"
                          : "rgba(239,68,68,0.12)",
                        color: darkMode ? "#fecaca" : "#b91c1c",
                      }}
                    >
                      {error}
                    </div>
                  )}
                  {statusMessage && !loading && !error && (
                    <div
                      className="p-4 rounded-md mb-4"
                      style={{
                        background: darkMode
                          ? "rgba(59,130,246,0.12)"
                          : "rgba(59,130,246,0.12)",
                        color: darkMode ? "#bfdbfe" : "#1d4ed8",
                      }}
                    >
                      {statusMessage}
                    </div>
                  )}
                  {loading ? (
                    <div
                      className="text-center py-12"
                      style={{
                        color: darkMode ? "#9ca3af" : "#6b7280",
                      }}
                    >
                      Loading puzzles…
                    </div>
                  ) : (
                    <PuzzleGrid
                      puzzles={puzzles}
                      onSelect={setSelectedPuzzle}
                      darkMode={darkMode}
                      selectedCategory={selectedCategory}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Activities */}
        <div
          className={`section-outer section-activite-outer ${
            darkMode ? "" : "light-section-outer"
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            style={{ paddingTop: 12, paddingBottom: 24 }}
          >
            <section
              id="activite"
              className={`section-centered section-activite ${
                darkMode ? "" : "light-section"
              }`}
              style={{ marginTop: 12 }}
            >
              <h2 className="team-heading" style={{ textAlign: "center" }}>
                <span className="meet-word">Our</span>{" "}
                <span className="brand-accent">Activities</span>
              </h2>
              <div style={{ marginTop: 16 }}>
                <Activities darkMode={darkMode} />
              </div>
            </section>
          </div>
        </div>

        {/* Mini Games */}
        <div
          className={`section-outer section-activite-outer ${
            darkMode ? "" : "light-section-outer"
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            style={{ paddingTop: 12, paddingBottom: 48 }}
          >
            <MiniGames darkMode={darkMode} />
          </div>
        </div>

        {/* Modal */}
        {selectedPuzzle && (
          <Modal
            puzzle={selectedPuzzle}
            onClose={() => setSelectedPuzzle(null)}
            darkMode={darkMode}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
const indexMap = { all: 0, easy: 1, medium: 2, hard: 3 };

function normalizePuzzle(entry) {
  const source = entry ?? {};
  const id =
    source.id ??
    source.Id ??
    (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `puzzle-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const difficultyRaw =
    source.difficultyLevel ?? source.DifficultyLevel ?? "easy";
  const solution = source.solution ?? source.Solution ?? "";
  const imageValue = source.image ?? source.Image ?? null;
  const normalizedDifficulty = normalizeDifficulty(String(difficultyRaw));
  const creatorRaw =
    source.creatorName ??
    source.CreatorName ??
    source.creator ??
    source.createdBy ??
    source.CreatorId;

  return {
    id: String(id),
    name: source.name ?? source.Name ?? "Untitled Puzzle",
    difficulty: normalizedDifficulty,
    answer: solution,
    imageUrl: toImageUrl(imageValue),
    creator: normalizeCreator(creatorRaw),
  };
}

function toImageUrl(imageValue) {
  if (!imageValue) {
    return null;
  }
  if (typeof imageValue === "string" && imageValue.startsWith("data:")) {
    return imageValue;
  }
  return `data:image/png;base64,${imageValue}`;
}

function normalizeDifficulty(value) {
  const lowered = value.toLowerCase();
  if (lowered === "easy" || lowered === "medium" || lowered === "hard") {
    return lowered;
  }
  return "easy";
}

function normalizeCreator(raw) {
  if (!raw) {
    return null;
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof raw === "object") {
    if (raw.name) return String(raw.name);
    if (raw.userName) return String(raw.userName);
  }
  return null;
}
