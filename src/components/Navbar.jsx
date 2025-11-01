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
    <>
      <div className={`navbar-top-strip ${darkMode ? "dark" : ""}`}>
        <div className="navbar-top-container">
          <a
            href="https://isims.ieee.tn/"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            IEEE ISIMS SB
          </a>
          <a
            href="https://www.ieee.org/"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            IEEE.org
          </a>
          <a
            href="https://ieeexplore.ieee.org/"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            IEEE Xplore
          </a>
          <a
            href="https://ieee-collabratec.ieee.org/"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            IEEE Collabratec
          </a>
          <a
            href="https://www.ieee.org/membership/join/index.html"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            Join IEEE
          </a>
          <a
            href="https://ct.ieee.org/puzzlers/?fbclid=IwZXh0bgNhZW0CMTEAAR1lDzSP07eKLSiIhXk2xwVE2ao0TagZuKi-m83YuIYzUZm_3xRm1q-ZCkg_aem_pX4wM7MLtUTB-zoIL8X3BQ"
            target="_blank"
            rel="noreferrer"
            className="navbar-top-link"
          >
            IEEE Puzzlers
          </a>
        </div>
      </div>
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
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
                className="category-button all"
                onClick={() => scrollToId("mini-games")}
              >
                Our Mini Games
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

            <div className="mobile-only mobile-controls">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mobile-theme-toggle"
                aria-label="Toggle dark mode"
                type="button"
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
          <div
            className="mobile-menu-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mobile-close" onClick={() => setOpen(false)}>
              ✕
            </button>
            <nav className="mobile-menu-nav">
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
              <button
                className="category-button all"
                onClick={() => scrollToId("mini-games")}
              >
                Our Mini Games
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}
