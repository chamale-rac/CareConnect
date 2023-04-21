import React, { useState, useEffect } from 'react'
import './Statistics.css'
import { Container, Card, ListGroup, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '/config'

const Statistics = () => {
	const queries = [
		'El top 10 de las enfermedades más mortales',
		'Top 10 de los médicos que más pacientes han atendido',
		'El top 5 de los pacientes con más asistencias a alguna unidad de salud',
		'Reporte medicinas o suministros que están a punto de terminarse',
		'Reporte de las 3 unidades de salud que más pacientes atienden',
	]

	const [selectedQuery, setSelectedQuery] = useState(0)
	const [querySelected, setQuerySelected] = useState(false)

	const [rows, setRows] = useState([])
	const [columns, setColumns] = useState([])

	useEffect(() => {
		fetch(`${API_URL}/estadisticas/${selectedQuery}`, { mode: 'cors' })
			.then((response) => {
				if (response.status === 404) {
					// Handle resource not found error
					// For example, display error message or redirect to custom 404 page
					throw new Error('Resource not found')
				} else {
					// Handle successful response
					// For example, update component state with data from response
					return response.json()
				}
			})
			.then((data) => {
				setRows(data)
				setColumns(Object.keys(data[0]))
			})
			.catch((error) => {
				// Handle errors
				console.error(error)
			})
	}, [selectedQuery])

	return (
		<Container className="mt-5">
			<Card className="glossy-card">
				<Card.Header>
					<h1>Estadísticas</h1>
				</Card.Header>
				<ListGroup variant="flush">
					{queries.map((query, index) => {
						return (
							<ListGroup.Item
								className="d-flex align-items-center justify-content-between glossy-card-non-border"
								key={index}
							>
								<Button
									variant="success"
									active={selectedQuery === index}
									onClick={() => {
										setSelectedQuery(index)
										setQuerySelected(true)
									}}
								>
									{query}
								</Button>
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			</Card>
			<Container className="d-flex justify-content-center align-items-center my-5 flex-column ">
				{querySelected ? (
					<>
						<Table className=" w-75 ">
							<thead>
								<tr>
									{columns.map((column) => (
										<th key={column}>{column}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{rows.map((row, index) => {
									let tableRow = []
									for (const key in row) {
										tableRow.push(
											<td key={key}>{row[key]}</td>,
										)
									}
									return <tr key={index}>{tableRow}</tr>
								})}
							</tbody>
						</Table>
					</>
				) : (
					<h4>Choose a query to see the results</h4>
				)}
			</Container>
		</Container>
	)
}

export default Statistics
