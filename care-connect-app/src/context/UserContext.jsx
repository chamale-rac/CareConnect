import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem('currentUser')) || null,
	)

	const login = (user) => {
		setCurrentUser(user)
		localStorage.setItem('currentUser', JSON.stringify(user))
	}

	const logout = () => {
		setCurrentUser(null)
		localStorage.removeItem('currentUser')
	}

	return (
		<UserContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
