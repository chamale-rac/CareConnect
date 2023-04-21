import React, { useState, useContext } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { API_URL } from '../../config'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
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
				throw new Error(
					'Ocurrió un error al intentar ingresar. Por favor trata de nuevo.',
				)
			}
			const data = await response.json()
			console.log({ name: data.nombre, id: data.id, role: data.role })
			// handle successful response
			login({
				name: data.nombre,
				id: data.id,
				role: data.role,
				id_instalacion_medica: data.id_instalacion_medica,
			})
			navigate('/')
		} catch (error) {
			console.error(error)
			setError(
				'Ocurrió un error al intentar ingresar. Por favor trata de nuevo.',
			)
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
					👨‍⚕️
				</span>{' '}
				<span
					style={{
						fontWeight: 'bold',
						textDecoration: 'underline',
					}}
				>
					Doctor
				</span>{' '}
				a la plataforma.
			</p>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Correo electrónico</Form.Label>
					<Form.Control
						type="email"
						placeholder="Ingresa tu correo electrónico..."
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type="password"
						placeholder="Ingresa tu contraseña..."
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

export default Login
