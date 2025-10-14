import React, { useState } from 'react'

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false)

  function scrollToId(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-icon">🧩</div>
            <div>
              <div className={`navbar-title ${darkMode ? 'dark-mode' : ''}`}>PUZZLE MASTER</div>
              <div className="navbar-subtitle">Challenge Your Mind</div>
            </div>
          </div>

            <div className="navbar-menu desktop-only">
            <button className="category-button all" onClick={() => scrollToId('home')}>Home</button>
            <button className="category-button all" onClick={() => scrollToId('about')}>About us</button>
            <button className="category-button all" onClick={() => scrollToId('puzzles')}>Puzzles</button>
            <button className="category-button all" onClick={() => scrollToId('activite')}>Activite</button>
            <button className="category-button all" onClick={() => scrollToId('team')}>Team</button>

            <button onClick={() => setDarkMode(!darkMode)} className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`} aria-label="Toggle dark mode">
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 3v2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19v2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.2 4.2l1.4 1.4" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.4 18.4l1.4 1.4" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 12h2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12h2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="#FBBF24" strokeWidth="1.5"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#FFF"/>
                </svg>
              )}
            </button>
          </div>

          <div className="mobile-only">
            <button className={`navbar-burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Open menu">☰</button>
          </div>
        </div>
      </div>

      {/* Mobile sliding menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-close" onClick={() => setOpen(false)}>✕</button>
          <nav style={{display:'flex', flexDirection: 'column', gap: 12, marginTop: 8}}>
            <button className="category-button all" onClick={() => scrollToId('home')}>Home</button>
            <button className="category-button all" onClick={() => scrollToId('about')}>About us</button>
            <button className="category-button all" onClick={() => scrollToId('puzzles')}>Puzzles</button>
            <button className="category-button all" onClick={() => scrollToId('activite')}>Activite</button>
            <button className="category-button all" onClick={() => scrollToId('team')}>Team</button>
          </nav>
        </div>
      </div>
    </nav>
  )
}
