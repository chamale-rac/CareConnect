import React from "react";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function ConsultationForm({
    patients,
    selectedPatient,
    handleSelect,
    setDate,
    session,
    patientsLoading,
}) {
    return (
        <>
            <h3 className="my-4">Nueva Consulta</h3>

            <Row>
                <Col className="">
                    <Typeahead
                        id="my-dropdown"
                        className="typehead"
                        options={patientsLoading ? [["Loading..."]] : patients}
                        placeholder="Paciente"
                        labelKey={
                            patientsLoading
                                ? [["Loading..."]]
                                : (patients) => `${patients.name} `
                        }
                        selected={selectedPatient ? [selectedPatient] : []}
                        onChange={handleSelect}
                    />
                </Col>
                <Col className="col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Fecha
                        </InputGroup.Text>
                        <FormControl
                            type="date"
                            aria-label="Default"
                            onChange={(e) => setDate(e.target.value)}
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Centro de Salud
                        </InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            disabled
                            placeholder={session.center}
                        />
                    </InputGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Médico Encargado
                        </InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            disabled
                            placeholder={session.doctor}
                        />
                    </InputGroup>
                </Col>
            </Row>
        </>
    );
}
