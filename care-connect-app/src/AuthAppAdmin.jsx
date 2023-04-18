import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import SettingsDropdown from './Components/SettingsDropdown'
import Transferencia from './Pages/Admin/Transferencia'
import { NewConsultation } from './Pages/NewConsultation/NewConsultation'
import { NewPatient } from './Pages/NewPatient/NewPatient'

const AuthAppAdmin = () => {
	return (
		<>
			<nav>
				<ul className="list-group">
					AUTH APP: ADMIN
					<li className="list-group-item">
						This is supposed to be the navbar cause it doesnt
						re-render
					</li>
					<li className="list-group-item">
						<Link to="/">Home</Link>
					</li>
					<li className="list-group-item">
						<Link to="/transferencia">
							Transferencia de Medicos
						</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							This it supposed to be the home for admin
							<SettingsDropdown />
						</div>
					}
				/>
				<Route path="/transferencia" element={<Transferencia />} />
				<Route
					path="/home/new-consultation"
					element={<NewConsultation />}
				/>
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</>
	)
}

export default AuthAppAdmin
