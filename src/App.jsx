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
    console.log(dataGlobalUser);

    // Array con todos los posts del usuario logueado (se lo setea desde Feed PAge)
    const [arrayGlobalPostsUserLogged, setArrayGlobalPostsUserLogged] =
        useState([]);

    // Array con todos los posts de todos los usuarios
    const [arrayGlobalAllUsersPosts, setArrayGlobalAllUsersPosts] = useState(
        []
    );

    //-----------------------------------------------------------------------
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
    //-----------------------------------------------------------------------

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage dataGlobalUser={dataGlobalUser} />}
                />
                <Route
                    path="/welcome-page"
                    element={<WelcomePage dataGlobalUser={dataGlobalUser} />}
                />
                <Route
                    path="/feed-page"
                    element={
                        <FeedPage
                            dataGlobalUser={dataGlobalUser}
                            setArrayGlobalPostsUserLogged={
                                setArrayGlobalPostsUserLogged
                            }
                            setArrayGlobalAllUsersPosts={
                                setArrayGlobalAllUsersPosts
                            }
                            arrayGlobalAllUsersPosts={arrayGlobalAllUsersPosts}
                        />
                    }
                />
                <Route
                    path="/profile-page"
                    element={
                        <ProfilePage
                            dataGlobalUser={dataGlobalUser}
                            arrayGlobalPostsUserLogged={
                                arrayGlobalPostsUserLogged
                            }
                        />
                    }
                />
                <Route path="*" element={<h1> 404: RUTA NO ENCONTRADA</h1>} />
            </Routes>
        </>
    );
}

export default App;
