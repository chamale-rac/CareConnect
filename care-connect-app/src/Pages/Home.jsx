import { useState } from "react";
import { Container, Nav, Navbar, Table, Stack, Button } from "react-bootstrap";
import CustomNavbar from "../Components/CustomNavbar.jsx";
import { Link, Route, Routes } from "react-router-dom";
import "../App.css";

function Home() {
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
                <Link className="btn btn-primary" to="new-patient">
                    Registrar Paciente
                </Link>
                <Link className="btn btn-primary" to="new-consultation">
                    Agregar Consulta
                </Link>
            </Stack>
            <div className="mx-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Medico</th>
                            <th>Unidad</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>Mr Bombastic</td>
                            <td>Critico</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>Mr Fantastic</td>
                            <td>Normal</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Home;
