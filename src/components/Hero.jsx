import React from 'react'

export default function Hero({ darkMode }) {
  return (
    <div className="text-center mb-12">
      <h1 className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome To Our Big Family</h1>
      <h2
        className="text-4xl font-bold mb-6"
        style={{ color: darkMode ? '#2F7C31' : '#000000ff' }}
      >
        PUZZLE CHALLENGE CENTER
      </h2>
      <p
        className="text-lg max-w-3xl mx-auto"
        style={{ color: darkMode ? '#2F7C31' : '#6B7280' }}
      >
        Test your mind with our collection of challenging puzzles. Click on any puzzle to reveal the answer and expand your problem-solving skills!
      </p>
    </div>
  )
}
