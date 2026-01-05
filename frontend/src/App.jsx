import React from 'react'
import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'

const App = () =>
{
  return (
    <div>
      <button data-theme="forest" className="btn btn-outline" onClick={() => toast.success('Welcome to Mern-Thinkboard!')}>Show Welcome Toast</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
