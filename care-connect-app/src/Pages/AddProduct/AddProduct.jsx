import React, { useState } from 'react'
import './AddProduct.css'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import { API_URL } from '/config.js'

export function AddProduct() {
	const [product, setProduct] = useState({
		name: '',
		description: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(product)

		fetch(`${API_URL}/registrar_producto`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombre: product.name,
				descripcion: product.description,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				alert('Producto agregado')
				return response.json()
			})
			.catch((error) => console.log(error))
	}

	return (
		<div>
			<Container className="glossy-card-dark p-4 mt-5">
				<h1 className="card-title diminished mb-3">Agregar Producto</h1>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Nombre</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								type="text"
								value={product.name}
								onChange={(e) =>
									setProduct({
										...product,
										name: e.target.value,
									})
								}
								required
							/>
							<Form.Control.Feedback type="invalid">
								.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>
							Descripción (<i>Opcional</i>)
						</Form.Label>
						<InputGroup>
							<Form.Control
								type="text"
								value={product.description}
								onChange={(e) =>
									setProduct({
										...product,
										description: e.target.value,
									})
								}
							/>
							<Form.Control.Feedback type="invalid">
								.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group
						className="mb-3 d-flex justify-content-end"
						controlId="submit"
					>
						<Button variant="primary" type="submit">
							Añadir Producto
						</Button>
					</Form.Group>
				</Form>
			</Container>
		</div>
	)
}
