import React from "react";

import "../pages/pages_styles/ProfilePage.css";

import fakeUser from "../assets/fake-user.png"

import backLogo from "../assets/back.png";
import logoutLogo from "../assets/logout.png";

// Color selected by the logged user. This color is automatically set after the Log
let colorSelectedByUser = "#yellow"; // this is an example, it have to be changed dynamically

function ProfilePage() {
    return (
        <>
            <nav className="ProfilePage-nav">
                <div className="ProfilePage-nav-content">
                    <div className="ProfilePage-nav-content-left">
                        <img src={backLogo} alt="Back to Feed Page" />
                        <p>USERNAME</p>
                    </div>

                    <div className="ProfilePage-nav-content-right">
                        <p>LOGOUT</p>
                        <img src={logoutLogo} alt="Logout" />
                    </div>
                </div>
            </nav>

            <header className="ProfilePage-header">
                <div className="ProfilePage-header-content">

                    <div className="ProfilePage-header-content-up">
                        <img src={fakeUser} alt="" />
                        <p>USERNAME</p>
                    </div>

                    <div className="ProfilePage-header-content-down">
                        <div className="posts-btn btn-active" role="button">
                            <p>POSTS</p>
                        </div>
                        <div className="favorites-btn" role="button">
                            <p>FAVORITES</p>
                        </div>
                    </div>

                </div>
            </header>

            <section className="ProfilePage-section">
            
                <div className="ProfilePage-section-content">

                    

                </div>

            </section>
        </>
    );
}

export default ProfilePage;
