import React, { useState } from "react";
import blancLogo from "../assets/blanc.png";
import blacklogo from "../assets/Groupe 170.png";

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setOpen(false);
  }

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-icon" style={{ width: 200, height: 200 }}>
              <img
                src={darkMode ? blancLogo : blacklogo}
                alt={
                  darkMode ? "IEEE Puzzlers white logo" : "IEEE Puzzlers logo"
                }
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="navbar-menu desktop-only">
            <button
              className="category-button all"
              onClick={() => scrollToId("home")}
            >
              Home
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("about")}
            >
              About us
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("team")}
            >
              Our Team
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("puzzles")}
            >
              Our Puzzles
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("activite")}
            >
              Our Activites
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`dark-mode-toggle ${darkMode ? "dark" : ""}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 3v2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19v2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.2 4.2l1.4 1.4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.4 18.4l1.4 1.4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 12h2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12h2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="mobile-only">
            <button
              className={`navbar-burger ${open ? "open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sliding menu */}
      <div
        className={`mobile-menu ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-close" onClick={() => setOpen(false)}>
            ✕
          </button>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 8,
            }}
          >
            <button
              className="category-button all"
              onClick={() => scrollToId("home")}
            >
              Home
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("about")}
            >
              About us
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("team")}
            >
              Team
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("puzzles")}
            >
              Puzzles
            </button>
            <button
              className="category-button all"
              onClick={() => scrollToId("activite")}
            >
              Activite
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
