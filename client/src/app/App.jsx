import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import '../App.css'
import LoginRegister from '../features/auth/LoginRegister'
import LandingPage from '../features/LandingPage';
import NavBar from '../features/NavBar';

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </div>
  )
}

export default App
