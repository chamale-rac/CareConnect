import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Container, Button, Table } from 'react-bootstrap'
import { PatientsTable } from '../../Components/PatientsTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { API_URL } from '/config'
import {
	TextField,
	Box,
  } from "@mui/material";
import './ManagePatient.css'

export function ManagePatient() {
	const navigate = useNavigate()
	const handleBackClick = () => {
		navigate('/home')
	}

	const [selectedPatient, setSelectedPatient] = useState(null)
	const [infoSelected, setInfoSelected] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const handleSearchClick = () => {
		fetch(`${API_URL}/buscar_paciente?search=${searchTerm}`)
			.then((response) => response.json())
			.then((pacientes) => {
				setInfoSelected(null)
				setSelectedPatient(null)
				setSearchResults(pacientes)
			})
	}



	console.log(selectedPatient)

	return (
		<>
			<Container className="mt-4">
				<Button className="btn" onClick={handleBackClick}>
					<ArrowBackIcon />
				</Button>
				<h1 className="border-bottom">Gestionar Pacientes</h1>
				<Row>
					<Col xs={12} md={7}>
						
						<div>
						<TextField
							label="Buscar pacientes"
							variant="outlined"
							size="small"
							value={searchTerm}
							onChange={handleInputChange}
							sx={{ mt: 0, ml: 0 }}
						/>
							<Box sx={{ mt: -5, ml: 30 }}>
							<Button
            					variant="primary"
								onClick={handleSearchClick}
							>
								Buscar
							</Button>
								</Box >
								<Box sx={{ mt: 2, ml: 30 }}>
								</Box>
							
						</div>
						
						<PatientsTable
							patients={searchResults}
							setSelectedPatient={setSelectedPatient}
							
						/>
					</Col>
					<Col>
						<h2>Información</h2>
						{selectedPatient && (
							<Table>
								<tbody>
									<tr className="MuiTableRow-root">
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
								onClick={() =>
									navigate(
										`/patient_profile/${selectedPatient[0]}`,
									)
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
			</Container>
		</>
	)
}
