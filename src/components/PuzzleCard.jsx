import React from "react";
import puzz1 from "../assets/puzz 1.png";

export default function PuzzleCard({
  puzzle,
  onSelect,
  darkMode,
  className = "",
}) {
  return (
    <div
      onClick={() => onSelect(puzzle)}
      className={`puzzle-card cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
      } ${className}`}
    >
      <div
        className={`w-full aspect-16-9 flex items-center justify-center overflow-hidden ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <img src={puzz1} alt={puzzle.name} className="puzzle-thumb" />
      </div>

      <div className="p-6">
        <h3
          className={`text-2xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {puzzle.name}
        </h3>
        <div className="flex items-center gap-3">
          <span
            className={`pill ${
              puzzle.difficulty === "easy"
                ? "pill-easy"
                : puzzle.difficulty === "medium"
                ? "pill-medium"
                : "pill-hard"
            }`}
          >
            {puzzle.difficulty.toUpperCase()}
          </span>
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Click to open →
          </span>
        </div>
      </div>
    </div>
  );
}
