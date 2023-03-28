import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Search } from "@mui/icons-material";
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
} from "@mui/material";

function DoctorsPage() {
	// Replace this with actual data
	const doctors = [
		{
			id: 1,
			name: "John Smith",
			hospital: "St. Mary's Hospital",
		},
		{
			id: 2,
			name: "Emily Johnson",
			hospital: "City Hospital",
		},
		{
			id: 3,
			name: "Michael Lee",
			hospital: "General Hospital",
		},
	];

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [doctorNameFilter, setDoctorNameFilter] = useState("");
	const [hospitalFilter, setHospitalFilter] = useState("");
	const [newHospital, setNewHospital] = useState("");

	const handleDoctorNameFilterChange = (event) => {
		setDoctorNameFilter(event.target.value);
	};

	const handleHospitalFilterChange = (event) => {
		setHospitalFilter(event.target.value);
	};

	const handleMoveButtonClick = (doctor) => {
		setSelectedDoctor(doctor);
		setNewHospital(doctor.hospital); // Set the default value of the new hospital input to the current hospital of the selected doctor
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		// Replace this with actual form submission logic
		console.log(selectedDoctor, newHospital);
		setSelectedDoctor(null); // Clear the selected doctor after saving changes
	};

	const handleCancelClick = () => {
		setSelectedDoctor(null);
	};

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
							>
								<MenuItem value="">All Hospitals</MenuItem>
								<MenuItem value="St. Mary's Hospital">
									St. Mary's Hospital
								</MenuItem>
								<MenuItem value="City Hospital">
									City Hospital
								</MenuItem>
								<MenuItem value="General Hospital">
									General Hospital
								</MenuItem>
							</Select>
						</FormControl>
						<Button type="submit" variant="contained">
							Search
						</Button>
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
										doctor.name
											.toLowerCase()
											.includes(
												doctorNameFilter.toLowerCase()
											) &&
										(hospitalFilter === "" ||
											doctor.hospital === hospitalFilter)
								)
								.map((doctor) => (
									<TableRow key={doctor.id}>
										<TableCell>{doctor.name}</TableCell>
										<TableCell>{doctor.hospital}</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												onClick={() =>
													handleMoveButtonClick(
														doctor
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
								value={selectedDoctor.name}
								fullWidth
								margin="normal"
								disabled
							/>
							<TextField
								label="Current Hospital"
								value={selectedDoctor.hospital}
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
									onChange={(event) =>
										setNewHospital(event.target.value)
									}
								>
									<MenuItem value="St. Mary's Hospital">
										St. Mary's Hospital
									</MenuItem>
									<MenuItem value="City Hospital">
										City Hospital
									</MenuItem>
									<MenuItem value="General Hospital">
										General Hospital
									</MenuItem>
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
	);
}

export default DoctorsPage;
