import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import { PatientsTable } from "../../Components/PatientsTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API_URL } from '/config'
import "./ManagePatient.css";

export function ManagePatient() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/home");
    };
    
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [infoSelected, setInfoSelected] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }
    
    const handleSearchClick = () => {
        fetch(`${API_URL}/buscar_paciente?search=${searchTerm}`)
            .then(response => response.json())
            .then(pacientes => {
                setInfoSelected(null);
                setSelectedPatient(null);
                setSearchResults(pacientes);
            });
    };

    const handleRowClick = (patient) => {
        setSelectedPatient(patient);
        setInfoSelected(null);
    };

    console.log(selectedPatient);

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
                        <div>
                            <input type="text" value={searchTerm} onChange={handleInputChange} />
                            <button onClick={handleSearchClick}>Search</button>
                        </div>
                        <div className="d-flex gap-3 my-3">
                            <Button>Ver bitácoras</Button>
                            <Button>Ver exámenes</Button>
                            <Button>Ver medicamentos</Button>
                        </div>
                        <PatientsTable
                            patients={searchResults}
                            setSelectedPatient={setSelectedPatient}
                            handleRowClick={handleRowClick}
                        />
                    </Col>
                    <Col>
                        <h2>Información</h2>
                        {selectedPatient && (
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Nombre:</td>
                                        <td>{selectedPatient[1]}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellido:</td>
                                        <td>{selectedPatient[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{selectedPatient[3]}</td>
                                    </tr>
                                    <tr>
                                        <td>Teléfono:</td>
                                        <td>{selectedPatient[4]}</td>
                                    </tr>
                                    <tr>
                                        <td>Dirección:</td>
                                        <td>{selectedPatient[5]}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                            <div className="d-flex justify-content-between">
                                <Button variant="primary" onClick={() => navigate(`/stock`)}>Perfil completo</Button>
                                <Button variant="secondary" onClick={() => navigate(`/stock`)}>General consulta</Button>
                            </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
