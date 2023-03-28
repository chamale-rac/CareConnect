import { Container, Nav, Navbar } from "react-bootstrap";
import "../App.css";

import NotificationBadge from "./NotificationBadge";
import SettingsDropdown from "./SettingsDropdown";

export default function CustomNavbar() {
	return (
		<Navbar bg="dark" className="navbar-dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">CareConnect</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-end"
				>
					<Nav>
						<Nav.Link href="#features">Profile</Nav.Link>
						<Nav.Link href="#features">Services</Nav.Link>
						<Nav.Link href="#features">Queries</Nav.Link>
					</Nav>

					{/*Creo que esto debería ir en el nav estático, lo dejé acá para mientras ↓ */}
					<NotificationBadge />
					<SettingsDropdown />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
