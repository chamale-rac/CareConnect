import React, { useContext, useState, useEffect } from 'react'

import { Container, Nav, Navbar } from 'react-bootstrap'
import '../App.css'

import { Link, Route, Routes } from 'react-router-dom'
import NotificationBadge from './NotificationBadge'
import SettingsDropdown from './SettingsDropdown'

import { UserContext } from '../context/UserContext'

import { API_URL } from '/config'

import { Badge } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'

export default function CustomNavbar() {
	const { currentUser } = useContext(UserContext)
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const interval = setInterval(() => {
			fetch(
				`${API_URL}/notificaciones/${currentUser.id_instalacion_medica}`,
				{ mode: 'cors' },
			)
				.then((response) => response.json())
				.then((data) => setNotifications(data))
				.catch((error) => console.error(error))
		}, 60000) // 60000 milisegundos = 1 minuto

		return () => clearInterval(interval)
	}, [])

	return (
		<Navbar expand="lg" className="my-nav" sticky="top">
			<Container>
				<Navbar.Brand
					style={{ display: 'flex', alignItems: 'center' }}
					as={Link}
					to="/"
				>
					<img
						width="60"
						height="60"
						src="https://drive.google.com/uc?id=1mtSbUTd67zUg50RHUpSuWR9UNS9C8F34"
						alt="Logo Image"
					/>
					<p
						class="card-title"
						style={{
							fontSize: '28px',
							color: 'whitesmoke',
							fontWeight: 'normal',
							marginLeft: '10px',
							marginTop: '5px',
						}}
					>
						CareConnect
					</p>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-end"
				>
					<Nav style={{ marginRight: '10px' }}>
						<Nav.Link
							as={Link}
							to="/"
							style={{ color: 'whitesmoke' }}
						>
							Home
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/estadisticas"
							style={{ color: 'whitesmoke' }}
						>
							Estadisticas
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/notifications"
							style={{ color: 'whitesmoke' }}
						>
							<Badge
								color="primary"
								badgeContent={notifications?.length}
							>
								<MailIcon />
							</Badge>
						</Nav.Link>
					</Nav>
					<SettingsDropdown />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
