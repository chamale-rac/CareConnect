import React, { useState, useEffect } from 'react'

import { API_URL } from '../../config'

function SignIn() {
	const [correo, setCorreo] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [nombre, setNombre] = useState('')
	const [direccion, setDireccion] = useState('')
	const [numTelefono, setNumTelefono] = useState('')
	const [idEspecialidadMedica, setIdEspecialidadMedica] = useState('')
	const [idInstalacionMedica, setIdInstalacionMedica] = useState('')
	const [especialidades, setEspecialidades] = useState([])
	const [instalaciones, setInstalaciones] = useState([])
	const [error, setError] = useState('')

	// make a GET request to the API to get the list of especialidades when the component mounts
	useEffect(() => {
		fetch(`${API_URL}/especialidad_medica`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setEspecialidades(data))
			.catch((error) => console.log(error))
	}, [])

	// make a GET request to the API to get the list of instalaciones when the component mounts
	useEffect(() => {
		fetch(`${API_URL}/instalacion_medica`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => setInstalaciones(data))
			.catch((error) => console.log(error))
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Form submitted:', {
			correo,
			contraseña,
			nombre,
			direccion,
			numTelefono,
			idEspecialidadMedica,
			idInstalacionMedica,
		})

		fetch(`${API_URL}/registrar_medico`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				correo,
				contraseña,
				nombre,
				direccion,
				numTelefono,
				idEspecialidadMedica,
				idInstalacionMedica,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				return response.json()
			})
			.then((data) => {
				console.log(data)
				// handle successful response
			})
			.catch((error) => {
				console.log(error)
				// handle error
				const errorMessage = 'Hubo un error al registrar el médico.'
				setError(
					'Hubo un error al registrarte. Probablemente el correo ya está en uso.',
				)
			})
	}

	return (
		<div>
			<h1>Sign Up</h1>
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Correo:
					<input
						type="email"
						value={correo}
						onChange={(e) => setCorreo(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					Contraseña:
					<input
						type="password"
						value={contraseña}
						onChange={(e) => setContraseña(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					Nombre:
					<input
						type="text"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					Dirección:
					<input
						type="text"
						value={direccion}
						onChange={(e) => setDireccion(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					Número de teléfono:
					<input
						type="tel"
						value={numTelefono}
						onChange={(e) => setNumTelefono(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					ID de especialidad médica:
					<select
						value={idEspecialidadMedica}
						onChange={(e) =>
							setIdEspecialidadMedica(e.target.value)
						}
						required
					>
						<option value="">Seleccione una opción</option>
						{/* map over the especialidades array to create an option for each item */}
						{especialidades.map((especialidad) => (
							<option
								key={especialidad[0]}
								value={especialidad[0]}
							>
								{especialidad[1]}
							</option>
						))}
					</select>
				</label>
				<br />
				<label>
					ID de instalación médica:
					<select
						value={idInstalacionMedica}
						onChange={(e) => setIdInstalacionMedica(e.target.value)}
						required
					>
						<option value="">Seleccione una opción</option>
						{/* map over the instalaciones array to create an option for each item */}
						{instalaciones.map((instalacion) => (
							<option key={instalacion[0]} value={instalacion[0]}>
								{instalacion[1]}
							</option>
						))}
					</select>
				</label>
				<br />
				<button type="submit">Registrarse</button>
			</form>
		</div>
	)
}

export default SignIn
