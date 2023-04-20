import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { Container, Card, ListGroup, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "/config";

const Statistics = () => {
    const queries = [
        "El top 10 de las enfermedades más mortales",
        "Top 10 de los médicos que más pacientes han atendido",
        "El top 5 de los pacientes con más asistencias a alguna unidad de salud",
        "Reporte medicinas o suministros que están a punto de terminarse para una unidad de salud dada",
        "Reporte de las 3 unidades de salud (hospitales, centros de salud y clínicas) que más pacientes atienden",
    ];

    const [selectedQuery, setSelectedQuery] = useState(0);
    const [querySelected, setQuerySelected] = useState(false);

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        console.log("e");
        fetch(`${API_URL}/estadisticas/${selectedQuery}`, { mode: "cors" })
            .then((response) => response.json())
            .then((data) => {
                setRows(data);
                setColumns(Object.keys(data[0]));
            })
            .catch((error) => console.log(error));
    }, [selectedQuery]);

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h1>Estadísticas</h1>
                </Card.Header>
                <ListGroup variant="flush">
                    {queries.map((query, index) => {
                        return (
                            <ListGroup.Item className="d-flex align-items-center justify-content-between">
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        setSelectedQuery(index);
                                        setQuerySelected(true);
                                    }}
                                >
                                    {query}
                                </Button>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card>
            <Container className="d-flex justify-content-center align-items-center my-5 flex-column ">
                {querySelected ? (
                    <>
                        <h3>{selectedQuery}</h3>
                        <Table className=" w-75 ">
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th>{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => {
                                    let tableRow = [];
                                    for (const key in row) {
                                        tableRow.push(
                                            <td key={key}>{row[key]}</td>
                                        );
                                    }
                                    return <tr key={index}>{tableRow}</tr>;
                                })}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <h4>Choose a query to see the results</h4>
                )}
            </Container>
        </Container>
    );
};

export default Statistics;
