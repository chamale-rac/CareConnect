import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
	Form,
	InputGroup,
	Row,
	Stack,
	Table,
	Card,
	Container,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PatientsTable } from '../Components/PatientsTable'
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import CustomNavbar from '../Components/CustomNavbar.jsx'
import { UserContext } from '../context/UserContext.jsx'
import { Spinner, Col, Button } from 'react-bootstrap'
import { API_URL } from '/config'
import '../App.css'

function Home() {
	const { currentUser } = useContext(UserContext)
	const navigate = useNavigate()

	const [currentUserInfo, setCurrentUserInfo] = useState({})
	const [userLoading, setUserLoading] = useState(true)
	const [pacientes, setPacientes] = useState()
	const [selectedPatient, setSelectedPatient] = useState(null)

	useEffect(() => {
		fetch(`${API_URL}/doctor/pacientes?doctor_id=${currentUser.id}`)
			.then((response) => response.json())
			.then((pacientes) => {
				setPacientes(pacientes)
			})
	}, [])
	useEffect(() => {
		const fetchMedic = async () => {
			const response = await fetch(
				`http://localhost:5000/medicos/${currentUser.id}`,
			)
			const data = await response.json()
			setCurrentUserInfo({
				nombre: data[4],
				unidad: currentUser.nombre_instalacion_medica,
				rol: 'Doctor',
				especialidad: currentUser.nombre_especialidad_medica,
			})
			setUserLoading(false)
		}
		fetchMedic()
	}, [])

	/*
    const currentUser = {
        nombre: "Michio Kaku",
        unidad: "The Care",
        rol: "Doctor",
        especialidad: "Cardiólogo",
    };
    */

	return (
		<>
			{userLoading ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: '50vh' }}
				>
					<Spinner animation="grow" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : (
				<Container>
					<Card className="mt-5 glossy-card">
						<Card.Header>
							<h1 className="mt-3 card-title diminished more">
								Tu información
							</h1>
						</Card.Header>
						<Card.Body>
							<Stack direction="horizontal" gap={3}>
								{Object.entries(currentUserInfo).map(
									([k, v]) => {
										return (
											<div className=" p-2">
												{
													<b>
														{k
															.charAt(0)
															.toUpperCase() +
															k.slice(1)}
													</b>
												}
												: {v}
											</div>
										)
									},
								)}
							</Stack>
						</Card.Body>
					</Card>
					<Card className="mt-5 glossy-card">
						<Card.Header>
							<h1 className="mt-3 card-title diminished more">
								Acciones rápidas
							</h1>
						</Card.Header>
						<Card.Body className="">
							<Stack direction="horizontal" gap={3}>
								<Link
									style={{ fontSize: '1rem' }}
									className="btn btn-primary"
									to="new-patient"
								>
									Registrar Paciente
								</Link>
								<Link
									style={{ fontSize: '1rem' }}
									className="btn btn-primary"
									to="new-consultation"
								>
									Agregar Consulta
								</Link>
								<Link
									style={{
										fontSize: '1rem',
									}}
									className="btn btn-primary"
									to="manage-patient"
								>
									Gestionar Pacientes
								</Link>
							</Stack>
						</Card.Body>
					</Card>

					<Card className="mt-5 glossy-card">
						<Card.Header>
							<h1 className="mt-3 card-title diminished more">
								Tus pacientes
							</h1>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col>
									{pacientes && (
										<PatientsTable
											patients={pacientes}
											setSelectedPatient={
												setSelectedPatient
											}
										/>
									)}
								</Col>

								<Col>
									<h4>Información</h4>
									{!selectedPatient && (
										<p>
											Selecciona una fila del la tabla
											para visualizar la información
											básica del paciente.
										</p>
									)}
									{selectedPatient && (
										<Table style={{ color: 'whitesmoke' }}>
											<tbody>
												<tr>
													<td>Nombre:</td>
													<td>
														{selectedPatient[1]}
													</td>
												</tr>
												<tr>
													<td>Apellido:</td>
													<td>
														{selectedPatient[2]}
													</td>
												</tr>
												<tr>
													<td>Email:</td>
													<td>
														{selectedPatient[3]}
													</td>
												</tr>
												<tr>
													<td>Teléfono:</td>
													<td>
														{selectedPatient[4]}
													</td>
												</tr>
												<tr>
													<td>Dirección:</td>
													<td>
														{selectedPatient[5]}
													</td>
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
			)}
		</>
	)
}

export default Home
