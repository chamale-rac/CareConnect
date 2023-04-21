import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { Search } from '@mui/icons-material'
import { UserContext } from '/src/context/UserContext'

import {
	TextField,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'

import { API_URL } from '/config'

function Transferencia() {
	// Replace this with actual data
	const [success, setSuccess] = useState('')
	const { currentUser } = useContext(UserContext)

	const [instalaciones, setInstalaciones] = useState([])
	const [doctors, setDoctors] = useState([])

	useEffect(() => {
		fetch(`${API_URL}/instalacion_medica`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setInstalaciones(data))
			.catch((error) => console.log(error))
	}, [])

	const getMedicos = () => {
		fetch(`${API_URL}/get/medico/transferencia`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setDoctors(data))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getMedicos()
	}, [])

	const [selectedDoctor, setSelectedDoctor] = useState(null)
	const [doctorNameFilter, setDoctorNameFilter] = useState('')
	const [hospitalFilter, setHospitalFilter] = useState('')
	const [newHospital, setNewHospital] = useState('')

	const instalacionIdToName = (id) => {
		const instalacion = instalaciones.find(
			(instalacion) => instalacion[0] === id,
		)
		return instalacion ? instalacion[1] : ''
	}

	const handleDoctorNameFilterChange = (event) => {
		setDoctorNameFilter(event.target.value)
	}

	const handleHospitalFilterChange = (event) => {
		setHospitalFilter(event.target.value)
	}

	const handleNewHospitalChange = (event) => {
		setNewHospital(event.target.value)
	}

	const handleMoveButtonClick = (doctor) => {
		setSelectedDoctor(doctor)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		// Replace this with actual form submission logic
		console.log('Selected Doctor', selectedDoctor)
		console.log('NewHospital', newHospital)
		fetch(`${API_URL}/medico/transferir`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				admin_id: currentUser.id,
				medico_id: selectedDoctor[0],
				de: selectedDoctor[2],
				hacia: newHospital,
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

				setSelectedDoctor(null)
				getMedicos()
				// Clear the selected doctor after saving changes
				setSuccess('Doctor transferido exitosamente.')
			})
			.catch((error) => {
				console.log(error)
				// handle error
				alert('Ha ocurrido un error.')
			})
	}

	const handleCancelClick = () => {
		setSelectedDoctor(null)
	}

	return (
		<Container className="mt-5">
			<h1 className="page-title">Transferir médicos</h1>

			{success && (
				<Alert
					onClose={() => setSuccess(false)}
					dismissible
					variant="success"
				>
					{success}
				</Alert>
			)}
			<Row>
				<Col
					xs={12}
					md={6}
					className="glossy-card-dark"
					style={{ padding: '30px' }}
				>
					<h1
						className="card-title diminished more"
						style={{ color: '#383735' }}
					>
						Buscar médico
					</h1>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label="Nombre del medico"
							value={doctorNameFilter}
							onChange={handleDoctorNameFilterChange}
							fullWidth
							margin="normal"
						/>
						<FormControl fullWidth margin="normal">
							<InputLabel>Unidad Medica</InputLabel>
							<Select
								label="Unidad medica"
								id="hospital-filter-select"
								value={hospitalFilter}
								onChange={handleHospitalFilterChange}
								required
							>
								<MenuItem value="">All Hospitals</MenuItem>
								{instalaciones.map((instalacion) => (
									<MenuItem
										key={instalacion[0]}
										value={instalacion[0]}
									>
										{instalacion[1]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</form>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell>Unidad Medica</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{doctors
								.filter(
									(doctor) =>
										doctor[1]
											.toLowerCase()
											.includes(
												doctorNameFilter.toLowerCase(),
											) &&
										(hospitalFilter === '' ||
											doctor[2] === hospitalFilter),
								)
								.map((doctor) => (
									<TableRow key={doctor[0]}>
										<TableCell>{doctor[1]}</TableCell>
										<TableCell>
											{instalacionIdToName(doctor[2])}
										</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												onClick={() =>
													handleMoveButtonClick(
														doctor,
													)
												}
											>
												Transferir
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Col>
				<Col
					xs={12}
					md={5}
					className="glossy-card-dark"
					style={{ padding: '30px', marginLeft: '100px' }}
				>
					<h1
						className="card-title diminished more"
						style={{ color: '#383735' }}
					>
						Médico seleccionado
					</h1>
					{selectedDoctor ? (
						<form onSubmit={handleFormSubmit}>
							<TextField
								label="Nombre del medico"
								value={selectedDoctor[1]}
								fullWidth
								margin="normal"
								disabled
							/>
							<TextField
								label="Unidad medica actual"
								value={instalacionIdToName(selectedDoctor[2])}
								fullWidth
								margin="normal"
								disabled
							/>
							<FormControl fullWidth margin="normal">
								<InputLabel>Nuevo hospital</InputLabel>
								<Select
									label="New Hospital"
									id="new-hospital-select"
									value={newHospital}
									onChange={handleNewHospitalChange}
									required
								>
									{instalaciones
										.filter(
											(instalacion) =>
												instalacion[0] !==
												selectedDoctor[2],
										)
										.map((instalacion) => (
											<MenuItem
												key={instalacion[0]}
												value={instalacion[0]}
											>
												{instalacion[1]}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							<Button
								type="submit"
								variant="contained"
								className="me-1"
							>
								Guardar cambios
							</Button>
							<Button
								variant="outlined"
								onClick={handleCancelClick}
							>
								Cancelar
							</Button>
						</form>
					) : (
						<p>Selecciona un médico para ver los detalles</p>
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default Transferencia
