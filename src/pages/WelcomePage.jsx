import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./pages_styles/WelcomePage.css";

import { firestore } from "../firebase";

import logoDevsUnited from "../assets/logo-big-devsUnited.png";

function WelcomePage({ dataGlobalUser}) {

    //TODO: ENVIAR el userName y el color a Firebase correspondiente al usuario logueado

    const [firstName, setFirstName] = useState("");
    const [colorUser, setColorUser] = useState("");
    const [userName, setUserName] = useState("");

    console.log(userName);
    console.log(colorUser);


    const navigate = useNavigate();

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

        // TODO: eviar a firebase los valores de userName y de colorUser correspondiente a el ususario logueado

        if (userName !== "" && colorUser !== "") {
            // console.log("CONTINUE");
            navigate("/feed-page");
        }
        
    };


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
