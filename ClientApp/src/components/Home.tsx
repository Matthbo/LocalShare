import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create as createSession } from '../api/session';
import logo from '../logo.svg';

export default function Home(){
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const btnStyle = {
        display: "block",
        width: "500px",
        height: "100px",
        margin: "16px 0",
        fontSize: "28px",
        cursor: "pointer"
    }

    const logoStyle = {
        position: "absolute" as "absolute", // good shit typechecking
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%"
    }

    return (
        <section>
            <h2>Home</h2>

            <button
                style={btnStyle}
                disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    createSession().then(session => history.push(`/session/${session.code}`));
                }}
            >
                Create a new session
            </button>

            <button 
                style={btnStyle}
                disabled={isLoading}
                onClick={() => history.push("/session")}
            >
                Join session
            </button>

            <img src={logo} alt="logo" style={logoStyle} />
        </section>
    )
}