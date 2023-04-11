import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Stock from './Pages/Stock'
import Notifications from './Pages/Notifications'
import Doctors from './Pages/Doctors'
import Landing from './Pages/Landing'
import SignIn from './Pages/SignIn'
import Login from './Pages/Login'
import { NewConsultation } from './Pages/NewConsultation/NewConsultation'
import { NewPatient } from './Pages//NewPatient/NewPatient'

const AuthApp = () => {
	return (
		<>
			<nav>
				<ul className="list-group">
					AUTH APP
					<li className="list-group-item">
						This is supposed to be the navbar cause it doesnt
						re-render
					</li>
					<li className="list-group-item">
						<Link to="/">Home</Link>
					</li>
					<li className="list-group-item">
						<Link to="/stock">Consultas Stock</Link>
					</li>
					<li className="list-group-item">
						<Link to="/notifications">Notifications</Link>
					</li>
					<li className="list-group-item">
						<Link to="/doctors">Busqueda de Medicos</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/login" element={<Login />} />
				<Route path="/stock" element={<Stock />} />
				<Route path="/notifications" element={<Notifications />} />
				<Route path="/doctors" element={<Doctors />} />
				<Route
					path="/home/new-consultation"
					element={<NewConsultation />}
				/>
				<Route path="/home/new-patient" element={<NewPatient />} />
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</>
	)
}

export default AuthApp
