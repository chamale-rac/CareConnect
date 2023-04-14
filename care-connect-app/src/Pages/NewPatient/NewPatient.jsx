import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { React, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "/src/Components/CustomNavbar.jsx";
import PatientForm from "/src/Components/Forms/PatientForm.jsx";
import "./NewPatient.css";

export function NewPatient(props) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <>
            <CustomNavbar />
            <div className="patient-container container mt-4">
                <Button variant="secondary " onClick={handleBackClick}>
                    <ArrowBackIcon />
                </Button>
                <h2 className="mt-3">Nuevo Paciente</h2>
            </div>

            <PatientForm />
        </>
    );
}
