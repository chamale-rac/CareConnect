import { Container, Nav, Navbar } from "react-bootstrap";
import "../App.css";

import { Link, Route, Routes } from "react-router-dom";
import NotificationBadge from "./NotificationBadge";
import SettingsDropdown from "./SettingsDropdown";

export default function CustomNavbar() {
    return (
        <Navbar bg="dark" className="navbar-dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    CareConnect
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/stock">
                            Stock
                        </Nav.Link>
                        <Nav.Link as={Link} to="/notifications">
                            Notificaciones
                        </Nav.Link>
                        <Nav.Link as={Link} to="/estadisticas">
                            Estadisticas
                        </Nav.Link>
                    </Nav>

                    {/*Creo que esto debería ir en el nav estático, lo dejé acá para mientras ↓ */}
                    <NotificationBadge />
                    <SettingsDropdown />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
