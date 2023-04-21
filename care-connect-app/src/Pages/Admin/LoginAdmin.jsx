import React, { useState, useContext } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { API_URL } from '../../../config'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

const LoginAdmin = () => {
	const { login } = useContext(UserContext)

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
			const response = await fetch(`${API_URL}/login_admin`, {
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
			console.log({
				id: data.id,
				id_instalacion_medica: data.id_instalacion_medica,
				role: data.role,
			})
			// handle successful response
			login({
				id: data.id,
				id_instalacion_medica: data.id_instalacion_medica,
				role: data.role,
				correo: data.correo,
				nombre_instalacion: data.nombre_instalacion,
			})
			navigate('/')
		} catch (error) {
			console.error(error)
			setError('An error occurred while logging in. Please try again.')
		}
	}

	return (
		<Container
			className="d-flex flex-column justify-content-center"
			style={{ height: '100vh' }}
		>
			<Link class="btn mt-4 mb-4" style={{ width: 'fit-content' }} to="/">
				<ArrowBackIcon />
			</Link>

			<h1 className="page-title">login</h1>
			<p style={{ marginBottom: '20px' }}>
				Ingresa como{' '}
				<span
					style={{
						fontSize: '16px',
					}}
				>
					💼
				</span>{' '}
				<span
					style={{
						fontWeight: 'bold',
						textDecoration: 'underline',
					}}
				>
					Administrador
				</span>{' '}
				a la plataforma.
			</p>
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

				<Button className={'mt-3'} variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	)
}

export default LoginAdmin
