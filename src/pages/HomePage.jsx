
import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {

const navigate = useNavigate();

  return (
    <div className='mb-12 mt-33 px-8'>
      <div className='flex flex-col items-center justify-center' style={{ backgroundColor: '#fff7f7', height: '100vh' }}>
        <p className='text-lg font-bold mb-2' style={{ color: 'rgb(179 158 131)' }}>Your solution is as simple as your scan</p>
        <h1 className='text-5xl font-medium mb-10 text-blue-950'>Parking Made Simple</h1>
        <div className='flex gap-4'>
          <button onClick={() => navigate("/register")} className='border rounded-4xl px-7 py-4 bg-blue-950 text-white font-medium cursor-pointer'>Register</button>
          <button onClick={() => navigate("/login")} className='border-2 border-blue-950 rounded-4xl px-7 py-4 font-medium cursor-pointer'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage