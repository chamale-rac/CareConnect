import { React, useState } from "react";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import "/src/App.css";
import "/src/Components/PatientsTable.css";

export function PatientsTable({ patients, setSelectedPatient }) {
    const [activeRow, setActiveRow] = useState(null);

    const handleRowClick = (patient) => {
        setActiveRow(patient);
        setSelectedPatient(patient);
    };

    return (
        <Table bordered className="patients-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient) => (
                    <tr
                        key={patient.id}
                        onClick={() => handleRowClick(patient)}
                        className={
                            activeRow && activeRow.id === patient.id
                                ? "selected"
                                : ""
                        }
                    >
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.phone}</td>
                        <td>{patient.address}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
