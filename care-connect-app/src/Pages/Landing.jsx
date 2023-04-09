import React, { useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Landing = () => {
	const { currentUser, logout } = useContext(UserContext)
	return (
		<Container
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ height: '100vh' }}
		>
			<img
				width="150"
				height="150"
				src="https://lh3.googleusercontent.com/pw/AMWts8CFnYSqecCJJMYLZbPxhqd5NAMs0AeD9WHO2ysOhOl7SQjumseGYuEvOhyWICi-hY_4C2YsUej1bpMR9tKKu2krgHYmWG1q54CGtvEExLJ1AVDvlW0mY_aN-A9BYw9VxGll3Mc2ls7QfSEa-PLbtb-n=w500-h500-s-no?authuser=0"
				alt="Logo Image"
			/>
			<h1 className="mt-4">CareConnect</h1>
			<div className="mt-4">
				<Button variant="primary" className="me-3">
					<Link
						to="/login"
						style={{ color: 'white', textDecoration: 'none' }}
					>
						LogIn
					</Link>
				</Button>
				<Button variant="secondary">
					<Link
						to="/signin"
						style={{ color: 'white', textDecoration: 'none' }}
					>
						SignIn
					</Link>
				</Button>
			</div>
		</Container>
	)
}

export default Landing
