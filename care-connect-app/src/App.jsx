import { useState, React } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import { NewConsultation } from "./Pages/NewConsultation";
import { NewPatient } from "./Pages/NewPatient";
function App() {
    return (
        <>
            <nav>
                <ul className="list-group">
                    <li className="list-group-item">
                        This is supposed to be the navbar cause it doesnt
                        re-render
                    </li>
                    <li className="list-group-item">
                        <Link to="/">Landing</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <h3>Pretend im the login (if user is not signed in)</h3>
                    }
                />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/home/new-consultation"
                    element={<NewConsultation />}
                />
                <Route path="/home/new-patient" element={<NewPatient />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    );
}

export default App;
