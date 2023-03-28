import { React } from "react";
import { Form, Button } from "react-bootstrap";

import CustomNavbar from "../Components/CustomNavbar.jsx";
export function NewPatient(props) {
    return (
        <>
            <CustomNavbar />
            <Form className="w-50 mx-auto mt-5">
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Patient Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="input" placeholder="Patient Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPatientPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="input" placeholder="1234-5678" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientName">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="input" placeholder="Address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
