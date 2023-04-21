import { React, useState } from 'react'
import { Form, Button, InputGroup, Alert, Container } from 'react-bootstrap'
import { API_URL } from '/config'
import { useNavigate } from 'react-router-dom'

export default function PatientForm() {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [validated, setValidated] = useState(false)
	const [patient, setPatient] = useState({
		correo: '',
		nombres: '',
		apellidos: '',
		telefono: '',
		direccion: '',
	})

	const handleSumbmit = (e) => {
		e.preventDefault()

		fetch(`${API_URL}/registrar_paciente`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				correo: patient.correo,
				nombres: patient.nombres,
				apellidos: patient.apellidos,
				telefono: patient.telefono,
				direccion: patient.direccion,
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
				navigate('/')
			})
			.catch((error) => {
				console.log(error)
				// handle error
				setError(
					'Hubo un error al registrar al paciente. Probablemente el correo ya está en uso.',
				)
			})
	}

	return (
		<Container className="patient-container container">
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSumbmit}>
				<Form.Group className="mb-3 " controlId="formBasicEmail">
					<Form.Label>Correo Electrónico</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="email"
							value={patient.correo}
							onChange={(e) =>
								setPatient({
									...patient,
									correo: e.target.value,
								})
							}
							required
						/>

						<Form.Control.Feedback type="invalid">
							Por favor ingrese un correo electrónico válido.
						</Form.Control.Feedback>
					</InputGroup>
					<Form.Text style={{ color: 'whitesmoke', opacity: '0.7' }}>
						example@gmail.com
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPatientName">
					<Form.Label>Nombres</Form.Label>
					<Form.Control
						type="input"
						placeholder=""
						value={patient.nombres}
						onChange={(e) =>
							setPatient({ ...patient, nombres: e.target.value })
						}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPatientSurname">
					<Form.Label>Apellidos</Form.Label>
					<Form.Control
						type="input"
						placeholder=""
						value={patient.apellidos}
						onChange={(e) =>
							setPatient({
								...patient,
								apellidos: e.target.value,
							})
						}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPatientPhone">
					<Form.Label>Teléfono</Form.Label>
					<Form.Control
						type="number"
						value={patient.telefono}
						onChange={(e) =>
							setPatient({ ...patient, telefono: e.target.value })
						}
						required
					/>

					<Form.Control.Feedback type="invalid">
						Por favor ingrese un número válido.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPatientAddress">
					<Form.Label>Dirección</Form.Label>
					<Form.Control
						type="input"
						placeholder=""
						value={patient.direccion}
						onChange={(e) =>
							setPatient({
								...patient,
								direccion: e.target.value,
							})
						}
						required
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Registrar Paciente
				</Button>
			</Form>
		</Container>
	)
}
