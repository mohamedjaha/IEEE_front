import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ puzzle, onClose, darkMode }) {
  useEffect(() => {
    if (!puzzle) return

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [puzzle, onClose])

  if (!puzzle) return null

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className={`modal-card rounded-2xl max-w-2xl w-full relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10 bg-white bg-opacity-80">
          <X className={darkMode ? 'text-gray-800' : 'text-gray-800'} />
        </button>

        <div className={`modal-image w-full aspect-square flex items-center justify-center text-[250px] ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {puzzle.image}
        </div>

        <div className="modal-content p-8">
          <h2 className={`modal-title text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{puzzle.name}</h2>
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[#0072BC] bg-opacity-10'}`}>
            <p className={`text-xl font-semibold mb-2 ${darkMode ? 'text-[#0072BC]' : 'text-[#0072BC]'}`}>✓ Correct Answer:</p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{puzzle.answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
