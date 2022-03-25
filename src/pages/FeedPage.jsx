import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./pages_styles/FeedPage.css";

import { firestore } from "../firebase.js";
import {
    doc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    onSnapshot
} from "firebase/firestore";

import TweetCard from "../components/TweetCard";

function FeedPage({
    dataGlobalUser,
    setArrayGlobalPostsUserLogged,
    setArrayGlobalAllUsersPosts,
    arrayGlobalAllUsersPosts,

    setArrayGlobalFavoritesUserLogged,
    arrayGlobalFavoritesUserLogged
}) {

    const [currentLength, setCurrentLength] = useState(0);

    //estado para re activar el useEffect luego de dar click en POST
    const [isPost, setIsPost] = useState(true);

    //texto a enviar a firebase
    const [text, setText] = useState("");

    // informacion del usuario logueado proveniente de firebase
    const [userInfoFirebase, setUserInfoFirebase] = useState([]);

    //array con objetos de todos los posts correspondiente al usuaio logueado
    const [arrayUserPosts, setArrayUserPosts] = useState([]);


    const handleInput = () => {
        let textElement = document.getElementById("fake-textarea");
        let innerText = textElement.innerText;

        //set the text to send to firebase
        setText(innerText.trim());

        //----------------------------------------------------------------
        // To fix the problem when the user clicks ENTER,
        // and automatically the browser adds a <div></div> tag
        // inside the Fake TextArea Tag, so this way
        // we can count correctly the length of the text
        // inside the fake text area

        let currentLength = textElement.innerHTML.split("<div>");
        currentLength = currentLength.join("");
        currentLength = currentLength.split("</div>");
        currentLength = currentLength.join("");
        currentLength = currentLength.replace(/<br>/g, "");
        currentLength = currentLength.length;

        // Update the state of the text length
        setCurrentLength(currentLength);
    };

    const handleSendPost = () => {
        //seteamos setIsPost al contrario de su estado para re montar la pagina y que vuelva a traer la info de firebase

        if (currentLength > 0 && arrayUserPosts) {
            if (isPost) {
                setIsPost(false);
                // console.log(isPost);
            } else {
                setIsPost(true);
                // console.log(isPost);
            }

            // para borrar la entrada de texto (se lo hace asi porque no es un texarea)
            let textElement = document.getElementById("fake-textarea");
            textElement.innerHTML = "";
            // reseteamos el contador de letras
            setCurrentLength(0);

            //--------------------------------------------------------------------
            //-------------- MANEJO DEL ENVIO DEL POST A FIREBASE ----------------

            // Pasos que debe cumplir para funcionar:

            //  Traer la informacion de todos los posts de ese usuario (al montarse esta pagina, en el useEffect la seteamos y esta info esta lista para usar)

            //  Agregar ese nuevo post a la lista de todos los posts del usuario.

            // console.log("VIEJO ArrayUserPosts");
            // console.log(arrayUserPosts);
            // console.log("NUEVO ArrayUserPosts");
            // console.log([
            //     ...arrayUserPosts,
            //     {
            //         id: Date.now(),
            //         fecha:Date.now(),
            //         text: text,
            //         likes: 0,
            //         userName: userInfoFirebase.userName,
            //         colorUser: userInfoFirebase.colorUser,
            //     },
            // ]);

            //  Enviar esa Nueva listra de posts del usuario a firebase

            const docuRef = doc(firestore, `usuarios/${dataGlobalUser.email}`);

            updateDoc(docuRef, {
                posts: [
                    ...arrayUserPosts,
                    {
                        id: Date.now(),
                        postDate: Date.now(),
                        photo: userInfoFirebase.photo,
                        email: dataGlobalUser.email,
                        text: text,
                        likes: 0,
                        userName: userInfoFirebase.userName,
                        colorUser: userInfoFirebase.colorUser,
                    },
                ],
            });

            //---------------------------------------------------------------------
        }
    };

    // creamos una funcion para traer la informacion de firebase del usuario logueado

    async function bringInfoUserFirebase(idDocument) {
        // Crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocument}`);

        // buscar documento
        const consulta = await getDoc(docuRef);

        if (consulta.exists()) {
            // si si existe el documento
            const infoDocu = consulta.data();

            return infoDocu;
        }
    }

    // funcion para traer y almacenar luego los posts de usuario logueado al array global de todos los posts de todos los usuarios
    async function bringAllCollectionPosts() {
        const dataCollection = await getDocs(collection(firestore, "usuarios"));

        const arrayAllPost = [];

        dataCollection.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data().posts);
            arrayAllPost.push(...doc.data().posts);
        });

        // console.log("arrayAllPOst");
        // console.log(arrayAllPost);
        setArrayGlobalAllUsersPosts(arrayAllPost);
    }

    useEffect(() => {
        // console.log("MONTANDO FEED PAGE");

        const desuscribir = onSnapshot(collection(firestore, "usuarios") ,()=> {

            if (dataGlobalUser) {
                const fetchInfoUser = async () => {
                    // buscaremos el documento basado en su id que sera el correo
                    const userInfo = await bringInfoUserFirebase(
                        dataGlobalUser.email
                    );
                    // console.log("POSTS CUANDO SE MONTA:");
                    // console.log(userInfo.posts);
                    // seteamos el array con todos los posts traidos de firebase para usarlos de manera global
                    setArrayGlobalPostsUserLogged(userInfo.posts);
                    //seteamos esa informacion del usuario provista por firebase para usarla en otra parte de la pagina
                    setUserInfoFirebase(userInfo);

                    setArrayUserPosts(userInfo.posts);
                };

                fetchInfoUser();
                bringAllCollectionPosts();
            }

        })

        return () => {
            desuscribir();
            // console.log("DESMONTANDO FEED PAGE");
        };

    }, [isPost]);

    return (
        <>
            <nav className="FeedPage-nav">
                <div className="FeedPage-nav-content">
                    <h2 className="nav-title-logo">
                        DEVS_<span>UNITED</span>
                    </h2>

                    <Link
                        className="nav-user-picture-container"
                        to="/profile-page"
                    >
                        <img
                            src={dataGlobalUser && dataGlobalUser.photoURL}
                            className="nav-user-picture"
                            alt="user profile"
                        />
                    </Link>
                </div>
            </nav>

            <header className="FeedPage-header">
                <div className="FeedPage-header-content">
                    <div className="left">
                        <img
                            src={dataGlobalUser && dataGlobalUser.photoURL}
                            className="header-user-picture"
                            alt="user profile"
                        />
                    </div>

                    <div className="right">
                        <div
                            contentEditable="true"
                            className="fake-textarea"
                            id="fake-textarea"
                            name="fake-textarea"
                            aria-autocomplete="list"
                            aria-controls="typeAheadDropdownWrapped-1"
                            aria-multiline="true"
                            role="textbox"
                            aria-required="true"
                            onInput={handleInput}
                        ></div>

                        <textarea id="description"></textarea>

                        <div className="lenght-container">
                            <p className="current">{currentLength}</p>
                            <p className="max">200 max.</p>
                        </div>

                        <div className="button-container">
                            <button onClick={handleSendPost}>POST</button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="FeedPage-section">
                <div className="Feed-section-content">
                    {arrayGlobalAllUsersPosts ? (
                        <FeedList
                            arrayGlobalAllUsersPosts={arrayGlobalAllUsersPosts}
                            dataGlobalUser={dataGlobalUser}
                        />
                    ) : (
                        <h1>No POsts</h1>
                    )}
                </div>
            </section>
        </>
    );
}

export default FeedPage;

function FeedList({ arrayGlobalAllUsersPosts ,dataGlobalUser}) {

    return arrayGlobalAllUsersPosts.map((post) => {

        return (
            <TweetCard
                key={post.id}
                photo={post.photo}
                userName={post.userName}
                text={post.text}
                likes={post.likes}
                colorUser={post.colorUser}
                id={+post.id} /* el simbolo "+" al comienzo de pos.id sirve para transformar ese valor a numero real*/
                email={post.email}
                postDate={post.postDate}
                arrayGlobalAllUsersPosts={arrayGlobalAllUsersPosts}
                dataGlobalUser={dataGlobalUser}
            />
        )
    });
}
