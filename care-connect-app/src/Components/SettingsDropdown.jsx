import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import SettingsIcon from '@mui/icons-material/Settings'
import { UserContext } from '../context/UserContext'
const SettingsDropdown = () => {
	const { logout } = useContext(UserContext)
	return (
		<Dropdown>
			<Dropdown.Toggle variant="secondary" id="dropdown-basic">
				<SettingsIcon />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
				<Dropdown.Item href="https://github.com/chamale-rac/CareConnect">
					About the app
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default SettingsDropdown
