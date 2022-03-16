import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./pages_styles/FeedPage.css";

import fakeUser from "../assets/fake-user.png";

function FeedPage({userName,colorUser}) {
    const [currentLength, setCurrentLength] = useState(0);
    const [text, setText] = useState("");

    const handleInput = () => {
        let textElement = document.getElementById("fake-textarea");
        //console.log(textElement);
        //setText(textElement)

        let innerHTML = textElement.innerHTML;
        // setText(innerHTML)

        let innerText = textElement.innerText;
        setText(innerText.trim());

        let textContent = textElement.textContent;
        //setText(textContent)

        //----------------------------------------------------------------
        // To fix the problem when the user clicks ENTER,
        // and automatically the browser adds a <div></div> tag
        // inside the Fake TextArea Tag, so this way
        // we can count correctly the length of the text
        // inside the fake text area

        let currentLength = innerHTML.split("<div>");
        currentLength = currentLength.join("");
        currentLength = currentLength.split("</div>");
        currentLength = currentLength.join("");
        currentLength = currentLength.replace(/<br>/g, "");
        currentLength = currentLength.length;

        // Update the state of the text length
        console.log("longitud texto:", currentLength);
        setCurrentLength(currentLength);

        //-----------------------------------------------------------------

        //--------------------------------------------------------------------------------
        // To clean the text inside the fake textarea to send it correctly to firebase

        console.log("###########################################");

        console.log(" === INNER HTML ===:");
        console.log(innerHTML);

        console.log("");

        console.log("===INNER TEXT ===");

        console.log(innerText);

        console.log("");

        console.log("=== TEXT CONTENT ===");
        console.log(textContent);

        console.log("###########################################");

        //--------------------------------------------------------------------------------

        // para agregar lo que este dentro del fake texarea al real textare

        let textRealTexarea = document.querySelector("#description");
        textRealTexarea.textContent = innerText;
        console.log(textRealTexarea);

        //--------------------------------------------------------------------------------
        // if (textElement.hasChildNodes && cleanTextContent.length === 0 ) {
        //     console.log(textElement.firstChild)
        //     //textElement.removeChild(textElement.firstChild)
        // }

        //-------------------------------------------------------------------------------
    };


    console.log("======================");
    console.log("DESDE FEED");
    console.log(userName);
    console.log(colorUser);
    console.log("======================");

    return (
        <>
            <nav className="FeedPage-nav">
                <div className="FeedPage-nav-content">
                    <h2 className="nav-title-logo">
                        DEVS_<span>UNITED</span>
                    </h2>

                    <Link className="nav-user-picture-container" to="/profile-page">
                        <img
                            src={fakeUser}
                            className="nav-user-picture"
                            alt="user profile"
                        />
                    </Link>
                </div>
            </nav>

            <header className="FeedPage-header">
                <div className="FeedPage-header-content">
                    <div className="left">
                        <img
                            src={fakeUser}
                            className="header-user-picture"
                            alt="user profile"
                        />
                    </div>

                    <div className="right">
                        <div
                            contentEditable="true"
                            className="fake-textarea"
                            id="fake-textarea"
                            name="fake-textarea"
                            aria-autocomplete="list"
                            aria-controls="typeAheadDropdownWrapped-1"
                            aria-multiline="true"
                            role="textbox"
                            aria-required="true"
                            onInput={handleInput}
                        ></div>

                        <textarea id="description"></textarea>

                        <div className="lenght-container">
                            <p className="current">{currentLength}</p>
                            <p className="max">200 max.</p>
                        </div>

                        <div className="button-container">
                            <button>POST</button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="FeedPage-section">
                {/* <div>
                    <pre>{text}</pre>
                </div> */}
            </section>
        </>
    );
}

export default FeedPage;
