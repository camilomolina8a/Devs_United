import React, { useEffect } from "react";

import "./styles/TweetCard.css";

// import fakeUser from "../assets/fake-user.png";
import delete_logo from "../assets/delete.png";
import like_red from "../assets/heart-red.png";
import like_white from "../assets/heart-white.png";

const TweetCard = ({ photo, userName, text, likes, colorUser, id ,email}) => {

    const handleLikes = (id) => {
        const numberLikes = likes;

        console.log(numberLikes, +id);
        
    };

    const handleDelete = (id) => {
        // if(dataGlobalUser.email)
    };

    // cambiar el color de fondo del nombre segun el color seleccionado

    useEffect(() => {

        if (colorUser) {

            /*
            elem.hasAttribute(nombre) – comprueba si existe.
            elem.getAttribute(nombre) – obtiene el valor.
            elem.setAttribute(nombre, valor) – establece el valor.
            elem.removeAttribute(nombre) – elimina el atributo.

            <html>
                <body>
                <p id="color">Azul</p>

                <script>
                    var color = document.getElementById("color").innerHTML;
                    if (color == "Azul") {
                    document.getElementById("color").style.backgroundColor = "#0000FF";
                    }
                    if (color == "Rojo") {
                    document.getElementById("color").style.backgroundColor = "#FF0000";
                    }
                </script>
                </body>
            </html>
            */

            // const userNameElement = document.querySelectorAll(".title");
            // userNameElement.style.setProperty("background-color", colorUser);
            
            const elementNombre = document.getElementById("title").innerHTML
            console.log(elementNombre)

        }

        return () => {};
    }, [colorUser]);



    return (
        <>
            <div className="TweetCard" >
                <div className="TweetCard-picture">
                    <img src={photo} alt="User profile" />
                </div>

                <div className="TweetCard-content">
                    <div className="TweetCard-content-title">
                        <div className="TweetCard-content-title-head">
                            <div>
                                <span className="title" id="title" data-color={colorUser}>{userName}</span>
                            </div>
                            <div>
                                <span className="date">- 5 jun</span>
                            </div>
                        </div>

                        <p className="text">{text}</p>
                    </div>

                    <img
                        src={likes ? like_white : like_red}
                        alt="like"
                        className="TweetCard-content-like"
                        onClick={() => handleLikes(id)}
                    />
                    <span className="current-likes">{likes}</span>
                </div>

                <div className="TweetCard-delete">
                    <img
                        src={delete_logo}
                        alt="Trash can"
                        onClick={ () => handleDelete(id)}
                    />
                </div>
            </div>
        </>
    );
};

export default TweetCard;
