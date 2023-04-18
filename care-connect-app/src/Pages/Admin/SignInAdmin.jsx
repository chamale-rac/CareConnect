import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config'

function SignInAdmin() {
	const navigate = useNavigate()

	const [correo, setCorreo] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [idInstalacionMedica, setIdInstalacionMedica] = useState('')
	const [instalaciones, setInstalaciones] = useState([])
	const [error, setError] = useState('')

	// make a GET request to the API to get the list of instalaciones when the component mounts
	useEffect(() => {
		fetch(`${API_URL}/instalacion_medica`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setInstalaciones(data))
			.catch((error) => console.log(error))
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Form submitted:', {
			correo,
			contraseña,
			idInstalacionMedica,
		})

		fetch(`${API_URL}/registrar_admin`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				correo,
				contraseña,
				idInstalacionMedica,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				return response.json()
			})
			.then((data) => {
				console.log(data)
				// handle successful response
				navigate('/admin/login')
			})
			.catch((error) => {
				console.log(error)
				// handle error
				setError(
					'Hubo un error al registrarte. Probablemente el correo ya está en uso.',
				)
			})
	}

	return (
		<Container
			className="d-flex flex-column justify-content-center"
			style={{ height: '100vh' }}
		>
			<h1>Sign Up</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={correo}
						onChange={(e) => setCorreo(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={contraseña}
						onChange={(e) => setContraseña(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicFacility">
					<Form.Label>Unidad medica</Form.Label>
					<Form.Control
						as="select"
						value={idInstalacionMedica}
						onChange={(e) => setIdInstalacionMedica(e.target.value)}
						required
					>
						<option value="">Select an option</option>
						{instalaciones.map((instalacion) => (
							<option key={instalacion[0]} value={instalacion[0]}>
								{instalacion[1]}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Button className={'mt-3'} variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</Container>
	)
}

export default SignInAdmin
