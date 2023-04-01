import { React, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function PatientForm() {
    const [validated, setValidated] = useState(false);
    const [patient, setPatient] = useState({
        email: "",
        name: "",
        surname: "",
        phone: "",
        address: "",
    });

    const handleSumbmit = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            console.log(patient);
        }

        setValidated(true);
    };
    return (
        <Form
            className="patient-container container mx-auto m-3"
            noValidate
            validated={validated}
            onSubmit={handleSumbmit}
        >
            <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="email"
                        value={patient.email}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                email: e.target.value,
                            })
                        }
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese un correo electrónico válido.
                    </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">example@gmail.com</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPatientName">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                    type="input"
                    placeholder=""
                    value={patient.name}
                    onChange={(e) =>
                        setPatient({ ...patient, name: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPatientSurname">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                    type="input"
                    placeholder=""
                    value={patient.surname}
                    onChange={(e) =>
                        setPatient({ ...patient, surname: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPatientPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="number"
                    value={patient.phone}
                    onChange={(e) =>
                        setPatient({ ...patient, phone: e.target.value })
                    }
                    required
                />

                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un número válido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPatientAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="input"
                    placeholder=""
                    value={patient.address}
                    onChange={(e) =>
                        setPatient({ ...patient, address: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group
                className="mb-3 d-flex justify-content-end"
                controlId="submit"
            >
                <Button variant="primary" type="submit">
                    Registrar Paciente
                </Button>
            </Form.Group>
        </Form>
    );
}
