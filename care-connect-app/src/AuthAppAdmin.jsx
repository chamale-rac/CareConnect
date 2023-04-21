import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import SettingsDropdown from './Components/SettingsDropdown'
import Transferencia from './Pages/Admin/Transferencia'
import { NewConsultation } from './Pages/NewConsultation/NewConsultation'
import { NewPatient } from './Pages/NewPatient/NewPatient'

import Statistics from './Pages/Statistics/Statistics'
import Notifications from './Pages/NotificationsAdmin'
import CustomNavbar from './Components/CustomNavbarAdmin'
import { AdminHome } from './Pages/AdminHome'

import { AddProduct } from './Pages/AddProduct/AddProduct'
import { ManageStock } from './Pages/ManageStock/ManageStock'
import Stock from './Pages/Stock'

const AuthAppAdmin = () => {
	return (
		<>
			<CustomNavbar />
			<Routes>
				<Route path="/" element={<AdminHome />} />
				<Route
					path="/home/new-consultation"
					element={<NewConsultation />}
				/>
				<Route path="/estadisticas" element={<Statistics />} />
				<Route path="/notifications" element={<Notifications />} />
				<Route path="*" element={<h1>404 Not Found</h1>} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/add-stock" element={<ManageStock />} />
				<Route path="/manage-stock" element={<Stock />} />
			</Routes>
		</>
	)
}

export default AuthAppAdmin
