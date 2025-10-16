import React from "react";

export default function Hero({ darkMode }) {
  return (
    <div className="hero-copy mb-12">
      <h1 className={`hero-title ${darkMode ? "text-white" : "text-gray-900"}`}>
        Welcome To
      </h1>
      <h2
        className="hero-subtitle"
        style={{ color: darkMode ? "#029FD3" : "#77bd43" }}
      >
        IEEE Puzzlers ISIMS SB Community
      </h2>
      <p
        className="hero-tagline"
        style={{
          color: darkMode ? "#d1d5db" : "#717070ff",
          fontSize: "1rem",
          fontWeight: 500,
          lineHeight: 1.5,
          margin: "0 0 18px",
        }}
      >
        First IEEE Puzzlers Community in Tunisia,
        <span style={{ color: darkMode ? "#d1d5db" : "#717070ff" }}>
          {" "}
          Established from IEEE ISIMS SB
        </span>
      </p>
    </div>
  );
}
