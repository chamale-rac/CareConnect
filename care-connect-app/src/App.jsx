import { useState, React } from 'react'
import RouterApp from './RouterApp'

import { UserProvider } from './context/UserContext'

import './App.css'

function App() {
	return (
		<UserProvider>
			<RouterApp />
		</UserProvider>
	)
}

export default App
