import React, { useEffect, useMemo, useRef, useState } from "react";
import fawazir from "../assets/activites/fawazir.png";
import TRC from "../assets/activites/TRC2.0-17.jpg";
const IMG = new URL("../assets/activites/IMG_2398.JPG", import.meta.url).href;

// Simple activities data; swap with real content when available
const defaultActivities = [
  {
    id: 1,
    title: "Fawazir Ramadhane",
    dateLabel: "2 Mars 2025",
    image: fawazir,
    excerpt:
      "Fawazir Ramadhane is coming soon! Stay sharp and refreshed with our daily challenges after Iftar It's up to you to find the solution—winners will be announced!",
    link: "#",
  },
  {
    id: 2,
    title: "Falawla is missing",
    dateLabel: "9 April 2025",
    image: TRC,
    excerpt:
      "Falawla is missing! Can you help us find her at the Tech Resolve Challenge?  Join the search ",
    link: "#",
  },
  {
    id: 3,
    title: " IEEE Puzzlers booth at ISIMS",
    dateLabel: "16 April 2025",
    image: IMG,
    excerpt:
      "Join us at the IEEE Puzzlers booth at ISIMS — packed with logic, challenges, and a touch of mystery.",
    link: "#",
  },
];

export default function Activities({ darkMode, activities }) {
  const list = useMemo(
    () => (activities?.length ? activities : defaultActivities),
    [activities]
  );
  const scrollerRef = useRef(null);
  const isDirectToActivities =
    typeof window !== "undefined" &&
    (window.location.hash || "").toLowerCase().includes("activite");

  // If user lands directly on Activities, warm up first couple images
  useEffect(() => {
    if (!isDirectToActivities) return;
    for (let i = 0; i < Math.min(2, list.length); i++) {
      const img = new Image();
      img.src = list[i].image;
      // allow browser to schedule decode lazily
      if (img.decode) {
        img.decode().catch(() => {});
      }
    }
  }, [isDirectToActivities, list]);

  // Render only first 2 cards immediately, then hydrate the rest during idle time
  const [renderCount, setRenderCount] = useState(() =>
    Math.min(2, list.length)
  );
  useEffect(() => {
    let idleId;
    const hydrate = () => setRenderCount(list.length);
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(hydrate, { timeout: 500 });
    } else {
      idleId = setTimeout(hydrate, 200);
    }
    return () => {
      if ("cancelIdleCallback" in window && idleId) {
        window.cancelIdleCallback(idleId);
      } else if (idleId) {
        clearTimeout(idleId);
      }
    };
  }, [list.length]);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".activity-card");
    const delta = card ? card.getBoundingClientRect().width + 24 : 360; // include gap
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  return (
    <div className="activities-section">
      <button
        className="carousel-nav-btn left"
        aria-label="Previous activities"
        onClick={() => scrollByCard(-1)}
        type="button"
      >
        ‹
      </button>
      <div className="activities-carousel" ref={scrollerRef}>
        {list.slice(0, renderCount).map((a, idx) => {
          const priority = isDirectToActivities && idx < 2; // boost first two if landing here
          return (
            <article
              key={a.id}
              className={`activity-card ${darkMode ? "dark-card" : ""}`}
            >
              <div className="activity-image">
                <img
                  src={a.image}
                  alt="Activity"
                  loading={priority ? "eager" : "lazy"}
                  fetchpriority={priority ? "high" : "auto"}
                  decoding="async"
                  width={420}
                  height={230}
                  sizes="(max-width: 640px) 90vw, 420px"
                />
              </div>
              <div className="activity-body larger">
                <span className="activity-date-inline">{a.dateLabel}</span>
                <h3 className="activity-title">{a.title}</h3>
                <p className="activity-excerpt">{a.excerpt}</p>
              </div>
            </article>
          );
        })}
      </div>
      <button
        className="carousel-nav-btn right"
        aria-label="Next activities"
        onClick={() => scrollByCard(1)}
        type="button"
      >
        ›
      </button>
    </div>
  );
}
