import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotesTwoToneIcon from "@mui/icons-material/NotesTwoTone";
import { useState } from "react";
import { Button, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../Components/CustomNavbar";
import ConsultationForm from "../../Components/Forms/ConsultationForm";
import "./NewConsultation.css";
import ItemForm from "/src/Components/Forms/ItemForm.jsx";

export function NewConsultation() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/");
    };

    const [testsItemForm, setTestsItemForm] = useState([]);
    const [medicineItemForm, setMedicineItemForm] = useState([]);
    const [procedureItemForm, setProcedureItemForm] = useState([]);
    const [treatmentEfficacy, setTreatmentEfficacy] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [date, setDate] = useState();

    const [currentSession, setCurrentSession] = useState({
        doctor: "Michio Kaku",
        center: "The Care",
    });

    const patients = [
        { name: "Johan Liebert", id: 1 },
        { name: "Johnny Joestar", id: 2 },
    ];

    const treatmentEfficacyOptions = [
        "No Aplica",
        "Mejoría",
        "Estable",
        "Empeoramiento",
        "Paciente difunto",
    ];

    const handleSelect = (selected) => {
        setSelectedPatient(selected[0]);
    };

    return (
        <>
            <CustomNavbar />
            <div className="consultation-bg">
                <Container className="new-consultation patient-container ">
                    <Form>
                        <Button
                            variant="secondary "
                            className="mt-3"
                            onClick={handleBackClick}
                        >
                            <ArrowBackIcon />
                        </Button>

                        <ConsultationForm
                            patients={patients}
                            selectedPatient={selectedPatient}
                            handleSelect={handleSelect}
                            setDate={setDate}
                            session={currentSession}
                        />
                        <section>
                            <h3 className="my-4">
                                <NotesTwoToneIcon /> Bitácora de Consulta
                            </h3>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            ID del Paciente
                                        </InputGroup.Text>
                                        <FormControl
                                            aria-label="Default"
                                            disabled
                                            placeholder={selectedPatient?.id}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col className="col-8">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            Nombre del Paciente
                                        </InputGroup.Text>
                                        <FormControl
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            disabled
                                            placeholder={selectedPatient?.name}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <InputGroup className="mb-1">
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                Presión Arterial
                                            </InputGroup.Text>
                                            <FormControl
                                                placeholder="ej. '80/120'"
                                                aria-label="Default"
                                                type="text"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col className="col">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            Peso (kg)
                                        </InputGroup.Text>
                                        <FormControl
                                            aria-label="Default"
                                            type="number"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            Expediente
                                        </InputGroup.Text>
                                        <FormControl
                                            as="textarea"
                                            aria-label="Default"
                                            type="text"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            Diagnóstico Preliminar
                                        </InputGroup.Text>
                                        <FormControl
                                            as="textarea"
                                            aria-label="Default"
                                            type="text"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </section>

                        {/* Additional Forms */}
                        <div className="border p-2">
                            <h3>Tratamiento</h3>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Descripción general
                                </InputGroup.Text>
                                <FormControl
                                    as="textarea"
                                    aria-label="Default"
                                    type="text"
                                />
                            </InputGroup>
                            <ItemForm
                                title="Pruebas Diagnósticas"
                                icon="ScienceTwoToneIcon"
                                items={testsItemForm}
                                setItemForm={setTestsItemForm}
                            />

                            <ItemForm
                                title="Medicamentos"
                                icon="HealingTwoToneIcon"
                                items={medicineItemForm}
                                setItemForm={setMedicineItemForm}
                            />

                            <ItemForm
                                title="Procedimientos"
                                icon="VaccinesTwoToneIcon"
                                items={procedureItemForm}
                                setItemForm={setProcedureItemForm}
                            />
                            <div className="d-flex justify-content-center">
                                <DropdownButton
                                    id="dropdown-item-button"
                                    title={
                                        treatmentEfficacy === ""
                                            ? "Eficacia del tratamiento anterior"
                                            : treatmentEfficacy
                                    }
                                    className="effective-dropdown"
                                >
                                    {treatmentEfficacyOptions.map((item) => (
                                        <Dropdown.Item
                                            key={item}
                                            onClick={() =>
                                                setTreatmentEfficacy(item)
                                            }
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                        </div>

                        <FormGroup
                            className="mt-3 pb-3 d-flex justify-content-end"
                            controlId="submit"
                        >
                            <Button variant="primary" type="submit">
                                Añadir consulta
                            </Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        </>
    );
}
