import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
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
				alert('Se ha transferido el médico exitosamente.')
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
		<Container>
			<Row>
				<Col xs={12} md={6}>
					<h1>Search Doctors</h1>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label="Doctor Name"
							value={doctorNameFilter}
							onChange={handleDoctorNameFilterChange}
							fullWidth
							margin="normal"
						/>
						<FormControl fullWidth margin="normal">
							<InputLabel>Hospital</InputLabel>
							<Select
								label="Hospital"
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
								<TableCell>Name</TableCell>
								<TableCell>Hospital</TableCell>
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
												Move
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Col>
				<Col xs={12} md={6}>
					<h1>Doctor Details</h1>
					{selectedDoctor ? (
						<form onSubmit={handleFormSubmit}>
							<TextField
								label="Doctor Name"
								value={selectedDoctor[1]}
								fullWidth
								margin="normal"
								disabled
							/>
							<TextField
								label="Current Hospital"
								value={instalacionIdToName(selectedDoctor[2])}
								fullWidth
								margin="normal"
								disabled
							/>
							<FormControl fullWidth margin="normal">
								<InputLabel>New Hospital</InputLabel>
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
							<Button type="submit" variant="contained">
								Save Changes
							</Button>
							<Button
								variant="outlined"
								onClick={handleCancelClick}
							>
								Cancel
							</Button>
						</form>
					) : (
						<p>Select a doctor to view details</p>
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default Transferencia
