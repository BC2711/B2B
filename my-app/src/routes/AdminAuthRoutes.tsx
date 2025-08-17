import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/admin/Login'
import Forgetpassword from '../pages/admin/Forgetpassword'

const AdminAuthRoutes: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />} />
                 <Route path='forget-password' element={<Forgetpassword/>}/>
            </Routes>
        </div>
    )
}

export default AdminAuthRoutes