import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotesTwoToneIcon from "@mui/icons-material/NotesTwoTone";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import {
    Button,
    FormControl,
    FormGroup,
    InputGroup,
    Alert,
} from "react-bootstrap";
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
import { API_URL } from "/config.js";
import { ListItemSecondaryAction } from "@mui/material";

import { useParams } from "react-router-dom";

export function NewConsultation() {
    let { patientId } = useParams();

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/");
    };

    const { userDetails, currentUser } = useContext(UserContext);

    /* Consulta (id paciente, id instalacion, id medico ) */
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [bloodPressure, setBloodPressure] = useState("");
    const [weight, setWeight] = useState("");
    const [record, setRecord] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");

    const handleTestSelect = (selectedItem) => {
        setSelectedTest(selectedItem[0]);
    };

    const handleMedicineSelect = (selectedItem) => {
        setSelectedMedicine(selectedItem[0]);
    };

    const handleProcedureSelect = (selectedItem) => {
        setSelectedProcedure(selectedItem[0]);
    };

    const handleIllnessSelect = (selectedItem) => {
        setSelectedIllness(selectedItem[0]);
    };

    const [testsItemForm, setTestsItemForm] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [testOptions, setTestOptions] = useState([]);

    const [medicineItemForm, setMedicineItemForm] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicineOptions, setMedicineOptions] = useState([]);

    const [illnessItemForm, setIllnessItemForm] = useState([]);
    const [selectedIllness, setSelectedIllness] = useState(null);
    const [illnessOptions, setIllnessOptions] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/stock?id_instalacion_medica=${userDetails.unidad}`)
            .then((response) => response.json())
            .then((data) => setMedicineOptions(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(
            `${API_URL}/procedimientos?id_instalacion_medica=${userDetails.unidad}`
        )
            .then((response) => response.json())
            .then((data) => setProcedureOptions(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/enfermedades`)
            .then((response) => response.json())
            .then((data) => setIllnessOptions(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(
            `${API_URL}/pruebas-diagnosticas?id_instalacion_medica=${userDetails.unidad}`
        )
            .then((response) => response.json())
            .then((data) => setTestOptions(data))
            .catch((error) => console.log(error));
    }, []);

    const [procedureItemForm, setProcedureItemForm] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [procedureOptions, setProcedureOptions] = useState([]);

    const [treatmentEfficacy, setTreatmentEfficacy] = useState({
        def: "",
        val: 5,
    });

    const [currentSession, setCurrentSession] = useState({
        doctor: userDetails.nombre,
        center: userDetails.unidad,
    });

    const [patients, setPatients] = useState([]);
    const [patientsLoading, setPatientsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/pacientes`, { mode: "cors" })
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.map((patient) => ({
                    id: patient[0],
                    name: patient[1],
                }));
                setPatients(formattedData);
                setPatientsLoading(false);
                formattedData.forEach((patient) => {
                    if (patient.id == patientId) {
                        setSelectedPatient(patient);
                    }
                });
            })
            .catch((error) => console.error(error));
    }, []);

    const [date, setDate] = useState("");
    const treatmentEfficacyOptions = [
        { def: "No Aplica", val: 4 },
        { def: "Mejoría", val: 3 },
        { def: "Estable", val: 2 },
        { def: "Empeoramiento", val: 1 },
        { def: "Paciente difunto", val: 0 },
    ];

    const handleSelect = (selected) => {
        setSelectedPatient(selected[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        newConsultation();
    };

    const [show, setShow] = useState(false);
    const newConsultation = () => {
        const consultation = {
            consulta: {
                idPaciente: selectedPatient.id,
                idInstalacion: userDetails.unidad,
                idMedico: currentUser.id,
            },
            bitacora: {
                presion: bloodPressure,
                peso: weight,
                expediente: record,
                diagnostico: diagnosis,
                tratamiento: treatment,
                eficaciaTratamiento: treatmentEfficacy.val,
            },
            pruebas: testsItemForm.map((test) => ({
                idPrueba: test.id,
                nombrePrueba: test.name,
            })),
            medicamentos: medicineItemForm.map((medicine) => ({
                idMedicamento: medicine.id,
                nombreMedicamento: medicine.name,
                cantidad: medicine.quantity,
            })),
            procedimientos: procedureItemForm.map((procedure) => ({
                idProcedimiento: procedure.id,
                nombreProcedimiento: procedure.name,
            })),
            enfermedades: illnessItemForm.map((illness) => ({
                idEnfermedad: illness.id,
                nombreEnfermedad: illness.name,
            })),
        };
        console.log(JSON.stringify(consultation));

        fetch(`${API_URL}/consulta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(consultation),
        })
            .then((response) => {
                setShow(true);
                alert("Consulta agregada con éxito");
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            {show ? (
                <Alert
                    key="success"
                    variant="success"
                    dismissible
                    onClose={() => setShow(false)}
                >
                    Consulta agregada con éxito
                </Alert>
            ) : null}

            <div className="consultation-bg">
                <Container className="new-consultation patient-container ">
                    <Form onSubmit={handleSubmit}>
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
                            patientsLoading={patientsLoading}
                        />
                        <section>
                            <h3 className="my-4">
                                <NotesTwoToneIcon /> Bitácora de Consulta
                            </h3>

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
                                                onChange={(e) => {
                                                    setBloodPressure(
                                                        e.target.value
                                                    );
                                                }}
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
                                            onChange={(e) => {
                                                setWeight(e.target.value);
                                            }}
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
                                            onChange={(e) => {
                                                setRecord(e.target.value);
                                            }}
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
                                            onChange={(e) => {
                                                setDiagnosis(e.target.value);
                                            }}
                                        />
                                    </InputGroup>

                                    <ItemForm
                                        title="Enfermedades"
                                        icon="ScienceTwoToneIcon"
                                        items={illnessItemForm}
                                        setItemForm={setIllnessItemForm}
                                        hasQuantity={false}
                                        itemOptions={illnessOptions}
                                        handleSelect={handleIllnessSelect}
                                        selectedItem={selectedIllness}
                                    />
                                </Col>
                            </Row>
                        </section>

                        {/* Additional Forms */}
                        <div className="border p-2 mt-3">
                            <h3>Tratamiento</h3>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Descripción general
                                </InputGroup.Text>
                                <FormControl
                                    as="textarea"
                                    aria-label="Default"
                                    type="text"
                                    onChange={(e) => {
                                        setTreatment(e.target.value);
                                    }}
                                />
                            </InputGroup>

                            <ItemForm
                                title="Medicamentos"
                                icon="HealingTwoToneIcon"
                                items={medicineItemForm}
                                setItemForm={setMedicineItemForm}
                                hasQuantity={true}
                                itemOptions={medicineOptions}
                                handleSelect={handleMedicineSelect}
                                selectedItem={selectedMedicine}
                            />

                            <ItemForm
                                title="Pruebas Diagnósticas"
                                icon="ScienceTwoToneIcon"
                                items={testsItemForm}
                                setItemForm={setTestsItemForm}
                                hasQuantity={false}
                                itemOptions={testOptions}
                                handleSelect={handleTestSelect}
                                selectedItem={selectedTest}
                            />

                            <ItemForm
                                title="Procedimientos"
                                icon="VaccinesTwoToneIcon"
                                items={procedureItemForm}
                                setItemForm={setProcedureItemForm}
                                hasQuantity={false}
                                itemOptions={procedureOptions}
                                handleSelect={handleProcedureSelect}
                                selectedItem={selectedProcedure}
                            />
                            <div className="d-flex justify-content-center">
                                <DropdownButton
                                    id="dropdown-item-button"
                                    title={
                                        treatmentEfficacy.def === ""
                                            ? "Eficacia del tratamiento anterior"
                                            : treatmentEfficacy.def
                                    }
                                    className="effective-dropdown"
                                >
                                    {treatmentEfficacyOptions.map((item) => (
                                        <Dropdown.Item
                                            key={item.def}
                                            onClick={() =>
                                                setTreatmentEfficacy({
                                                    def: item.def,
                                                    val: item.val,
                                                })
                                            }
                                        >
                                            {item.def}
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
