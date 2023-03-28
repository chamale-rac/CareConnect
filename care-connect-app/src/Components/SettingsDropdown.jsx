import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsDropdown = () => {
	return (
		<Dropdown>
			<Dropdown.Toggle variant="secondary" id="dropdown-basic">
				<SettingsIcon />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item href="#/action-1">Sign Out</Dropdown.Item>
				<Dropdown.Item href="#/action-2">About the app</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default SettingsDropdown;
