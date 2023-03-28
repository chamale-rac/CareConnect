import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Notifications } from "@mui/icons-material";
import { List, ListItem, ListItemText, Box, Button } from "@mui/material";

function NotificationsPage() {
	// Replace this with actual data
	const notifications = [
		{
			id: 1,
			title: "New message from John",
			content: "Hi, how are you doing?",
		},
		{
			id: 2,
			title: "New order received",
			content:
				"Order #123456 has been received and is ready to be processed.",
		},
		{
			id: 3,
			title: "Inventory update",
			content: "The stock of Product X has been updated to 50 units.",
		},
	];

	return (
		<Container>
			<Row>
				<Col>
					<h1>Notifications</h1>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6}>
					<h2>Recent Notifications</h2>
					<List>
						{notifications.map((notification) => (
							<ListItem key={notification.id}>
								<ListItemText
									primary={notification.title}
									secondary={notification.content}
								/>
							</ListItem>
						))}
					</List>
				</Col>
			</Row>
			<Row>
				<Col>
					<Box sx={{ mt: 2 }}>
						<Button variant="outlined">
							View all notifications
						</Button>
					</Box>
				</Col>
			</Row>
		</Container>
	);
}

export default NotificationsPage;
