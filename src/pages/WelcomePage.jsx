import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./pages_styles/WelcomePage.css";

import { firestore } from "../firebase";
import { doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

import logoDevsUnited from "../assets/logo-big-devsUnited.png";

function WelcomePage({ dataGlobalUser}) {


    const [firstName, setFirstName] = useState("");
    const [colorUser, setColorUser] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();


    //-----------------------------------------------------

    // FUNCION PARA BUSCAR O CREAR UN NUEVO DOCUMENTO EN LA COLLECION USUARIOS DE FIREBASE

    async function buscarOrCrearDocument( idDocumento ) {

        // Crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`)
        
        // buscar documento
        const consulta = await getDoc(docuRef)

        // revisar si existe

        if(consulta.exists()){
            // si si existe el documento
            const infoDocu = consulta.data()

            // return infoDocu.tareas
            return infoDocu
        }
        else{
            // si no existe el documento, lo creamos
            await setDoc(docuRef, {photo:dataGlobalUser.photoURL ,userName: userName, colorUser : colorUser, posts:[], favorites:[]})

            // luego volvemos a hacer la consulta
            const consulta = await getDoc(docuRef)
            
            // retornamos ese documento creado
            const infoDocu = consulta.data()

            return infoDocu
        }
    }

    useEffect(() => {
      // creamos la funcion asincrona para que se ejecute luego de montarse el componente
        if (dataGlobalUser){

            const fetchInfoUser = async()=> {
                // crearemos o buscaremos el documento basado en su id que sera el correo
                await buscarOrCrearDocument(dataGlobalUser.email);
            }

            fetchInfoUser();
        }

    return () => {}
    }, [])
    
//-----------------------------------------------------


    const handleChange = (e) => {
        setUserName(e.target.value);
    };

    const handleColorSelect = (elementID) => {
        const elementClicked = document.getElementById(elementID);
        const color = elementClicked.getAttribute("color");

        setColorUser(color);

        // para agregar la clase Active al color seleccionado y eliminar la clase Active del resto de colores

        const elements = document.querySelectorAll(".color");

        elements.forEach((elementColor) => {
            if (
                elementColor.classList.toString() ===
                elementClicked.classList.toString()
            ) {
                elementClicked.classList.add("active");
            } else {
                elementColor.classList.remove("active");
            }
        });
    };

    const handleContinue = () => {

        if (userName !== "" && colorUser !== "") {
            // console.log("CONTINUE");
            navigate("/feed-page");

            // manejamos el enviar el userName y el colorUser a Firebase
            if(dataGlobalUser){
                const docuRef = doc(firestore, `usuarios/${dataGlobalUser.email}`);
                updateDoc(docuRef, {userName:userName, colorUser:colorUser, photo: dataGlobalUser.photoURL})
            }
        }
    };

    // This useEffect is to set the First Name of the user provided by GOOGLE
    useEffect(() => {
        if (dataGlobalUser) {
            const firstName = dataGlobalUser.displayName.split(" ")[0];
            setFirstName(firstName);
        }

        return () => {};
    }, [dataGlobalUser]);



    return (
        <div className="WelcomePage-container">
            <div className="WelcomePage-left">
                <img src={logoDevsUnited} alt="Logo Devs United" />
            </div>

            <div className="WelcomePage-right">
                <div className="Welcome-right-content">
                    <h1>
                        Welcome, <span>{firstName}</span>
                    </h1>

                    <input
                        type="text"
                        name=""
                        onChange={handleChange}
                        placeholder="Type your username"
                        required
                    />

                    <h3>Select your favorite color</h3>

                    <div className="colors-container">
                        <div
                            className="color red"
                            id="red"
                            color="#F50D5A"
                            onClick={() => handleColorSelect("red")}
                        ></div>
                        <div
                            className="color orange"
                            id="orange"
                            color="#FF865C"
                            onClick={() => handleColorSelect("orange")}
                        ></div>
                        <div
                            className="color yellow"
                            id="yellow"
                            color="#FFEA5C"
                            onClick={() => handleColorSelect("yellow")}
                        ></div>
                        <div
                            className="color green"
                            id="green"
                            color="#00DA76"
                            onClick={() => handleColorSelect("green")}
                        ></div>
                        <div
                            className="color blue"
                            id="blue"
                            color="#0096CE"
                            onClick={() => handleColorSelect("blue")}
                        ></div>
                        <div
                            className="color purple"
                            id="purple"
                            color="#800FFF"
                            onClick={() => handleColorSelect("purple")}
                        ></div>
                    </div>

                    {userName !== "" && colorUser !== "" ? (
                        <button
                            onClick={handleContinue}
                            className="btn-continue"
                        >
                            CONTINUE
                        </button>
                    ) : (
                        <button className="btn-not-yet">CONTINUE</button>
                    )}
                </div>

                <p className="text-footer">
                    © 2022 Devs_United - <span>BETA</span>
                </p>
            </div>
        </div>
    );
}

export default WelcomePage;
