import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";

import { onAuthStateChanged } from "firebase/auth"; // para comprobar si hay cambios en el estado leyendo si el usuario se ha logueado o no.
import { auth } from "./firebase.js";

function App() {
    // *estados globales para usarlos en todos los componentes .

    const [dataGlobalUser, setDataGlobalUser] = useState(null); // Global variable ; User data provided by Google when the user is logged.

    useEffect(() => {
        const desuscribir = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setDataGlobalUser(firebaseUser);
                console.log(firebaseUser);
            } else {
                console.log("NO Logueado");
            }
        });

        return () => {
            desuscribir();
        };
    }, []);

    // console.log("DATOS EN APP: ");
    // console.log(userName);
    // console.log(colorUser);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <LoginPage setDataGlobalUser={setDataGlobalUser} />
                    }
                />
                <Route
                    path="/welcome-page"
                    element={<WelcomePage dataGlobalUser={dataGlobalUser} />}
                />
                <Route
                    path="/feed-page"
                    element={
                        dataGlobalUser && (
                            <FeedPage dataGlobalUser={dataGlobalUser} />
                        )
                    }
                />
                <Route
                    path="/profile-page"
                    element={<ProfilePage dataGlobalUser={dataGlobalUser} />}
                />
                <Route path="*" element={<h1> 404: RUTA NO ENCONTRADA</h1>} />
            </Routes>
        </>
    );
}

export default App;
