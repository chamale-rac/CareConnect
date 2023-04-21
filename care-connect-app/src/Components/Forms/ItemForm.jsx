import { React, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone'
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone'
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function ItemForm({
	title,
	icon,
	items,
	itemOptions,
	setItemForm,
	handleSelect,
	selectedItem,
	hasQuantity,
}) {
	switch (icon) {
		case 'HealingTwoToneIcon':
			icon = <HealingTwoToneIcon />
			break
		case 'ScienceTwoToneIcon':
			icon = <ScienceTwoToneIcon />
			break
		default:
			icon = <VaccinesTwoToneIcon />
	}
	const itemsWithMax = items.map((item) => ({
		...item,
		max: item.quantity,
	}))

	const updateQuantity = (index, e, max) => {
		console.log(max)
		const inputValue = parseInt(e.target.value)

		if (inputValue > parseInt(max)) {
			e.target.value = parseInt(max)
		} else if (inputValue < 1) {
			e.target.value = 1
		}

		const currentItem = items[index]
		const updatedItem = { ...currentItem, quantity: e.target.value }
		const updatedItems = [...items]
		updatedItems[index] = updatedItem
		setItemForm(updatedItems)
	}

	const setItemList = items.map((item, index) => {
		return (
			<div
				className="d-flex my-1"
				style={{
					marginLeft: '10px',
				}}
				key={index}
			>
				<li className="list-group-item  col">{item.name}</li>
				{hasQuantity ? (
					<InputGroup style={{ width: '130px' }}>
						<FormControl
							type="number"
							placeholder="Cantidad"
							onChange={(e) => updateQuantity(index, e, item.max)}
							style={{
								marginLeft: '10px',
							}}
						/>
					</InputGroup>
				) : (
					<></>
				)}

				<Button
					variant="outline-danger"
					onClick={(e) => {
						setItemForm(items.filter((e) => e !== item))
					}}
					style={{
						marginLeft: '10px',
					}}
				>
					❌
				</Button>
			</div>
		)
	})
	const [inputValue, setInputValue] = useState('')

	return (
		<div className="mt-4">
			<h3 className="my-3 card-title diminished more">
				{icon} {title}
			</h3>

			<Row>
				<Col xs={11}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '90%',
						}}
					>
						<Typeahead
							id="basic-typeahead-multiple"
							options={itemOptions}
							placeholder="Buscar..."
							labelKey={
								hasQuantity
									? (itemOptions) =>
											`${itemOptions.nombre} (x${itemOptions.cantidad})`
									: (itemOptions) => `${itemOptions.nombre}`
							}
							onChange={handleSelect}
							style={{ flex: 4, marginLeft: '10px' }}
						/>
						<Button
							variant="primary"
							type="button"
							style={{ flex: 1, marginLeft: '10px' }}
							onClick={(e) => {
								if (selectedItem !== null) {
									setItemForm([
										...items,
										{
											id: selectedItem.id,
											name: selectedItem.nombre,
											quantity: selectedItem.cantidad,
											max: selectedItem.cantidad,
										},
									])
								}
							}}
						>
							Agregar
						</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<ul className="list-group mt-2">{setItemList}</ul>
				</Col>
			</Row>
		</div>
	)
}
