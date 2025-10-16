import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">IEEE Puzzlers</div>
            <p className="footer-tagline">
      Our Social Media Pages
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61573530966378"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-puzzlers-isims-student-branch/"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/ieee_puzzlers_isims_sb/"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    ry="5"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="4" fill="none" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-head">Explore</h4>
            <ul className="footer-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#puzzles">Puzzles</a>
              </li>
              <li>
                <a
                  href="https://ieee-collabratec.ieee.org/app/community/1343/IEEE-Puzzlers/about"
                  target="_blank"
                  rel="noreferrer"
                >
                  IEEE Puzzlers on Collabratec
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-head">Connect</h4>
            <ul className="footer-list">
              <li>
                <a href="#team">Team</a>
              </li>
              <li>
                <a href="#activite">Activities</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-sep" />
        <div className="footer-copy">
          © 2025 IEEE Puzzlers ISIMS SB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
