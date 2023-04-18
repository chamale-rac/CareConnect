import React, { useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Landing = () => {
	const { currentUser, logout } = useContext(UserContext)
	return (
		<Container
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ height: '100vh' }}
		>
			<img
				width="150"
				height="150"
				src="https://drive.google.com/uc?id=15-xlIv3MLYsWEJd7GYs-9jysA5csr9UI"
				alt="Logo Image"
			/>
			<h1 className="mt-4">CareConnect: Doctor</h1>
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
			<Link className="mt-4" to="/admin">
				Im an admin
			</Link>
		</Container>
	)
}

export default Landing
