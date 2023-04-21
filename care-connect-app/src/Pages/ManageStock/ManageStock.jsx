import React, { useState, useEffect } from 'react'
import './ManageStock.css'
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import { API_URL } from '/config.js'

export function ManageStock() {
	const [isLoading, setIsLoading] = useState(true)
	const [productsLoading, setProductsLoading] = useState(true)
	/* HOSPITALS */
	const [selectedHospital, setSelectedHospital] = useState(null)
	const [hospitals, setHospitals] = useState()
	useEffect(() => {
		fetch(`${API_URL}/instalacion_medica`)
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((hospital) => ({
					id: hospital[0],
					name: hospital[1],
				}))
				setHospitals(formattedData)
				setIsLoading(false)
			})
			.catch((error) => console.error(error))
	}, [])

	const handleHospitaSelect = (selected) => {
		setSelectedHospital(selected[0])
	}

	/* PRODUCTS */
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [products, setProducts] = useState()
	useEffect(() => {
		fetch(`${API_URL}/productos`)
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((product) => ({
					id: product[0],
					name: product[1],
				}))
				setProducts(formattedData)
				setProductsLoading(false)
			})
			.catch((error) => console.error(error))
	}, [])

	const handleProductSelect = (selected) => {
		setSelectedProduct(selected[0])
	}

	const [date, setDate] = useState('')
	const [quantity, setQuantity] = useState(0)

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(selectedHospital)
		console.log(selectedProduct)
		console.log(date)
		console.log(quantity)

		fetch(`${API_URL}/agregar_inventario`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id_producto: selectedProduct.id,
				id_instalacion: selectedHospital.id,
				cantidad: quantity,
				fecha: date,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				alert('Producto agregado a inventario')
				setSelectedHospital(null)
				setSelectedProduct(null)
				setQuantity(0)
				setDate('')
				return response.json()
			})
			.catch((error) => {
				alert('No se pudo agregar el producto al inventario')
				console.log(error)
			})
	}
	return (
		<div className="">
			<Container className="glossy-card mt-5 p-4">
				<h3>Añadir a Inventario</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Typeahead
							id="my-dropdown"
							className="typehead"
							options={isLoading ? [['Loading...']] : hospitals}
							placeholder="Unidad Médica"
							labelKey={
								isLoading
									? [['Loading...']]
									: (hospitals) => `${hospitals.name}`
							}
							selected={
								selectedHospital ? [selectedHospital] : []
							}
							onChange={handleHospitaSelect}
						/>
					</Form.Group>
					<Row>
						<Col className="">
							<Typeahead
								id="my-dropdown"
								className="typehead"
								options={
									productsLoading
										? [['Loading...']]
										: products
								}
								placeholder="Nombre del producto"
								labelKey={
									productsLoading
										? [['Loading...']]
										: (products) => `${products.name}`
								}
								selected={
									selectedProduct ? [selectedProduct] : []
								}
								onChange={handleProductSelect}
							/>
						</Col>
						<Col className="col-5">
							<InputGroup className="mb-3">
								<InputGroup.Text id="inputGroup-sizing-default">
									Fecha de Exp.
								</InputGroup.Text>
								<Form.Control
									value={date}
									type="date"
									aria-label="Default"
									onChange={(e) => setDate(e.target.value)}
									aria-describedby="inputGroup-sizing-default"
								/>
							</InputGroup>
						</Col>
					</Row>
					<Form.Group className="mb-3">
						<InputGroup>
							<Form.Control
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								placeholder="Cantidad"
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
							Añadir
						</Button>
					</Form.Group>
				</Form>
			</Container>
		</div>
	)
}
