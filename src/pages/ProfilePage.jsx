import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../pages/pages_styles/ProfilePage.css";

import backLogo from "../assets/back.png";
import logoutLogo from "../assets/logout.png";

import TweetCard from "../components/TweetCard";

import { firestore, logout } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

function ProfilePage({ dataGlobalUser, arrayGlobalPostsUserLogged }) {
    const navigate = useNavigate();

    const [userName, setUserName] = useState(null);

    // para decidir que componente mostrar segun donde se de click en posts o favorites
    const [showListOf, setShowListOf] = useState("posts");

    // To logout from google and the user will be redirected to the Login Page
    const Logout = () => {
        logout();
        navigate("/");
    };

    const btnActivePosts = (btnID, otherBtnID) => {
        console.log("presionaste Posts");
        // To manage the style when the Post button was clicked
        const btnClicked = document.getElementById(btnID);
        const otherBtn = document.getElementById(otherBtnID);

        if (btnClicked.classList.contains("btn-active")) {
            console.log("TINE CLASE");
        } else {
            console.log("AGREGANDO CLASE");
            btnClicked.classList.add("btn-active");
            otherBtn.classList.remove("btn-active");
        }
        //------------------------------------------------------

        // para manejar el mostrar el componente que contiene la lista de todos los posts del usuario traidos desde firebase
        //seteamos el estado a "posts" para mostrar ese componente
        setShowListOf("posts");
    };

    const btnActiveFavorites = (btnID, otherBtnID) => {
        console.log("presionaste favorites");

        // To manage the style when the Post button was clicked
        const btnClicked = document.getElementById(btnID);
        const otherBtn = document.getElementById(otherBtnID);

        if (btnClicked.classList.contains("btn-active")) {
            console.log("TINE CLASE");
        } else {
            console.log("AGREGANDO CLASE");
            btnClicked.classList.add("btn-active");
            otherBtn.classList.remove("btn-active");
        }
        //------------------------------------------------------

        // para manejar el mostrar el componente que contiene la lista de todos los favorites del usuario traidos desde firebase
        //seteamos el estado a "favorites" para mostrar ese componente
        setShowListOf("favorites");
    };

    // Function to bring the userName and colorName from Firebase

    async function searchUserNameColorUserFromFirebase(idDocument) {
        // Crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocument}`);

        // buscar documento
        const consulta = await getDoc(docuRef);

        if (consulta.exists()) {
            // si si existe el documento
            const infoDocu = consulta.data();

            return [infoDocu.userName, infoDocu.colorUser];
        }
    }

    useEffect(() => {
        console.log("MONTANDO PROFILE PAGE");
        // creamos la funcion asincrona para que se ejecute luego de montarse el componente
        // if (dataGlobalUser) {

        const fetchInfoUser = async () => {
            // crearemos o buscaremos el documento basado en su id que sera el correo
            const data = await searchUserNameColorUserFromFirebase(
                dataGlobalUser.email
            );
            setUserName(data[0]);
            // seteamos el background color y el border del username del profile page basado en el color que registramos en firebase

            const userNameElement = document.querySelector("#userName-profile");
            userNameElement.style.setProperty("background-color", data[1]);

            const userPhotoElement = document.querySelector("#photo");
            userPhotoElement.style.setProperty(
                "border",
                `4px solid ${data[1]}`
            );
        };
        fetchInfoUser();

        if (arrayGlobalPostsUserLogged) {
            console.log("ARRAYS USER GLOBAL ");
            console.log(arrayGlobalPostsUserLogged);
        }

        // }

        return () => {
            console.log("DESMONTANDO PROFILE PAGE");
        };
    }, []);

    return (
        <>
            <nav className="ProfilePage-nav">
                <div className="ProfilePage-nav-content">
                    <Link
                        className="ProfilePage-nav-content-left"
                        to="/feed-page"
                    >
                        <img src={backLogo} alt="Back to Feed Page" />
                        <p>{userName ? userName : "USERNAME"}</p>
                    </Link>

                    <div
                        className="ProfilePage-nav-content-right"
                        onClick={Logout}
                    >
                        <p>LOGOUT</p>
                        <img src={logoutLogo} alt="Logout" />
                    </div>
                </div>
            </nav>

            <header className="ProfilePage-header">
                <div className="ProfilePage-header-content">
                    <div className="ProfilePage-header-content-up">
                        <img
                            src={dataGlobalUser && dataGlobalUser.photoURL}
                            alt=""
                            id="photo"
                        />
                        <p id="userName-profile">
                            {userName ? userName : "USERNAME"}
                        </p>
                    </div>

                    <div className="ProfilePage-header-content-down">
                        <div
                            className="btn posts-btn btn-active"
                            id="posts-btn"
                            onClick={() =>
                                btnActivePosts("posts-btn", "favorites-btn")
                            }
                        >
                            <p>POSTS</p>
                        </div>
                        <div
                            className="btn favorites-btn"
                            id="favorites-btn"
                            onClick={() =>
                                btnActiveFavorites("favorites-btn", "posts-btn")
                            }
                        >
                            <p>FAVORITES</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="ProfilePage-section">
                <div className="ProfilePage-section-content">

                    {
                        showListOf === "posts" ? (

                            <PostsList arrayGlobalPostsUserLogged={arrayGlobalPostsUserLogged}/>

                        ) : (

                        showListOf === "favorites" && <FavoritesList />

                        )
                    }
                </div>
            </section>
        </>
    );
}

export default ProfilePage;



function PostsList({ arrayGlobalPostsUserLogged , dataGlobalUser}) {

    return (
        <>
            <h1>Post List</h1>

            {arrayGlobalPostsUserLogged.map((objPost) => {

                return (

                    <TweetCard
                        photo={objPost.photo}
                        userName={objPost.userName}
                        text={objPost.text}
                        key={objPost.id}
                        likes={objPost.likes}
                        colorUser= {objPost.colorUser}
                        id={objPost.id}
                        email={objPost.email}
                        postDate={objPost.postDate}
                        dataGlobalUser={dataGlobalUser}
                    />
                )
            })}
        </>
    );
}

function FavoritesList() {
    return <h1>Favorites List</h1>;
}
