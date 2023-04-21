import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Container, Button, Table, Form } from 'react-bootstrap'
import { PatientsTable } from '../../Components/PatientsTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { API_URL } from '/config'
import { TextField, Box } from '@mui/material'
import './ManagePatient.css'

export function ManagePatient() {
	const navigate = useNavigate()
	const handleBackClick = () => {
		navigate('/')
	}

	const [selectedPatient, setSelectedPatient] = useState(null)
	const [infoSelected, setInfoSelected] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const handleSearchClick = (e) => {
		e.preventDefault()
		fetch(`${API_URL}/buscar_paciente?search=${searchTerm}`)
			.then((response) => response.json())
			.then((pacientes) => {
				setInfoSelected(null)
				setSelectedPatient(null)
				setSearchResults(pacientes)
			})
	}

	console.log('this', selectedPatient)

	return (
		<Container className="mt-5">
			<Button className="btn" onClick={handleBackClick}>
				<ArrowBackIcon />
			</Button>
			<Card className="mt-5 glossy-card">
				<Card.Header>
					<h1 className="mt-3 card-title diminished more">
						Gestionar Pacientes
					</h1>
				</Card.Header>
				<Card.Body>
					<Form
						onSubmit={handleSearchClick}
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginBottom: '10px',
						}}
					>
						<Form.Group
							controlId="formBasicName"
							style={{ marginRight: '10px', marginLeft: '5px' }}
						>
							<Form.Control
								type="text"
								placeholder=""
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							style={{
								height: '39px',
								marginTop: '0px',
								padding: '0px',
							}}
						>
							Buscar
						</Button>
					</Form>
					<p
						style={{
							marginLeft: '5px',
						}}
					>
						Pro Tip! Aunque puedes buscar por nombre o apellido, al
						buscar con el input vacio podrás ver todos los
						pacientes.
					</p>
					<Row>
						<Col>
							<PatientsTable
								patients={searchResults}
								setSelectedPatient={setSelectedPatient}
							/>
						</Col>
						<Col>
							<h4>Información</h4>
							{!selectedPatient && (
								<p>
									Selecciona una fila del la tabla para
									visualizar la información básica del
									paciente.
								</p>
							)}
							{selectedPatient && (
								<Table style={{ color: 'whitesmoke' }}>
									<tbody>
										<tr>
											<td>Nombre:</td>
											<td>{selectedPatient[1]}</td>
										</tr>
										<tr>
											<td>Apellido:</td>
											<td>{selectedPatient[2]}</td>
										</tr>
										<tr>
											<td>Email:</td>
											<td>{selectedPatient[3]}</td>
										</tr>
										<tr>
											<td>Teléfono:</td>
											<td>{selectedPatient[4]}</td>
										</tr>
										<tr>
											<td>Dirección:</td>
											<td>{selectedPatient[5]}</td>
										</tr>
									</tbody>
								</Table>
							)}
							{selectedPatient && (
								<div className="d-flex justify-content-between">
									<Button
										variant="primary"
										onClick={() => {
											console.log(selectedPatient)
											navigate(
												`/patient_profile/${selectedPatient[0]}`,
											)
										}}
									>
										Ver perfil completo
									</Button>
									<Button
										variant="secondary"
										onClick={() =>
											navigate(
												`/new-consultation/${selectedPatient[0]}`,
											)
										}
									>
										Generar consulta
									</Button>
								</div>
							)}
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	)
}
