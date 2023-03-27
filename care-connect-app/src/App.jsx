import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";

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
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    );
}

export default App;
