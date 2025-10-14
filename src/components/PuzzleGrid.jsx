import React from 'react'
import PuzzleCard from './PuzzleCard'

export default function PuzzleGrid({ puzzles, onSelect, darkMode, selectedCategory }) {
  const filtered = selectedCategory === 'all' ? puzzles : puzzles.filter(p => p.difficulty === selectedCategory)
  return (
    <div className="mb-8">
      <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {selectedCategory === 'all' ? 'All Puzzles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Puzzles`} <span className="text-blue-500 ml-2">({filtered.length})</span>
      </h3>
      {filtered.length === 0 ? (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl">No puzzles found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(p => (
            <PuzzleCard key={p.id} puzzle={p} onSelect={onSelect} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  )
}
