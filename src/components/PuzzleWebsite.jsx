import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import PuzzleGrid from './PuzzleGrid'
import Modal from './Modal'
import SelectedPuzzle from './SelectedPuzzle'

const samplePuzzles = [
  { id: 1, name: 'Math Challenge', difficulty: 'easy', image: '🔢', answer: 'The answer is 42' },
  { id: 2, name: 'Logic Grid', difficulty: 'medium', image: '🧩', answer: 'Pattern continues with blue square' },
  { id: 3, name: 'Riddle Master', difficulty: 'hard', image: '🤔', answer: "The answer is 'silence'" },
  { id: 4, name: 'Number Sequence', difficulty: 'easy', image: '📊', answer: 'Next number is 89' },
  { id: 5, name: 'Word Puzzle', difficulty: 'medium', image: '📝', answer: "The hidden word is 'INNOVATION'" },
  { id: 6, name: 'Brain Teaser', difficulty: 'hard', image: '🧠', answer: 'All of them - different perspectives' },
  { id: 7, name: 'Pattern Recognition', difficulty: 'easy', image: '🎯', answer: 'Pattern repeats every 5 steps' },
  { id: 8, name: 'Strategy Challenge', difficulty: 'medium', image: '♟️', answer: 'Move knight to E5' },
]

export default function PuzzleWebsite() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedPuzzle, setSelectedPuzzle] = useState(null)

  return (
  <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} smooth-scroll-enabled`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div>
        {/* full width wrappers so the section background spans 100% width */}
        <div className={`section-outer section-home-outer ${darkMode ? '' : 'light-section-outer'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section id="home" className={`section-centered section-home ${darkMode ? '' : 'light-section'}`}>
              <Hero darkMode={darkMode} />
            </section>
          </div>
        </div>

        <div className={`section-outer section-about-outer ${darkMode ? '' : 'light-section-outer'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section id="about" className={`section-centered section-about ${darkMode ? '' : 'light-section'}`} style={{marginTop: 40}}>
              <h2>About us</h2>
              <p>We are a team of puzzle enthusiasts building challenges to grow problem-solving skills.</p>
            </section>
          </div>
        </div>

        <div className={`section-outer section-puzzles-outer ${darkMode ? '' : 'light-section-outer'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section id="puzzles" className={`section-puzzles ${darkMode ? '' : 'light-section'}`} style={{marginTop: 40}}>
          {/* Top centered filter bar */}
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 18}}>
            {/* compute index for sliding indicator: all=0, easy=1, medium=2, hard=3 */}
            {(() => {
              const indexMap = { all: 0, easy: 1, medium: 2, hard: 3 }
              const idx = indexMap[selectedCategory] ?? 0
              return (
                <div className={`filter-bar`} style={{ ['--index']: idx }}>
                  <button onClick={() => setSelectedCategory('all')} className={`filter-item ${selectedCategory === 'all' ? 'active' : ''}`}>All</button>
                  <button onClick={() => setSelectedCategory('easy')} className={`filter-item ${selectedCategory === 'easy' ? 'active' : ''}`}>Easy</button>
                  <button onClick={() => setSelectedCategory('medium')} className={`filter-item ${selectedCategory === 'medium' ? 'active' : ''}`}>Medium</button>
                  <button onClick={() => setSelectedCategory('hard')} className={`filter-item ${selectedCategory === 'hard' ? 'active' : ''}`}>Hard</button>
                  <div className="filter-indicator" aria-hidden="true" />
                </div>
              )
            })()}
          </div>

          <div style={{display: 'flex', gap: 24, alignItems: 'flex-start'}}>
            <div style={{flex: 1}}>
              <PuzzleGrid puzzles={samplePuzzles} onSelect={setSelectedPuzzle} darkMode={darkMode} selectedCategory={selectedCategory} />
            </div>
          </div>
            </section>
          </div>
        </div>

        <div className={`section-outer section-activite-outer ${darkMode ? '' : 'light-section-outer'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section id="activite" className={`section-centered section-activite ${darkMode ? '' : 'light-section'}`} style={{marginTop: 40}}>
              <h2>Activite</h2>
              <p>Weekly challenges, leaderboards, and community events.</p>
            </section>
          </div>
        </div>

        <div className={`section-outer section-team-outer ${darkMode ? '' : 'light-section-outer'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section id="team" className={`section-centered section-team ${darkMode ? '' : 'light-section'}`} style={{marginTop: 40}}>
              <h2>Team</h2>
              <p>Meet the people behind this project.</p>
            </section>
          </div>
        </div>

        {/* Selected puzzle overlay */}
        {selectedPuzzle && (
          <SelectedPuzzle puzzle={selectedPuzzle} onClose={() => setSelectedPuzzle(null)} darkMode={darkMode} />
        )}
      </div>

    </div>
  )
}
