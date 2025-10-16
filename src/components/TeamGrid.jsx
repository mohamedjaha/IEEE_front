import React, { useEffect, useRef } from "react";
import yessineImg from "../assets/yessine.png";
import achour from "../assets/achour.png";
import Emna from "../assets/EMNA.png";
import mohamed from "../assets/mohamed.png";

const members = [
  {
    name: "Yassine Ben Ayed",
    role: "CHAIR",
    image: yessineImg,
  },
  {
    name: "Emna Megdiche",
    role: "Puzzle Creator",
    image: Emna,
  },
  {
    name: "Yassine Achour",
    role: "Puzzle Creator",
    image: achour,
  },
  {
    name: "Mohamed Jahha",
    role: "TREASURER",
    image: mohamed,
  },
];

export default function TeamGrid() {
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
      { threshold: 0.05, rootMargin: "0px 0px 40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="team-grid team-reveal">
      {members.map((m) => (
        <article key={m.name} className="team-card team-item">
          <div className="team-photo-wrap">
            <img
              className="team-photo"
              src={m.image}
              alt={m.name}
              loading="lazy"
            />
          </div>
          <div className="team-meta">
            <h4 className="team-name">{m.name}</h4>
            <div className="team-role">{m.role}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
