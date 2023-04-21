import React, { useContext } from 'react'
import Transferencia from './Admin/Transferencia'

import {
	Form,
	InputGroup,
	Row,
	Stack,
	Table,
	Card,
	Container,
} from 'react-bootstrap'

import { UserContext } from '../context/UserContext.jsx'

import { Link } from 'react-router-dom'

export const AdminHome = () => {
	const { currentUser } = useContext(UserContext)

	return (
		<Container>
			<Card className="mt-5 glossy-card">
				<Card.Header>
					<h1 className="mt-3 card-title diminished more">
						Tu información
					</h1>
				</Card.Header>
				<Card.Body>
					<Stack direction="horizontal" gap={3}>
						<div className=" p-2">
							<b>Correo: {currentUser.correo}</b>
						</div>
						<div className=" p-2">
							<b>
								Unidad Médica: {currentUser.nombre_instalacion}
							</b>
						</div>
						<div className=" p-2">
							<b>
								Permisos:{' '}
								{currentUser.role == 'admin'
									? 'Administrador'
									: ''}
							</b>
						</div>
					</Stack>
				</Card.Body>
			</Card>

			<Card className="mt-5 glossy-card">
				<Card.Header>
					<h1 className="mt-3 card-title diminished more">
						Acciones rápidas
					</h1>
				</Card.Header>
				<Card.Body className="">
					<Stack direction="horizontal" gap={3}>
						<Link
							style={{ fontSize: '1rem' }}
							className="btn btn-primary"
							to="add-product"
						>
							Añadir tipo de producto
						</Link>
						<Link
							style={{ fontSize: '1rem' }}
							className="btn btn-primary"
							to="add-stock"
						>
							Añadir producto al inventario
						</Link>
						<Link
							style={{ fontSize: '1rem' }}
							className="btn btn-primary"
							to="manage-stock"
						>
							Gestionar Inventario
						</Link>
					</Stack>
				</Card.Body>
			</Card>
			<Transferencia />
			<br />
		</Container>
	)
}
