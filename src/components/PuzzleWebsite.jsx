import React, { useEffect, useRef, useState } from "react";
import puzzle3d from "../assets/3d puzzle.png";
import puzzle3dDark from "../assets/3d puzzle dark.png";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PuzzleGrid from "./PuzzleGrid";
import Modal from "./Modal";
import TeamGrid from "./TeamGrid";
import Activities from "./Activities";
import Footer from "./Footer";

const samplePuzzles = [
  {
    id: 1,
    name: "Math Challenge",
    difficulty: "easy",
    image: "🔢",
    answer: "The answer is 42",
  },
  {
    id: 2,
    name: "Logic Grid",
    difficulty: "medium",
    image: "🧩",
    answer: "Pattern continues with blue square",
  },
  {
    id: 3,
    name: "Riddle Master",
    difficulty: "hard",
    image: "🤔",
    answer: "The answer is 'silence'",
  },
  {
    id: 4,
    name: "Number Sequence",
    difficulty: "easy",
    image: "📊",
    answer: "Next number is 89",
  },
  {
    id: 5,
    name: "Word Puzzle",
    difficulty: "medium",
    image: "📝",
    answer: "Find hidden word by rearranging letters",
  },
  {
    id: 6,
    name: "Brain Teaser",
    difficulty: "hard",
    image: "🧠",
    answer: "All of them - different perspectives",
  },
  {
    id: 7,
    name: "Pattern Recognition",
    difficulty: "easy",
    image: "🎯",
    answer: "Pattern repeats every 5 steps",
  },
  {
    id: 8,
    name: "Strategy Challenge",
    difficulty: "medium",
    image: "♟️",
    answer: "Move knight to E5",
  },
];

export default function PuzzleWebsite() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
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
                    <br />          <br />
                    We work Under The <strong>IEEE Puzzlers</strong> community on{" "}
                    <strong>IEEE Collabratec</strong>
                  </p>
                </article>
                <article className="about-card about-c-item about-c-up">
                  <h3 className="about-card-title">What We Do</h3>
                  <ul className="about-list">
                    <li>
                      We organize fun puzzle contests and events for everyone.
                    </li>
                    <li>
                      We host team‑building games where members learn from each
                      other.
                    </li>
                    <li>
                      We sometimes celebrate Puzzle Day in different places to
                      share the fun!
                    </li>
                  </ul>
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
                  <PuzzleGrid
                    puzzles={samplePuzzles}
                    onSelect={setSelectedPuzzle}
                    darkMode={darkMode}
                    selectedCategory={selectedCategory}
                  />
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
