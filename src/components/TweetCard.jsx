import React, { useState } from "react";

import "./styles/TweetCard.css";

import delete_logo from "../assets/delete.png";
import like_red from "../assets/heart-red.png";
import like_white from "../assets/heart-white.png";

import {doc, getDoc, updateDoc,collection,getDocs} from 'firebase/firestore';
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

    
}) => {

    const [currentLike, setCurrentLike] = useState(likes)

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

    const handleLikes = (id) => { 

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
        
            const docuRef = doc(firestore, `usuarios/${email}`);

            setCurrentLike(currentLike + 1);

            updateDoc( docuRef, {  posts: [...arrayUpdatedLiked(infoUserPosts,id)]  } ); 

        }
        fetchInfo();
    
    //----------------------------------------------------------------------------------
    // Manejo para agregar ese post likeado a la lista de Favorites del usuario logueado

        // 1. identificar el id del post likeado
        // console.log("id del post:",id)
        // console.log("correo de usuario de ese post:",email);

        // 2. obtener la informacion de ese post likeado (segun el id y el correo del usuario perteneciente a ese post) 
        const fetchInfo2 = async () => {

            //funcion para sleccionar unicamente el objeto que se dio like
            function objectLiked (array,id){
                const obj = array.filter((objeto)=> objeto.id === id)
            return obj
            }

            async function updateFavorites() {

                const dataCollection = await getDocs(collection(firestore, "usuarios"));

                const infoUser = await bringInfoUserFirebase(dataGlobalUser.email);
                const infoUserFavorites = infoUser.favorites
        
                const docuRef = doc(firestore, `usuarios/${dataGlobalUser.email}`);
        
                const arrayAllPost = [];
        
                dataCollection.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.data().posts);
                    arrayAllPost.push(...doc.data().posts);
                });
        
                // console.log("arrayAllPOst");
                // console.log(arrayAllPost);

                const objLiked = objectLiked(arrayAllPost,id);
                // console.log("objeto dado like:")
                // console.log(objLiked)

                updateDoc( docuRef, {  favorites: [...infoUserFavorites,...objLiked] } ); 

            }
            updateFavorites(); 
        }
        fetchInfo2();
    };


//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
    const handleDelete = (id) => {
        // console.log("Delete id",id);

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

            const newArray = infoUserPosts.filter((objeto)=> objeto.id !== id)
        
            const docuRef = doc(firestore, `usuarios/${email}`);

            updateDoc( docuRef, {  posts: [...newArray]  } ); 
        }
        fetchInfo();
    };

//----------------------------------------------------------------------------------
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
