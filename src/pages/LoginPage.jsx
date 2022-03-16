import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./pages_styles/LoginPage.css";
import logoDevsUnited from "../assets/logo-big-devsUnited.png";
import logoGoogle from "../assets/logo-google.png";

import { googlePopUp } from "../firebase.js";


function LoginPage() {

    const navigate = useNavigate();

//-----------------------------------------------------------------------
    const handleClick = async () => {

        // console.log("DIste click");

        const data = await googlePopUp();
        if(data){
            // console.log("SIGUIENTEEEEE");
            navigate("/welcome-page")
        }
        
        

    }
//-----------------------------------------------------------------------



    

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-left">
                <img src={logoDevsUnited} alt="Logo Devs United" />
            </div>

            <div className="LoginPage-right">
                <h1>Together, building the future</h1>

                <h3>A community for developers to unlock & share new skills</h3>

                <div className="sigin-container">
                    <div className="signin-logo-google">
                        <img src={logoGoogle} alt="Google Logo" />
                    </div>

                    <div className="signin-text" onClick={handleClick}>
                        <p>Sign in with Google</p>
                    </div>
                </div>

                <p className="text-footer">
                    © 2022 Devs_United - <span>BETA</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
