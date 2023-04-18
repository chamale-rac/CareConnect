import React, { createContext, useState, useEffect, useMemo } from "react";
import { API_URL } from "/config.js";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || null
    );

    const [userDetails, setUserDetails] = useState(() => {
        const storedUserDetails = localStorage.getItem("userDetails");
        return storedUserDetails
            ? JSON.parse(storedUserDetails)
            : {
                  nombre: "",
                  unidad: "",
                  rol: "",
                  especialidad: "",
              };
    });

    useEffect(() => {
        if (userDetails) {
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
        } else {
            localStorage.removeItem("userDetails");
        }
    }, [userDetails]);

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    useMemo(() => {
        if (currentUser) {
            if (localStorage.getItem("userDetails") === null) {
                fetch(`${API_URL}/medicos/${currentUser.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setUserDetails({
                            nombre: data[3],
                            unidad: data[7],
                            rol: "Doctor",
                            especialidad: data[6],
                        });
                    })
                    .catch((error) => console.error(error));
            }
        } else {
            setUserDetails(null);
        }
    }, [currentUser]);

    return (
        <UserContext.Provider
            value={{ currentUser, userDetails, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};
