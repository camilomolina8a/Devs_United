import React from "react";


import logoDevsUnited from "../assets/logo-big-devsUnited.png";
import logoGoogle from "../assets/logo-google.png";

function LoginPage() {
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

                    <div className="signin-text">
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
