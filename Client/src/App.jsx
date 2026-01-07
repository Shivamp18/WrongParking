import React from 'react'
import HomePage from './pages/HomePage'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {


  return (
    <BrowserRouter>
      <AppRoutes />
      <Navbar/>
    </BrowserRouter>
  )
}

export default App
