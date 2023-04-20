import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Form, InputGroup, Row, Stack, Table } from 'react-bootstrap'
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
	

	const consultations = [
		{
			fecha: '2021-09-01',
			unidad: 'A',
			paciente: 'Johan Liebert',
			prioridad: 'Alta',
		},
		{
			fecha: '2021-09-02',
			unidad: 'B',
			paciente: 'Johnny Joestar',
			prioridad: 'Baja',
		},
	]


	const [currentUserInfo, setCurrentUserInfo] = useState({})
	const [userLoading, setUserLoading] = useState(true)
	const [pacientes, setPacientes]  = useState()
	const [selectedPatient, setSelectedPatient] = useState(null)


	useEffect(() =>{
		
		fetch(`${API_URL}/doctor/pacientes?doctor_id=${currentUser.id}`)
			.then((response) => response.json())
			.then((pacientes) => {
				setPacientes(pacientes)
			})	
	},[])
	useEffect(() => {
		const fetchMedic = async () => {
			const response = await fetch(
				`http://localhost:5000/medicos/${currentUser.id}`,
			)
			const data = await response.json()
			setCurrentUserInfo({
				nombre: data[4],
				unidad: data[7],
				rol: 'Doctor',
				especialidad: data[6],
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
			<CustomNavbar />
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
				<>
					<Stack className="m-5" direction="horizontal" gap={3}>
						{Object.entries(currentUserInfo).map(([k, v]) => {
							return (
								<div className="bg-light border p-2">
									{
										<b>
											{k.charAt(0).toUpperCase() +
												k.slice(1)}
										</b>
									}
									: {v}
								</div>
							)
						})}
					</Stack>
					<Stack
						className="m-5 d-flex justify-content-center"
						direction="horizontal"
						gap={3}
					>
						<Link className="btn btn-primary" to="new-patient">
							Registrar Paciente
						</Link>
						<Link className="btn btn-primary" to="new-consultation">
							Agregar Consulta
						</Link>
						<Link className="btn btn-primary" to="manage-patient">
							Gestionar Pacientes
						</Link>
					</Stack>
					
					<div className="mx-auto w-50">
					<Row>
					<Col >
					{pacientes &&(<PatientsTable
							patients={pacientes}
							setSelectedPatient={setSelectedPatient}
							
						/>)}
						</Col>
						
						<Col>
						<h2>Información</h2>
						{selectedPatient && (
							<Table>
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
						<div className="d-flex justify-content-between">
							<Button
								variant="primary"
								onClick={() => {
									console.log(selectedPatient)
									navigate(
										`/patient_profile/${selectedPatient[0]}`,
									
										)}
								}
							>

								Perfil completo
							</Button>
							<Button
								variant="secondary"
								onClick={() =>
									navigate(
										`/new-consultation/${selectedPatient[0]}`,
									)
								}
							>
								General consulta
							</Button>
						</div>
					</Col>
					</Row>
					</div>
				</>
			)}
		</>
	)
}

export default Home
