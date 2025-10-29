import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import puzz1 from "../assets/puzz 1.png";

export default function Modal({ puzzle, onClose, darkMode }) {
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    if (!puzzle) return;
    // Reset reveal state whenever a new puzzle is opened
    setShowAnswer(false);

    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [puzzle, onClose]);

  if (!puzzle) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`modal-card w-full h-full relative ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10 bg-white bg-opacity-80"
        >
          <X className={darkMode ? "text-gray-800" : "text-gray-800"} />
        </button>

        <div className="modal-body">
          <div
            className={`modal-image ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
            title="Puzzle image"
          >
            {puzzle.imageUrl ? (
              <img
                src={puzzle.imageUrl}
                alt={puzzle.name}
                className="modal-img"
              />
            ) : (
              <img src={puzz1} alt={puzzle.name} className="modal-img" />
            )}
          </div>

          <div className="modal-content p-8">
            <h2
              className={`modal-title text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {puzzle.name}
            </h2>
            {puzzle.creator && (
              <p
                className={`text-sm mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Created by{" "}
                <span className="font-semibold">{puzzle.creator}</span>
              </p>
            )}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-[#0072BC] bg-opacity-10"
              }`}
              aria-expanded={showAnswer}
            >
              <p
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-[#0072BC]" : "text-[#0072BC]"
                }`}
              >
                ✓ Correct Answer:
              </p>
              {showAnswer ? (
                <p
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {puzzle.answer || "No answer provided."}
                </p>
              ) : (
                <p
                  className={`text-lg italic ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Use the button below to reveal the answer
                </p>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                type="button"
                className={`reveal-btn ${showAnswer ? "revealed" : ""}`}
                onClick={() => setShowAnswer((v) => !v)}
                aria-pressed={showAnswer}
              >
                {showAnswer ? "Hide Answer" : "Reveal Answer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
