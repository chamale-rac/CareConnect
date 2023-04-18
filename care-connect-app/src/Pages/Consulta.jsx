import React, { useState, useEffect, useContext } from 'react'
import {
	Card,
	Container,
	Row,
	Col,
	Form,
	Button,
	Table,
	Spinner,
	Accordion,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '/config'
import { UserContext } from '/src/context/UserContext'

const MedicalConsultation = () => {
	const { currentUser } = useContext(UserContext)
	let { consultaId } = useParams()

	const [saving, setSaving] = useState(false)
	const [estados, setEstados] = useState()
	const [consulta, setConsulta] = useState()
	const [bitacora, setBitacora] = useState()

	const [expediente, setExpediente] = useState()
	const [diagnostico, setDiagnostico] = useState()
	const [estadoPaciente, setEstadoPaciente] = useState()

	const [editable, setEditable] = useState(false)
	const [patientName, setPatientName] = useState('John Doe')
	const [doctorName, setDoctorName] = useState('Dr. Smith')
	const [date, setDate] = useState('2023-04-17')
	const [diagnosis, setDiagnosis] = useState('Flu')
	const [treatment, setTreatment] = useState('Rest and fluids')

	const medicines = [
		{ name: 'Medicine A', quantity: 2 },
		{ name: 'Medicine B', quantity: 1 },
		{ name: 'Medicine C', quantity: 3 },
	]

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

	const getBitacora = () => {
		fetch(`${API_URL}/paciente/consulta/bitacora/${consultaId}`, {
			mode: 'cors',
		})
			.then((response) => response.json())
			.then((data) => {
				setBitacora(data)
				setExpediente(data.expediente)
				setDiagnostico(data.diagnostico)
				setEstadoPaciente(data.eficacia)
			})
			.catch((error) => console.log(error))
	}

	const updateBitacora = () => {
		if (
			estadoPaciente !== bitacora.eficacia ||
			diagnostico !== bitacora.diagnostico ||
			expediente !== bitacora.expediente
		) {
			setSaving(true)
			fetch(`${API_URL}/bitacora/modificar`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					medico_id: currentUser.id,
					bitacora_id: bitacora.id_bitacora,
					eficacia: estadoPaciente,
					expediente: expediente,
					diagnostico: diagnostico,
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
					// Clear the selected doctor after saving changes
					getBitacora()
					setSaving(false)
				})
				.catch((error) => {
					console.log(error)
					// handle error
					alert('Ha ocurrido un error.')
				})
		}
	}

	const handleEdit = () => {
		setEditable(true)
	}

	const handleSave = () => {
		updateBitacora()
		setEditable(false)
	}

	useEffect(() => {
		fetch(`${API_URL}/paciente/consulta/${consultaId}`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setConsulta(data))
			.catch((error) => console.log(error))
	}, [])

	useEffect(() => {
		getBitacora()
	}, [])

	useEffect(() => {
		fetch(`${API_URL}/tipos_estado_paciente`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setEstados(data))
			.catch((error) => console.log(error))
	}, [])

	return (
		<Container className="mt-5">
			<h1>Consulta</h1>
			<Card className="mb-3">
				<Card.Header>
					<h2>Información General</h2>
				</Card.Header>
				{consulta ? (
					<Card.Body>
						<Row>
							<Col sm={6}>
								<p>Paciente: {consulta.paciente}</p>
								<p>Medico: {consulta.medico}</p>
								<p>
									Instalación Medica: {consulta.instalacion}
								</p>
							</Col>
						</Row>
						<p
							style={{
								color: 'grey',
								marginBottom: '0',
							}}
						>
							<b>Fecha de realización:</b> {consulta.fecha}
						</p>
					</Card.Body>
				) : (
					<Card.Body>
						<p>Cargando...</p>
					</Card.Body>
				)}
			</Card>

			<Accordion className="mb-3" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<div className="d-flex justify-content-between align-items-center">
							<h4>Información específica</h4>
						</div>
					</Accordion.Header>
					{bitacora ? (
						<Accordion.Body>
							<Row>
								<Col sm={6}>
									<p>Peso: {bitacora.peso}</p>
									<p>Presión Arterial: {bitacora.presion}</p>
								</Col>
							</Row>
							<Card>
								<Card.Header>
									<h6 style={{ marginBottom: '0px' }}>
										Editables
									</h6>
								</Card.Header>
								<Card.Body>
									{saving ? (
										<p>Realizando cambios...</p>
									) : (
										<Form>
											<Form.Group controlId="formBasicFacility">
												<Form.Label>
													Estado del paciente:
												</Form.Label>
												{estados && (
													<Form.Control
														as="select"
														value={estadoPaciente}
														onChange={(e) =>
															setEstadoPaciente(
																e.target.value,
															)
														}
														disabled={!editable}
													>
														{estados.map(
															(estado) => (
																<option
																	key={
																		estado.value
																	}
																	value={
																		estado.value
																	}
																>
																	{
																		estado.definition
																	}
																</option>
															),
														)}
													</Form.Control>
												)}
											</Form.Group>

											<Form.Group
												controlId="formDiagnosis"
												className="mt-3"
											>
												<Form.Label>
													Expediente
												</Form.Label>
												<Form.Control
													as="textarea"
													rows={3}
													placeholder="Escribe el diagnostico..."
													value={expediente}
													onChange={(e) =>
														setExpediente(
															e.target.value,
														)
													}
													readOnly={!editable}
												/>
											</Form.Group>

											<Form.Group
												controlId="formTreatment"
												className="mt-3"
											>
												<Form.Label>
													Diagnostico
												</Form.Label>
												<Form.Control
													as="textarea"
													rows={3}
													placeholder="Escribe el tratamiento..."
													value={diagnostico}
													onChange={(e) =>
														setDiagnostico(
															e.target.value,
														)
													}
													readOnly={!editable}
												/>
											</Form.Group>

											<Button
												className="mt-2"
												variant={
													editable
														? 'success'
														: 'warning'
												}
												onClick={
													editable
														? handleSave
														: handleEdit
												}
											>
												{editable
													? 'Guardar'
													: 'Editar'}
											</Button>
										</Form>
									)}
								</Card.Body>
								<Card.Footer>
									<p
										style={{
											color: 'grey',
											marginBottom: '0',
										}}
									>
										<b>Fecha de actualización:</b>{' '}
										{bitacora.fecha}
									</p>
								</Card.Footer>
							</Card>
						</Accordion.Body>
					) : (
						<Accordion.Body>
							<p>Cargando...</p>
						</Accordion.Body>
					)}
				</Accordion.Item>
			</Accordion>

			<Accordion className="mb-4">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<div className="d-flex justify-content-between align-items-center">
							<h4>Listas</h4>
						</div>
					</Accordion.Header>
					<Accordion.Body>
						<Row className="mt-2 mb-1">
							<Col className="mb-1">
								<Card
									style={{
										width: '24.1rem',
									}}
								>
									<Card.Header>Medicamentos</Card.Header>
									<Card.Body>
										<Table
											striped
											bordered
											hover
											style={{
												maxHeight: '150px',
												overflowY: 'auto',
												width: 'fit-content',
												display: 'block',
											}}
										>
											<thead>
												<tr>
													<th
														style={{
															width: '200px',
														}}
													>
														Nombre
													</th>
													<th
														style={{
															width: '200px',
														}}
													>
														Cantidad
													</th>
												</tr>
											</thead>
											<tbody>
												{medicines.map((medicine) => (
													<tr key={medicine.name}>
														<td>{medicine.name}</td>
														<td>
															{medicine.quantity}
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									</Card.Body>
								</Card>
							</Col>
							<Col className="mb-1">
								<Card
									style={{
										width: '24.1rem',
									}}
								>
									<Card.Header>Procedimientos</Card.Header>
									<Card.Body>
										<Table
											striped
											bordered
											hover
											style={{
												maxHeight: '150px',
												overflowY: 'auto',
												width: 'fit-content',
												display: 'block',
											}}
										>
											<thead>
												<tr>
													<th
														style={{
															width: '400px',
														}}
													>
														Nombre
													</th>
												</tr>
											</thead>
											<tbody>
												{medicines.map((medicine) => (
													<tr key={medicine.name}>
														<td>{medicine.name}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</Card.Body>
								</Card>
							</Col>
							<Col className="mb-1">
								<Card
									style={{
										width: '24.1rem',
									}}
								>
									<Card.Header>Enfermedades</Card.Header>
									<Card.Body>
										<Table
											striped
											bordered
											hover
											style={{
												maxHeight: '150px',
												overflowY: 'auto',
												width: 'fit-content',
												display: 'block',
											}}
										>
											<thead>
												<tr>
													<th
														style={{
															width: '400px',
														}}
													>
														Nombre
													</th>
												</tr>
											</thead>
											<tbody>
												{medicines.map((medicine) => (
													<tr key={medicine.name}>
														<td>{medicine.name}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	)
}

export default MedicalConsultation
