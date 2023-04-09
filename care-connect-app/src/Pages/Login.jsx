import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { API_URL } from '../../config'

import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log('Form submitted:', {
			email,
			password,
		})

		try {
			const response = await fetch(`${API_URL}/login_medico`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})

			if (!response.ok) {
				throw new Error('An error occurred while logging in.')
			}

			const data = await response.json()
			console.log(data)
			// handle successful response
			navigate('/')
		} catch (error) {
			console.error(error)
			setError('An error occurred while logging in. Please try again.')
		}
	}

	return (
		<Container>
			<h1>Login</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	)
}

export default Login
