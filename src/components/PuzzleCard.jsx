import React from 'react'

export default function PuzzleCard({ puzzle, onSelect, darkMode }) {
  return (
    <div onClick={() => onSelect(puzzle)} className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
      <div className={`w-full aspect-square flex items-center justify-center text-[200px] ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {puzzle.image}
      </div>

      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{puzzle.name}</h3>
        <div className="flex items-center justify-between">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${puzzle.difficulty === 'easy' ? 'bg-[#2F7C31] bg-opacity-20 text-[#2F7C31]' : puzzle.difficulty === 'medium' ? 'bg-[#0072BC] bg-opacity-20 text-[#0072BC]' : 'bg-red-100 text-red-800'}`}>
            {puzzle.difficulty.toUpperCase()}
          </span>
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Click to reveal answerr →
          </span>
        </div>
      </div>
    </div>
  )
}
