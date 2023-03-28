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
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputLabel,
	MenuItem,
	Select,
	Button,
	Box,
} from "@mui/material";

function Stock() {
	const [stockFilter, setStockFilter] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleStockFilterChange = (event) => {
		setStockFilter(event.target.value);
	};

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};

	const handleClearFilters = () => {
		setStockFilter("");
		setStartDate("");
		setEndDate("");
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1>Consultas Stock</h1>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6}>
					<TextField
						label="Search"
						variant="outlined"
						size="small"
						fullWidth
						InputProps={{ startAdornment: <Search /> }}
					/>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={4}>
					<FormControl
						fullWidth
						variant="outlined"
						size="small"
						sx={{ mt: 1 }}
					>
						<InputLabel>Stock</InputLabel>
						<Select
							value={stockFilter}
							onChange={handleStockFilterChange}
							label="Stock"
						>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="almostOver">Almost over</MenuItem>
							<MenuItem value="normal">Normal</MenuItem>
							<MenuItem value="excedent">Excedent</MenuItem>
						</Select>
					</FormControl>
				</Col>
				<Col xs={12} md={4}>
					<TextField
						type="date"
						label="Expiration Date From"
						variant="outlined"
						size="small"
						fullWidth
						value={startDate}
						onChange={handleStartDateChange}
						InputLabelProps={{ shrink: true }}
						sx={{ mt: 1, ml: 1 }}
					></TextField>
				</Col>
				<Col xs={12} md={4}>
					<TextField
						type="date"
						label="Expiration Date To"
						variant="outlined"
						size="small"
						fullWidth
						value={endDate}
						onChange={handleEndDateChange}
						InputLabelProps={{ shrink: true }}
						sx={{ mt: 1, ml: 1 }}
					></TextField>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Actual Stock</TableCell>
								<TableCell>Expiration Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* data de a mentis*/}
							<TableRow>
								<TableCell>Product 1</TableCell>
								<TableCell>10</TableCell>
								<TableCell>5</TableCell>
								<TableCell>2023-05-01</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Product 2</TableCell>
								<TableCell>5</TableCell>
								<TableCell>2</TableCell>
								<TableCell>2023-06-01</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col>
					<Box sx={{ mt: 2 }}>
						<Button variant="outlined" onClick={handleClearFilters}>
							Clear Filters
						</Button>
					</Box>
				</Col>
			</Row>
		</Container>
	);
}

export default Stock;
