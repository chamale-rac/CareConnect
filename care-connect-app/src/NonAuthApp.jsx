import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import SignIn from './Pages/SignIn'
import Login from './Pages/Login'
import LandingAdmin from './Pages/Admin/LandingAdmin'
import LoginAdmin from './Pages/Admin/LoginAdmin'
import SignInAdmin from './Pages/Admin/SignInAdmin'

const AuthApp = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<SignIn />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin/signup" element={<SignInAdmin />} />
				<Route path="/admin/login" element={<LoginAdmin />} />
			</Routes>
		</>
	)
}

export default AuthApp
