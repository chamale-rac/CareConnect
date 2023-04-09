import { useState, React } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Stock from './Pages/Stock'
import Notifications from './Pages/Notifications'
import Doctors from './Pages/Doctors'
import Landing from './Pages/Landing'
import SignIn from './Pages/SignIn'

import './App.css'
import { NewConsultation } from './Pages/NewConsultation/NewConsultation'
import { NewPatient } from './Pages//NewPatient/NewPatient'
function App() {
	return (
		<>
			<nav>
				<ul className="list-group">
					<li className="list-group-item">
						This is supposed to be the navbar cause it doesnt
						re-render
					</li>
					<li className="list-group-item">
						<Link to="/">Landing</Link>
					</li>
					<li className="list-group-item">
						<Link to="/home">Home</Link>
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
				<Route path="/" element={<Landing />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/login" element={<h3>login</h3>} />
				<Route path="/home" element={<Home />} />
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

export default App
