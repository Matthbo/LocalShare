import React from 'react';
import logo from '../logo.svg';

export default function Home(){
    return (
        <section>
            <h2>Home</h2>

            <img src={logo} alt="logo" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "30%" }} />
        </section>
    )
}