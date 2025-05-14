import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css"
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
      <div className="min-h-screen bg-yellow-200 flex items-center justify-center">
      <h1 className="text-4xl text-blue-600 font-bold">Tailwind is WORKING ✅</h1>
    </div>
    <Register/>;
    <Login/>;
    </>
  )
}

export default App
