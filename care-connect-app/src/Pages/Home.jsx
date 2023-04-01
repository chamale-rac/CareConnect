import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, InputGroup, Stack, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomNavbar from "../Components/CustomNavbar.jsx";

import "../App.css";

function Home() {
    const consultations = [
        {
            fecha: "2021-09-01",
            unidad: "A",
            paciente: "Johan Liebert",
            prioridad: "Alta",
        },
        {
            fecha: "2021-09-02",
            unidad: "B",
            paciente: "Johnny Joestar",
            prioridad: "Baja",
        },
    ];

    return (
        <>
            <CustomNavbar />
            <Stack className="m-5" direction="horizontal" gap={3}>
                <div className="bg-light border p-2">Nombre: Michio Kaku</div>
                <div className="bg-light border p-2">Unidad: The Care</div>
                <div className="bg-light border p-2">Rol: Doctor</div>
                <div className="bg-light border p-2">
                    Especialidad: Cardiólogo
                </div>
            </Stack>
            <Stack
                className="m-5 d-flex justify-content-center"
                direction="horizontal"
                gap={3}
            >
                <Link className="btn btn-primary" to="new-patient">
                    Registrar Paciente
                </Link>
                <Link className="btn btn-primary" to="new-consultation">
                    Agregar Consulta
                </Link>
            </Stack>
            <InputGroup className="mb-3 w-50 mx-auto">
                <Form.Control
                    placeholder="Search consultations"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1">
                    <SearchIcon></SearchIcon>
                </InputGroup.Text>
            </InputGroup>
            <div className="mx-auto w-50">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Unidad</th>
                            <th>Paciente</th>
                            <th>Prioridad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultations.map((consultation) => (
                            <tr>
                                <td>{consultation.fecha}</td>
                                <td>{consultation.unidad}</td>
                                <td>{consultation.paciente}</td>
                                <td>{consultation.prioridad}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Home;
