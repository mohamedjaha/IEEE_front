import React, { useState, useMemo, useEffect, useRef } from "react";
import PuzzleCard from "./PuzzleCard";

export default function PuzzleGrid({
  puzzles,
  onSelect,
  darkMode,
  selectedCategory,
}) {
  const [showAll, setShowAll] = useState(false);
  const filtered = useMemo(
    () =>
      selectedCategory === "all"
        ? puzzles
        : puzzles.filter((p) => p.difficulty === selectedCategory),
    [puzzles, selectedCategory]
  );
  const visible = showAll ? filtered : filtered.slice(0, 2);

  const gridRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = gridRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!done && entry.isIntersecting) {
            done = true;
            el.classList.add("visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [selectedCategory]);

  return (
    <div ref={gridRef} className="puzzle-reveal" style={{ marginBottom: 16 }}>
      <h3
        className={`text-2xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {selectedCategory === "all"
          ? "All Puzzles"
          : `${
              selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            } Puzzles`}{" "}
        <span className="text-blue-500 ml-2">({filtered.length})</span>
      </h3>
      {filtered.length === 0 ? (
        <div
          className={`text-center py-12 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl">No puzzles found in this category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((p, idx) => (
              <PuzzleCard
                key={p.id}
                puzzle={p}
                onSelect={onSelect}
                darkMode={darkMode}
                className="puzzle-item"
              />
            ))}
          </div>
          {filtered.length > 2 && (
            <div className="text-center" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="show-more-btn"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
