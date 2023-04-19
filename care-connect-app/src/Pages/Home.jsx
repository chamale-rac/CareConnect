import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Form, InputGroup, Stack, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react'
import CustomNavbar from '../Components/CustomNavbar.jsx'
import { UserContext } from '../context/UserContext.jsx'
import { Spinner } from 'react-bootstrap'
import '../App.css'

function Home() {
	const { currentUser } = useContext(UserContext)

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
					<InputGroup className="mb-3 w-50 mx-auto">
						<Form.Control
							placeholder="Search consultations"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
						<InputGroup.Text id="basic-addon1">
							<SearchIcon></SearchIcon>
						</InputGroup.Text>
					</InputGroup>
					<div className="mx-auto w-50">
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Fecha</th>
									<th>Unidad</th>
									<th>Paciente</th>
									<th>Prioridad</th>
								</tr>
							</thead>
							<tbody>
								{consultations.map((consultation) => (
									<tr>
										<td>{consultation.fecha}</td>
										<td>{consultation.unidad}</td>
										<td>{consultation.paciente}</td>
										<td>{consultation.prioridad}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</>
			)}
		</>
	)
}

export default Home
