import React from "react";

import "./pages_styles/WelcomePage.css";

import logoDevsUnited from "../assets/logo-big-devsUnited.png";

function WelcomePage() {
    return (
        <div className="WelcomePage-container">
            <div className="WelcomePage-left">
                <img src={logoDevsUnited} alt="Logo Devs United" />
            </div>

            <div className="WelcomePage-right">
                <div className="Welcome-right-content">
                    <h1>
                        Welcome, <span>Name</span>
                    </h1>

                    <input
                        type="text"
                        name=""
                        placeholder="Type your username"
                    />

                    <h3>Select your favorite color</h3>

                    <div className="colors-container">
                        <div className="color red"></div>
                        <div className="color orange"></div>
                        <div className="color yellow"></div>
                        <div className="color green"></div>
                        <div className="color blue"></div>
                        <div className="color purple"></div>
                    </div>

                    <button>CONTINUE</button>
                </div>

                <p className="text-footer">
                    © 2022 Devs_United - <span>BETA</span>
                </p>
            </div>
        </div>
    );
}

export default WelcomePage;
