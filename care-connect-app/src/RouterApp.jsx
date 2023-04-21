import React, { useContext } from 'react'
import AuthApp from './AuthApp'
import NonAuthApp from './NonAuthApp'
import AuthAppAdmin from './AuthAppAdmin'
import { UserContext } from './context/UserContext'

const RouterApp = () => {
	const { currentUser } = useContext(UserContext)

	if (currentUser?.role == 'admin') {
		return <AuthAppAdmin />
	} else if (currentUser?.role == 'medico') {
		return <AuthApp />
	} else {
		return <NonAuthApp />
	}
}

export default RouterApp
