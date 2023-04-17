import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '/config'

const MedicalConsultation = () => {
	let { consultaId } = useParams()

	const [consulta, setConsulta] = useState()
	const [bitacora, setBitacora] = useState()

	const [expediente, setExpediente] = useState()
	const [diagnostico, setDiagnostico] = useState()

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

	const updateBitacora = () => {}

	const getBitacora = () => {
		fetch(`${API_URL}/paciente/consulta/bitacora/${consultaId}`, {
			mode: 'cors',
		})
			.then((response) => response.json())
			.then((data) => {
				setBitacora(data)
				setExpediente(data.expediente)
				setDiagnostico(data.diagnostico)
			})
			.catch((error) => console.log(error))
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

	return (
		<Container className="mt-5">
			<h1>Consulta</h1>
			{consulta && (
				<Card className="mb-3">
					<Card.Header>
						<h2>Información General</h2>
					</Card.Header>
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
				</Card>
			)}

			<Card className="mb-3">
				<Card.Header>
					<h4>Información específica</h4>
				</Card.Header>
				{bitacora && (
					<Card.Body>
						<Row>
							<Col sm={6}>
								<p>Peso: {bitacora.peso}</p>
								<p>Presión Arterial: {bitacora.presion}</p>
							</Col>
							<Col sm={6}>
								<p>
									Estado del paciente:{' '}
									{estadoType(bitacora.eficacia)}
								</p>
							</Col>
						</Row>
						<Card>
							<Card.Header>
								<h5>Editables</h5>
							</Card.Header>
							<Card.Body>
								<Form>
									<Form.Group controlId="formDiagnosis">
										<Form.Label>Expediente</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											placeholder="Enter diagnosis"
											value={expediente}
											onChange={(e) =>
												setExpediente(e.target.value)
											}
											readOnly={!editable}
										/>
									</Form.Group>

									<Form.Group
										controlId="formTreatment"
										className="mt-2"
									>
										<Form.Label>Diagnostico</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											placeholder="Enter treatment"
											value={diagnostico}
											onChange={(e) =>
												setDiagnostico(e.target.value)
											}
											readOnly={!editable}
										/>
									</Form.Group>

									<Button
										className="mt-2"
										variant={
											editable ? 'success' : 'warning'
										}
										onClick={
											editable ? handleSave : handleEdit
										}
									>
										{editable ? 'Save' : 'Edit'}
									</Button>
								</Form>
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
					</Card.Body>
				)}
			</Card>

			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h1>Medical Consultation</h1>
					<br />
					<h3>Assigned Medicines</h3>
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
									Medicine
								</th>
								<th
									style={{
										width: '200px',
									}}
								>
									Quantity
								</th>
							</tr>
						</thead>
						<tbody>
							{medicines.map((medicine) => (
								<tr key={medicine.name}>
									<td>{medicine.name}</td>
									<td>{medicine.quantity}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	)
}

export default MedicalConsultation
