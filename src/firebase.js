// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // import the firestore database from firebase

import {
    getAuth,
    signInWithPopup,
    // signInWithRedirect,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth"; // import the auth module and google auth provider from firebase

// Your web app's Firebase configuration
//entra al archivo .env.local para ver los valores de las api keys

const firebaseConfig = {
    apiKey: "AIzaSyAqAV_vquN2xjRQ2tMn-m7LW76X8FKMEr4",
    authDomain: "prueba-firebase-camilo.firebaseapp.com",
    projectId: "prueba-firebase-camilo",
    storageBucket: "prueba-firebase-camilo.appspot.com",
    messagingSenderId: "1015919763707",
    appId: "1:1015919763707:web:dcf27869d3eebbed18505e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider(); // para loguearnos con google.

export const googlePopUp = async () =>
    await signInWithPopup(auth, googleProvider);
// export const googleRedirect = () =>  signInWithRedirect(auth, googleProvider);

// () => de esta forma para que no se ejecute a penas cargue la pagina sino luego de dar click ; exportamos para usarlo en el boton de login con google

export const logout = () => {
    // para desloguearnos
    signOut(auth);
};

export default firestore;
