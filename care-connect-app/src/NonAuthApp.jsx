import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import SignIn from './Pages/SignIn'
import Login from './Pages/Login'

const AuthApp = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}

export default AuthApp
