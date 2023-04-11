import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import { PatientsTable } from "../../Components/PatientsTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "/src/App.css";
import "./ManagePatient.css";

export default function ManagePatient() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/home");
    };

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [infoSelected, setInfoSelected] = useState();

    console.log(selectedPatient);

    const patients = [
        {
            id: 1,
            name: "Johan Liebert",
            age: 20,
            phone: 123456789,
            address: "Ruhenheim",
        },
        {
            id: 2,
            name: "Johnny Joestar",
            age: 20,
            phone: 123456710,
            address: "Tokio",
        },
    ];

    return (
        <>
            <Container className="mt-4">
                <Button variant="secondary " onClick={handleBackClick}>
                    <ArrowBackIcon />
                </Button>
                <h1 className="border-bottom">Gestionar Pacientes</h1>
                <Row>
                    <Col>
                        <h2>Pacientes</h2>
                        <div className="d-flex gap-3 my-3">
                            <Button>Ver bitácoras</Button>
                            <Button>Ver exámenes</Button>
                            <Button>Ver medicamentos</Button>
                        </div>
                        <PatientsTable
                            patients={patients}
                            setSelectedPatient={setSelectedPatient}
                        />
                    </Col>
                    <Col>
                        <h2>Información</h2>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
