import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import fawazir from "../assets/activites/fawazir.png";
import TRC from "../assets/activites/TRC2.0-17.jpg";
import infoSession from "../assets/5.png";
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
    id: 4,
    title: "IEEE Puzzlers ISIMS SB Info Session",
    dateLabel: "3 Mars 2025",
    image: infoSession,
    excerpt:
      "We hosted an energetic info session introducing IEEE Puzzlers ISIMS SB community",
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

const GAP_PX = 28;

const getVisibleCountForWidth = () => {
  if (typeof window === "undefined") {
    return 3;
  }
  const width = window.innerWidth;
  if (width < 720) return 1;
  if (width < 1080) return 2;
  return 3;
};

export default function Activities({ darkMode, activities }) {
  const list = useMemo(
    () => (activities?.length ? activities : defaultActivities),
    [activities]
  );
  const isDirectToActivities =
    typeof window !== "undefined" &&
    (window.location.hash || "").toLowerCase().includes("activite");
  const [visibleCount, setVisibleCount] = useState(getVisibleCountForWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [translate, setTranslate] = useState(0);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => {
      setVisibleCount(getVisibleCountForWidth());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If user lands directly on Activities, warm up first couple images
  useEffect(() => {
    if (!isDirectToActivities) return;
    for (let i = 0; i < Math.min(visibleCount, list.length); i++) {
      const img = new Image();
      img.src = list[i].image;
      // allow browser to schedule decode lazily
      if (img.decode) {
        img.decode().catch(() => {});
      }
    }
  }, [isDirectToActivities, list, visibleCount]);

  useEffect(() => {
    setCurrentIndex((prev) => {
      const maxStart = Math.max(0, list.length - visibleCount);
      return Math.min(prev, maxStart);
    });
  }, [list, visibleCount]);

  const recalcTranslate = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) {
      setTranslate(0);
      return;
    }
    const firstCard = trackEl.querySelector(".activity-card");
    if (!firstCard) {
      setTranslate(0);
      return;
    }
    const width = firstCard.getBoundingClientRect().width;
    const computed = window.getComputedStyle(trackEl);
    const gap = parseFloat(computed.columnGap || computed.gap || "0") || 0;
    setTranslate((width + gap) * currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    recalcTranslate();
  }, [recalcTranslate, visibleCount, list.length]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => recalcTranslate();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [recalcTranslate]);

  const maxStart = Math.max(0, list.length - visibleCount);
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxStart));
  const cardBasis = useMemo(
    () => `calc((100% - ${(visibleCount - 1) * GAP_PX}px) / ${visibleCount})`,
    [visibleCount]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !activeImage) {
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
    <div className="activities-section">
      <button
        className="carousel-nav-btn left"
        aria-label="Previous activities"
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        type="button"
      >
        ‹
      </button>
      <div className="activities-carousel">
        <div
          className="activities-track"
          ref={trackRef}
          style={{
            transform: `translate3d(-${translate}px, 0, 0)`,
          }}
        >
          {list.map((a, idx) => {
            const priority =
              isDirectToActivities &&
              idx >= currentIndex &&
              idx < currentIndex + visibleCount;
            return (
              <article
                key={a.id}
                className={`activity-card ${darkMode ? "dark-card" : ""}`}
                style={{
                  flex: `0 0 ${cardBasis}`,
                  maxWidth: 420,
                  minWidth: 240,
                }}
              >
                <div className="activity-image">
                  <button
                    type="button"
                    className="activity-image-button"
                    onClick={() =>
                      setActiveImage({ src: a.image, title: a.title })
                    }
                    aria-label={`View ${a.title} image`}
                  >
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
                  </button>
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
      </div>
      <button
        className="carousel-nav-btn right"
        aria-label="Next activities"
        onClick={handleNext}
        disabled={currentIndex >= maxStart}
        type="button"
      >
        ›
      </button>
      {activeImage && (
        <div
          className="activity-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title || "Activity image"}
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage.src}
            alt={activeImage.title || "Activity"}
            className="activity-lightbox-image"
            onClick={(ev) => ev.stopPropagation()}
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
    </div>
  );
}
