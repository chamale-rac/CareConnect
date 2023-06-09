import React, { useContext } from 'react'
import { UserProvider } from './context/UserContext'

import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Stock from './Pages/Stock'
import Notifications from './Pages/Notifications'
import Landing from './Pages/Landing'
import SignIn from './Pages/SignIn'
import Login from './Pages/Login'
import { NewConsultation } from './Pages/NewConsultation/NewConsultation'
import { NewPatient } from './Pages//NewPatient/NewPatient'
import { AddProduct } from './Pages/AddProduct/AddProduct'
import { ManageStock } from './Pages/ManageStock/ManageStock'
import { ManagePatient } from './Pages/ManagePatient/ManagePatient'
import Statistics from './Pages/Statistics/Statistics'
import PatientProfile from './Pages/Patient/PatientProfile'
import Consulta from './Pages/Consulta'

import CustomNavbar from './Components/CustomNavbar'

const AuthApp = () => {
	return (
		<>
			<CustomNavbar />
				<Routes>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/login" element={<Login />} />
					<Route path="/stock" element={<Stock />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route
						path="/new-consultation/:patientId?"
						element={<NewConsultation />}
					/>
					<Route path="/new-patient" element={<NewPatient />} />
					<Route path="/add-product" element={<AddProduct />} />
					<Route path="/manage-stock" element={<ManageStock />} />
					<Route path="/manage-patient" element={<ManagePatient />} />
					<Route path="*" element={<h1>404 Not Found</h1>} />
					<Route
						path="/patient_profile/:patientId"
						element={<PatientProfile />}
					/>
					<Route
						path="/consulta/:consultaId"
						element={<Consulta />}
					/>
					<Route path="/estadisticas" element={<Statistics />} />
					<Route path="/" element={<Home />} />
				</Routes>
		</>
	)
}

export default AuthApp
