import React, { useEffect, useMemo, useState } from "react";
import LazyImage from "./LazyImage";
import usePrefetchImages from "../hooks/usePrefetchImages";
const nimGameImg = new URL(
  "../assets/mini games/Plan de travail \u2013 4.png",
  import.meta.url
).href;
const taxmanImg = new URL(
  "../assets/mini games/Plan de travail \u2013 5.png",
  import.meta.url
).href;
const subtractionImg = new URL(
  "../assets/mini games/Plan de travail \u2013 6.png",
  import.meta.url
).href;
const nimGameImgDark = new URL(
  "../assets/mini games/Dark Plan de travail – 4.png",
  import.meta.url
).href;
const taxmanImgDark = new URL(
  "../assets/mini games/Dark Plan de travail – 5.png",
  import.meta.url
).href;
const subtractionImgDark = new URL(
  "../assets/mini games/Dark Plan de travail – 6.png",
  import.meta.url
).href;

const miniGames = [
  {
    id: "nim",
    title: "Nim Game",
    image: nimGameImg,
    description:
      "Classic Nim strategy: players remove objects from heaps. Whoever takes the last object wins. Master the binary tactics to outsmart your opponent!",
  },
  {
    id: "taxman",
    title: "Taxman Game",
    image: taxmanImg,
    description:
      "Pick numbers, pay their factors to the Taxman, and keep the difference. It’s a battle of arithmetic and foresight—maximize your score before the pot runs dry.",
  },
  {
    id: "subtraction",
    title: "The Subtraction Game",
    image: subtractionImg,
    description:
      "Choose a number to subtract from a shared pile. The twist? You can only subtract numbers from a preset set. Plan carefully to leave your rival without a move.",
  },
];

export default function MiniGames({ darkMode }) {
  const [activeImage, setActiveImage] = useState(null);
  const imageSources = useMemo(() => {
    const base = miniGames.map((game) => game.image);
    const dark = [nimGameImgDark, taxmanImgDark, subtractionImgDark];
    // Prefetch both sets so switching theme is smooth
    return darkMode ? dark.concat(base) : base.concat(dark);
  }, [darkMode]);
  usePrefetchImages(imageSources);

  useEffect(() => {
    if (!activeImage || typeof window === "undefined") {
      return;
    }
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImage]);

  return (
    <section
      id="mini-games"
      className={`section-centered section-activite ${
        darkMode ? "" : "light-section"
      }`}
      style={{ marginTop: 12 }}
    >
      <h2 className="team-heading" style={{ textAlign: "center" }}>
        <span className="meet-word">Our</span>{" "}
        <span className="brand-accent">Mini Games</span>
      </h2>
      <div className="mini-games-grid">
        {miniGames.map((game) => {
          // choose dark variant when darkMode active
          let src = game.image;
          if (darkMode) {
            if (game.id === "nim") src = nimGameImgDark;
            if (game.id === "taxman") src = taxmanImgDark;
            if (game.id === "subtraction") src = subtractionImgDark;
          }
          return (
            <article
              key={game.id}
              className={`activity-card mini-game-card ${
                darkMode ? "dark-card" : ""
              }`}
            >
              <div className="activity-image">
                <button
                  type="button"
                  className="activity-image-button"
                  onClick={() => setActiveImage({ src, title: game.title })}
                  aria-label={`View ${game.title}`}
                >
                  <LazyImage
                    src={src}
                    alt={game.title}
                    priority
                    width={500}
                    height={280}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 14,
                    }}
                  />
                </button>
              </div>
              <div className="activity-body larger">
                <h3 className="activity-title">{game.title}</h3>
                <p className="activity-excerpt">{game.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      {activeImage && (
        <div
          className="activity-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage.src}
            alt={activeImage.title}
            className="activity-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="activity-lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Close image"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
