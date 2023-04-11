import React, { useContext } from 'react'
import AuthApp from './AuthApp'
import NonAuthApp from './NonAuthApp'
import { UserContext } from './context/UserContext'

const RouterApp = () => {
	const { currentUser } = useContext(UserContext)
	return <>{currentUser ? <AuthApp /> : <NonAuthApp />}</>
}

export default RouterApp
