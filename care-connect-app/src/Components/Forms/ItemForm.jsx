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
			<div className="d-flex my-1" key={index}>
				<li className="list-group-item  col ">{item.name}</li>
				{hasQuantity ? (
					<InputGroup style={{ width: '105px' }}>
						<FormControl
							type="number"
							placeholder="Cantidad"
							onChange={(e) => updateQuantity(index, e, item.max)}
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
				>
					❌
				</Button>
			</div>
		)
	})
	const [inputValue, setInputValue] = useState('')

	return (
		<>
			<h4 className="my-3">
				{icon} {title}
			</h4>

			<Row>
				<Col xs={10}>
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
						className="w-100"
					/>
				</Col>
				<Col>
					<Button
						variant="primary"
						type="button"
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
				</Col>
			</Row>
			<Row>
				<Col>
					<ul className="list-group mt-3">{setItemList}</ul>
				</Col>
			</Row>
		</>
	)
}
