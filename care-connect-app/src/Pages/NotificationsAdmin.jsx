import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { Notifications } from '@mui/icons-material'
import { List, ListItem, ListItemText, Box } from '@mui/material'
import { UserContext } from '../context/UserContext'

import { API_URL } from '/config'

function NotificationsPage() {
	const { currentUser } = useContext(UserContext)

	const [selectedNotification, setSelectedNotification] = useState(null)
	const [showDetailsModal, setShowDetailsModal] = useState(false)

	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		fetch(`${API_URL}/notificaciones/all`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setNotifications(data))
			.catch((error) => console.error(error))
	}, [])

	const handleNotificationClick = (notification) => {
		setSelectedNotification(notification)
		setShowDetailsModal(true)
	}

	const tipoNotificacion = (tipo) => {
		switch (tipo) {
			case 'quantity_and_expiration':
				return 'Stock bajo y producto a punto de expirar'
			case 'quantity':
				return 'Stock bajo'
			case 'expiration':
				return 'Producto a punto de expirar'
		}
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<h1 className="page-title">Notificaciones</h1>
					<p>
						*Estas notificaciones pertenecen a todas las unidades
						medicas.
					</p>
				</Col>
			</Row>
			<Row>
				{notifications && notifications.length > 0 ? (
					notifications.map((notification, index) => (
						<Col key={index} xs={12} md={6}>
							<Card
								className="mb-3 glossy-card"
								style={{ cursor: 'pointer' }}
							>
								<Card.Body
									onClick={() =>
										handleNotificationClick(notification)
									}
								>
									<Card.Title
										style={{ textTransform: 'uppercase' }}
									>
										<h1 className="card-title diminished more">
											{notification.nombre_producto}
										</h1>
									</Card.Title>
									<Card.Subtitle className="mb-2">
										Tipo:{' '}
										{tipoNotificacion(
											notification.tipo_notificacion,
										)}
										<br />
										Unidad médica:{' '}
										{notification.instalacion_medica}
									</Card.Subtitle>
									<Card.Text>
										Días para expirar:{' '}
										{notification.dias_para_expirar} |
										Stock: %{notification.porcentaje}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))
				) : (
					<p>Aún no hay notificaciones...</p>
				)}
			</Row>
			<Modal
				className="glossy-card"
				show={showDetailsModal}
				onHide={() => setShowDetailsModal(false)}
			>
				<Modal.Header closeButton className="glossy-card-non-border">
					<Modal.Title style={{ textTransform: 'uppercase' }}>
						{selectedNotification
							? selectedNotification.nombre_producto
							: ''}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="glossy-card-non-border">
					{selectedNotification && (
						<>
							<p>
								Stock actual:{' '}
								{selectedNotification.cantidad_actual}
							</p>
							<p>
								Stock inicial:{' '}
								{selectedNotification.cantidad_inicial}
							</p>
							<p>
								Fecha de expiración:{' '}
								{new Date(
									selectedNotification.fecha_expiracion,
								).toDateString()}
							</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer className="glossy-card-non-border">
					<Button
						variant="secondary"
						onClick={() => setShowDetailsModal(false)}
					>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default NotificationsPage
