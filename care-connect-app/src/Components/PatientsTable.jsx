import { React, useState } from 'react'
import { Row, Col, Container, Button, Table } from 'react-bootstrap'
import '/src/App.css'
import '/src/Components/PatientsTable.css'

export function PatientsTable({ patients, setSelectedPatient }) {
	const [activeRow, setActiveRow] = useState(null)

	const handleRowClick = (patient) => {
		setActiveRow(patient)
		setSelectedPatient(patient)
	}

	return (
		<Table
			bordered
			className="patients-table"
			style={{
				color: 'whitesmoke',
				maxHeight: '310px',
				overflowY: 'auto',
				display: 'block',
			}}
		>
			<thead>
				<tr className="MuiTableRow-root MuiTableRow-hover">
					<th>Nombres</th>
					<th>Apellidos</th>
					<th>Correo</th>
					<th>Teléfono</th>
					<th>Dirección</th>
				</tr>
			</thead>
			<tbody>
				{patients.map((patient) => (
					<tr
						key={patient[0]}
						onClick={() => handleRowClick(patient)}
						className={
							activeRow && activeRow.id === patient.id
								? 'MuiTableRow-selected custom-hover'
								: 'custom-hover'
						}
					>
						<td>{patient[1]}</td>
						<td>{patient[2]}</td>
						<td>{patient[3]}</td>
						<td>{patient[4]}</td>
						<td>{patient[5]}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}
