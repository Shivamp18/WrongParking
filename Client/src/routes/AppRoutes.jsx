
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserDashboard from '../pages/UserDashboard'
import EditProfile from '../pages/EditProfile'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<UserDashboard />} />
            <Route path='/edit-profile' element={<EditProfile />} />
        </Routes>
    )
}

export default AppRoutes