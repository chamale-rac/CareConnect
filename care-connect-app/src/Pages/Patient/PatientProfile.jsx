import React, { useState, useEffect } from 'react'
import {
	Container,
	Row,
	Col,
	Card,
	Accordion,
	Button,
	Form,
} from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { API_URL } from '/config'

const PatientProfile = () => {
	let { patientId } = useParams()
	const [paciente, setPaciente] = useState()
	const [consultations, setConsultations] = useState([])
	const [lastConsultation, setLastConsultation] = useState()

	const [sortBy, setSortBy] = useState(null)
	const [sortDirection, setSortDirection] = useState(1)
	const [searchAuthor, setSearchAuthor] = useState('')
	const [searchDateInterval, setSearchDateInterval] = useState({})

	useEffect(() => {
		fetch(`${API_URL}/paciente/${patientId}`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setPaciente(data))
			.catch((error) => console.log(error))
	}, [])

	useEffect(() => {
		fetch(`${API_URL}/paciente/ultima_consulta/${patientId}`, {
			mode: 'cors',
		})
			.then((response) => response.json())
			.then((data) => setLastConsultation(data))
			.catch((error) => console.log(error))
	}, [])

	useEffect(() => {
		fetch(`${API_URL}/paciente/consultas/${patientId}`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setConsultations(data)
			})
			.catch((error) => console.log(error))
	}, [])

	const estadoType = (estado) => {
		switch (estado) {
			case 0:
				return 'Paciente difunto'
			case 1:
				return 'Empeoramiento'
			case 2:
				return 'Estable'
			case 3:
				return 'Mejoría'
			case 4:
				return 'No Aplica'
			default:
				return 'Desconocido'
		}
	}

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortDirection(sortDirection * -1)
		} else {
			setSortBy(field)
			setSortDirection(1)
		}
	}

	const handleAuthorSearch = (event) => {
		setSearchAuthor(event.target.value)
	}

	const handleDateIntervalSearch = (event) => {
		const { name, value } = event.target
		setSearchDateInterval((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const filteredConsultations = consultations.filter((consult) => {
		let match = true
		if (
			searchAuthor &&
			!consult.author
				.toLowerCase()
				.includes(searchAuthor.toLowerCase()) &&
			!consult.instalacion
				.toLowerCase()
				.includes(searchAuthor.toLowerCase())
		) {
			match = false
		}
		if (
			searchDateInterval.start &&
			new Date(consult.date) < new Date(searchDateInterval.start)
		) {
			match = false
		}
		if (
			searchDateInterval.end &&
			new Date(consult.date) > new Date(searchDateInterval.end)
		) {
			match = false
		}
		return match
	})

	const sortedConsultations = sortBy
		? [...filteredConsultations].sort((a, b) => {
				if (a[sortBy] > b[sortBy]) return sortDirection
				if (a[sortBy] < b[sortBy]) return -sortDirection
				return 0
		  })
		: filteredConsultations

	return (
		paciente && (
			<Container className="mt-5">
				<h1>Paciente</h1>
				<Card className="mb-3">
					<Card.Header>
						<h2>Información General</h2>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col sm={6}>
								<p>Nombres: {paciente.nombres}</p>
								<p>Apellidos: {paciente.apellidos}</p>
								<p>Correo: {paciente.correo}</p>
							</Col>
							<Col sm={6}>
								<p>Núm. Teléfono: {paciente.telefono}</p>
								<p>Direccion: {paciente.direccion}</p>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className="mb-3">
					<Card.Header>
						<h4>Información específica</h4>
						<p
							style={{
								color: 'grey',
								fontSize: '0.8rem',
								marginBottom: '0rem',
							}}
						>
							*Estos datos corresponden al ultimo chequeo del
							paciente
						</p>
					</Card.Header>
					{lastConsultation && (
						<Card.Body>
							<Row>
								<Col sm={6}>
									<p>Peso: {lastConsultation.peso}</p>
									<p>
										Presión Arterial:{' '}
										{lastConsultation.presion_arterial}
									</p>
								</Col>
								<Col sm={6}>
									<p>
										Estado del paciente:{' '}
										{estadoType(lastConsultation.eficacia)}
									</p>
								</Col>
							</Row>
							<p
								style={{
									color: 'grey',
									marginBottom: '0',
								}}
							>
								<b>Fecha de actualización:</b>{' '}
								{lastConsultation.fecha}
							</p>
						</Card.Body>
					)}
				</Card>
				<Accordion className="mb-3">
					<Accordion.Item eventKey="0">
						<Accordion.Header>
							<div className="d-flex justify-content-between align-items-center">
								<h4>Consultas medicas</h4>
							</div>
						</Accordion.Header>
						<Accordion.Body>
							<Card className="mb-3">
								<Card.Header>Filtros</Card.Header>
								<Card.Body>
									<Row>
										<Form.Group
											className="mb-3"
											controlId="formMedico"
										>
											<Form.Control
												type="text"
												placeholder="Nombre del medico o centro medico"
												value={searchAuthor}
												onChange={handleAuthorSearch}
											/>
											<Form.Text className="text-muted">
												Busquedas por el nombre del
												medico o centro medico en el que
												se realizo la consulta
											</Form.Text>
										</Form.Group>
										<Form.Group
											className="mb-3"
											controlId="inicioFecha"
										>
											<Form.Label>Desde:</Form.Label>
											<input
												type="date"
												placeholder="Start Date"
												name="start"
												className="ms-2"
												value={
													searchDateInterval.start ||
													''
												}
												onChange={
													handleDateIntervalSearch
												}
											/>
											<br></br>
											<Form.Text className="text-muted">
												*Ingresa la fecha minima de
												busqueda
											</Form.Text>
										</Form.Group>
										<Form.Group
											className="mb-3"
											controlId="finFecha"
										>
											<Form.Label>Hasta: </Form.Label>
											<input
												className="ms-2"
												type="date"
												placeholder="End Date"
												name="end"
												value={
													searchDateInterval.end || ''
												}
												onChange={
													handleDateIntervalSearch
												}
											/>
											<br></br>
											<Form.Text className="text-muted">
												Ingresa la fecha maxima de
												busqueda
											</Form.Text>
										</Form.Group>
										<Col sm={4}>
											<Button
												variant="outline-secondary"
												size="sm"
												className="me-2"
												onClick={() =>
													handleSort('date')
												}
												style={{
													fontSize: '15px',
												}}
											>
												Ordenar por fecha ↓↑
											</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
							<Container className="mb-3">
								{Array(
									Math.ceil(sortedConsultations.length / 3),
								)
									.fill()
									.map((_, rowIdx) => (
										<Row className="mt-2 mb-2" key={rowIdx}>
											{sortedConsultations
												.slice(
													rowIdx * 3,
													rowIdx * 3 + 3,
												)
												.map((consult, colIdx) => (
													<Col
														className="mb-2"
														key={colIdx}
													>
														<Card
															style={{
																width: '24.1rem',
															}}
														>
															<Card.Body>
																<Card.Title>
																	{
																		consult.author
																	}
																</Card.Title>
																<Card.Subtitle className="mb-2 text-muted">
																	{
																		consult.date
																	}{' '}
																	|{' '}
																	{
																		consult.instalacion
																	}
																</Card.Subtitle>
																<Card.Text>
																	{
																		consult.details
																	}
																</Card.Text>
																<Link
																	to={`/consulta/${consult.id}`}
																>
																	Ver mas...
																</Link>
															</Card.Body>
														</Card>
													</Col>
												))}
										</Row>
									))}
							</Container>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				<Card className="mb-3">
					<Card.Header>Otras opciones</Card.Header>
					<Card.Body>
						<Button className="me-3" variant="primary">
							Realizar Nueva Consulta
						</Button>
						<Button className="me-3" variant="danger">
							Informar muerte
						</Button>
					</Card.Body>
				</Card>
			</Container>
		)
	)
}

export default PatientProfile
