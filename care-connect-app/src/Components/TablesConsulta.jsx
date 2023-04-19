import React from 'react'
import { Card, Col, Table } from 'react-bootstrap'

const TablesConsulta = ({ data, hasQuantity, header }) => {
	return hasQuantity ? (
		<Col className="mb-1">
			<Card>
				<Card.Header>{header}</Card.Header>
				<Card.Body
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Table
						striped
						bordered
						hover
						style={{
							width: 'fit-content',
							maxHeight: '150px',
							overflowY: 'auto',
							display: 'block',
						}}
					>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id}>
									<td>{item.nombre}</td>
									<td>{item.cantidad}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</Col>
	) : (
		<Col className="mb-1">
			<Card>
				<Card.Header>{header}</Card.Header>
				<Card.Body
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Table
						striped
						bordered
						hover
						style={{
							width: 'fit-content',
							maxHeight: '150px',
							overflowY: 'auto',
							display: 'block',
						}}
					>
						<thead>
							<tr>
								<th>Nombre</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id}>
									<td>{item.nombre}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default TablesConsulta
