import React, { useContext } from 'react'
import { Container, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import FlipCard from '../Components/Landing/FlipCard'

const Landing = () => {
	const { currentUser, logout } = useContext(UserContext)
	return (
		<>
			<FlipCard />
		</>
	)
}

export default Landing
