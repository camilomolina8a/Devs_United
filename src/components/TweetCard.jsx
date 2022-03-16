import React from "react";
import { useState } from "react";

import "./styles/TweetCard.css";

import fakeUser from "../assets/fake-user.png";
import delete_logo from "../assets/delete.png";
import like_red from "../assets/heart-red.png";
import like_white from "../assets/heart-white.png";

const TweetCard = () => {
    const [like, setLike] = useState(false);

    return (
        <>
            <div className="TweetCard">
                <div className="TweetCard-picture">
                    <img src={fakeUser} alt="User profile" />
                </div>

                <div className="TweetCard-content">
                    <div className="TweetCard-content-title">
                        <div className="TweetCard-content-title-head">
                            <div>
                                <span className="title">USERNAME</span>
                            </div>
                            <div>
                                <span className="date">- 5 jun</span>
                            </div>
                        </div>

                        <p className="text">
                            Hola este es un ejemplo de texto de como
                            Hola este es un ejemplo de texto de como
                            Hola este es un ejemplo de texto de como
                            Hola este es un ejemplo de texto de como
                            Hola este es un ejemplo de texto de como
                            
                        </p>
                    </div>

                    <img
                        src={like ? like_white : like_red}
                        alt="like"
                        className="TweetCard-content-like"
                    />
                    <span className="current-likes">100</span>
                </div>

                <div className="TweetCard-delete">
                    <img src={delete_logo} alt="Trash can" onClick={like} />
                </div>
            </div>
        </>
    );
};

export default TweetCard;
