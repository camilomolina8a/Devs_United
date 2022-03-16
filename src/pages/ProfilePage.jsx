import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../pages/pages_styles/ProfilePage.css";

// import fakeUser from "../assets/fake-user.png";
import backLogo from "../assets/back.png";
import logoutLogo from "../assets/logout.png";

import TweetCard from "../components/TweetCard";

import { logout } from "../firebase.js";


function ProfilePage({ dataGlobalUser }) {
    
    const navigate = useNavigate()

    // To logout from google and the user will be redirected to the Login Page
    const Logout = () => {

        
        logout();
        navigate("/")
    }
    

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
    };

    if (dataGlobalUser) {
        console.log(dataGlobalUser);
    }

    return (
        <>
            <nav className="ProfilePage-nav">
                <div className="ProfilePage-nav-content">
                    <Link
                        className="ProfilePage-nav-content-left"
                        to="/feed-page"
                    >
                        <img src={backLogo} alt="Back to Feed Page" />
                        <p>USERNAME</p>
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
                        />
                        <p>USERNAME</p>
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
                    {/* <TweetCard/>
                    <TweetCard/>
                    <TweetCard/>
                    <TweetCard/> */}
                </div>
            </section>
        </>
    );
}

export default ProfilePage;

function PostsList() {
    return <h1>Post List</h1>;
}

function FavoritesList() {
    return <h1>Favorites List</h1>;
}
