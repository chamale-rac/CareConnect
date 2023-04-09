import React, { useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Landing = () => {
	const [currentUser, setCurrentUser] = useContext(UserContext)
	return (
		<Container
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ height: '100vh' }}
		>
			<h1>CareConnect</h1>
			<h1>
				{currentUser && <p>Welcome, {currentUser.name}!</p>}
				{!currentUser && <p>Please log in.</p>}
			</h1>
			<div className="mt-4">
				<Button variant="primary" className="me-3">
					<Link
						to="/login"
						style={{ color: 'white', textDecoration: 'none' }}
					>
						LogIn
					</Link>
				</Button>
				<Button variant="secondary">
					<Link
						to="/signin"
						style={{ color: 'white', textDecoration: 'none' }}
					>
						SignIn
					</Link>
				</Button>
			</div>
		</Container>
	)
}

export default Landing
