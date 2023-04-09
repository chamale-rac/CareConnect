import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'

function SignIn() {
	const navigate = useNavigate()

	const [correo, setCorreo] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [nombre, setNombre] = useState('')
	const [direccion, setDireccion] = useState('')
	const [numTelefono, setNumTelefono] = useState('')
	const [idEspecialidadMedica, setIdEspecialidadMedica] = useState('')
	const [idInstalacionMedica, setIdInstalacionMedica] = useState('')
	const [especialidades, setEspecialidades] = useState([])
	const [instalaciones, setInstalaciones] = useState([])
	const [error, setError] = useState('')

	// make a GET request to the API to get the list of especialidades when the component mounts
	useEffect(() => {
		fetch(`${API_URL}/especialidad_medica`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setEspecialidades(data))
			.catch((error) => console.log(error))
	}, [])

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
			nombre,
			direccion,
			numTelefono,
			idEspecialidadMedica,
			idInstalacionMedica,
		})

		fetch(`${API_URL}/registrar_medico`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				correo,
				contraseña,
				nombre,
				direccion,
				numTelefono,
				idEspecialidadMedica,
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
				navigate('/login')
			})
			.catch((error) => {
				console.log(error)
				// handle error
				const errorMessage = 'Hubo un error al registrar el médico.'
				setError(
					'Hubo un error al registrarte. Probablemente el correo ya está en uso.',
				)
			})
	}

	return (
		<Container>
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

				<Form.Group controlId="formBasicName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicAddress">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your address"
						value={direccion}
						onChange={(e) => setDireccion(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPhone">
					<Form.Label>Phone number</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter your phone number"
						value={numTelefono}
						onChange={(e) => setNumTelefono(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicSpecialty">
					<Form.Label>Medical specialty ID</Form.Label>
					<Form.Control
						as="select"
						value={idEspecialidadMedica}
						onChange={(e) =>
							setIdEspecialidadMedica(e.target.value)
						}
						required
					>
						<option value="">Select an option</option>
						{especialidades.map((especialidad) => (
							<option
								key={especialidad[0]}
								value={especialidad[0]}
							>
								{especialidad[1]}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="formBasicFacility">
					<Form.Label>Medical facility ID</Form.Label>
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

				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</Container>
	)
}

export default SignIn
