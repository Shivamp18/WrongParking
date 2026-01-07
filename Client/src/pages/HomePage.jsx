
import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {

const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center mb-12 mt-25 md:mt-33 px-8 ml-8 mr-8' style={{ backgroundColor: '#fff7f7'}}>
      <div className='text-center'>
        <p className='text-base md:text-lg font-bold mb-2' style={{ color: 'rgb(179 158 131)' }}>Your solution is as simple as your scan</p>
        <h1 className='text-4xl md:text-5xl font-medium mb-10 text-blue-950'>Parking Made Simple</h1>
        <div className='flex flex-col md:flex-row gap-4 justify-center'>
          <button onClick={() => navigate("/register")} className='border rounded-4xl px-7 py-4 bg-blue-950 text-white font-medium cursor-pointer w-full md:w-auto'>Register</button>
          <button onClick={() => navigate("/login")} className='border-2 border-blue-950 rounded-4xl px-7 py-4 font-medium cursor-pointer w-full md:w-auto'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage