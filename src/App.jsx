import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Photo from './pages/Photo'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='photo' element={<Photo/>} />
    </Routes>
  )
}

export default App
      {/* <Route path='/' element={<Home/>} /> */}
