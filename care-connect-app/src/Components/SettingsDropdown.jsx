import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import SettingsIcon from '@mui/icons-material/Settings'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const SettingsDropdown = () => {
	const navigate = useNavigate()
	const { logout } = useContext(UserContext)

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<Dropdown menuAlign="right">
			<Dropdown.Toggle
				className="btn special"
				id="dropdown-basic"
				style={{
					minHeight: '10px',
					minWidth: '10px',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<SettingsIcon style={{ marginRight: '5px' }} />{' '}
				{/* add some margin right to the icon */}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
				<Dropdown.Item href="https://github.com/chamale-rac/CareConnect">
					About the app
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default SettingsDropdown
