import React, { useState } from "react";

import "./styles/TweetCard.css";

// import fakeUser from "../assets/fake-user.png";
import delete_logo from "../assets/delete.png";
import like_red from "../assets/heart-red.png";
import like_white from "../assets/heart-white.png";

import {doc, getDoc, updateDoc} from 'firebase/firestore';
import { firestore } from "../firebase";

const TweetCard = ({
    dataGlobalUser,
    photo,
    userName,
    text,
    likes,
    colorUser,
    id,
    email,
    postDate,
    setRefreshDueLike,
    refreshDueLike
}) => {


    const [currentLike, setCurrentLike] = useState(likes)


    const handleLikes = (id) => {

        if(refreshDueLike) {
            setRefreshDueLike(false);
        }
        else{
            setRefreshDueLike(true);
        }

        // funcion que retorna un array actualizado, el cual actualiza el objeto del tweet que fue likeado 
        function arrayUpdatedLiked(array,id){

            array.map( (objeto) =>{
                if(objeto.id === id){
                    objeto.likes = currentLike + 1
                }
            })
            return array
        }   
        // --------------------

        async function bringInfoUserFirebase(idDocument) {
        
            const docuRef = doc(firestore, `usuarios/${idDocument}`);

            const consulta = await getDoc(docuRef);

            if (consulta.exists()) {
                
                const infoDocu = consulta.data();

            return infoDocu;
            }
        }

        const fetchInfo = async () => {

            const infoUser = await bringInfoUserFirebase(email);

            const infoUserPosts = infoUser.posts
        
            console.log(arrayUpdatedLiked(infoUserPosts,id))

            const docuRef = doc(firestore, `usuarios/${email}`);

            updateDoc( docuRef, {  posts: [...arrayUpdatedLiked(infoUserPosts,id)]  } ); 

            setCurrentLike(currentLike + 1)
            console.log(likes,"id:" , id);
        }
        fetchInfo();
        // --------------------            
        
    };


    const handleDelete = (id) => {
        console.log("Delete id",id);
        // if(dataGlobalUser.email)
    };

    //Function to display the date when the tweet was published
    function dayAndMonth(number) {
        let date = new Date(number);
        let dateString = date.toDateString();
        let arrayDate = dateString.split(" ");

        return `${arrayDate[1]} ${arrayDate[2]}`;
    }

    return (
        <>
            <div className="TweetCard">
                <div className="TweetCard-picture">
                    <img src={photo} alt="User profile" />
                </div>

                <div className="TweetCard-content">
                    <div className="TweetCard-content-title">
                        <div className="TweetCard-content-title-head">
                            <div>
                                <span
                                    className="title"
                                    id="title"
                                    data-color={colorUser}
                                >
                                    {userName}
                                </span>
                            </div>
                            <div>
                                <span className="date">
                                    {dayAndMonth(postDate)}
                                </span>
                            </div>
                        </div>

                        <p className="text">{text}</p>
                    </div>

                    <img
                        src={currentLike === 0 ? like_white : like_red}
                        alt="like"
                        className="TweetCard-content-like"
                        onClick={() => handleLikes(id)}
                    />
                    <span className="current-likes">{currentLike}</span>
                </div>

                <div className="TweetCard-delete">

                    {dataGlobalUser && [
                        dataGlobalUser.email === email ? (
                            <img
                                src={delete_logo}
                                alt="Trash can"
                                onClick={() => handleDelete(id)}
                            />
                        ) : <div></div> ]
                    }
                        
                    
                </div>
            </div>
        </>
    );
};

export default TweetCard;
