import React from "react";

import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const NotificationBadge = () => {
	return (
		<Dropdown className="me-2" as={ButtonGroup}>
			<Button variant="secondary">
				<Badge color="primary" badgeContent={100}>
					<MailIcon />
				</Badge>
			</Button>

			<Dropdown.Toggle
				split
				variant="secondary"
				id="dropdown-split-basic"
			/>

			<Dropdown.Menu>
				<Dropdown.Item href="#/action-1">Notificacion 1</Dropdown.Item>
				<Dropdown.Item href="#/action-2">Notificacion 2</Dropdown.Item>
				<Dropdown.Item href="#/action-3">Notificacion 3</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default NotificationBadge;
