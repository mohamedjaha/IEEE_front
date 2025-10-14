import React, { useEffect } from 'react'

export default function SelectedPuzzle({ puzzle, onClose, darkMode }) {
  useEffect(() => {
    if (!puzzle) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [puzzle, onClose])

  if (!puzzle) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        background: 'rgba(0,0,0,0.35)'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="selected-puzzle-card"
        style={{ background: darkMode ? '#0b1220' : '#ffffff' }}
      >
        {/* Image on top */}
        <div className="selected-puzzle-image" style={{ background: darkMode ? '#374151' : '#F3F4F6' }}>
          <div className="selected-puzzle-image-inner">
            {puzzle.image}
          </div>
        </div>

        {/* Details below image */}
  <div className="selected-puzzle-details">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{margin: 0, fontSize: 22, fontWeight: 700, color: darkMode ? '#fff' : '#1f2937'}}>{puzzle.name}</h3>
            <button onClick={onClose} style={{padding: '8px 12px', borderRadius: 8}}>Close</button>
          </div>

          <div style={{marginTop: 12, padding: 16, borderRadius: 8, background: darkMode ? '#111827' : 'rgba(0,114,188,0.05)'}}>
            <p style={{margin: 0, fontSize: 16, fontWeight: 600, color: '#2F7C31'}}>✓ Correct Answer:</p>
            <p style={{marginTop: 8, fontSize: 15, color: '#2F7C31'}}>{puzzle.answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
