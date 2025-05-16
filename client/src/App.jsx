import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-700">Tailwind is Working 🎉</h1>
        <p className="text-gray-600 mt-2">This is styled text.</p>
      </div>
    </div>
  )
}

export default App
