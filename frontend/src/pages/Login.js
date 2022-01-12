import React from "react";
import axios from 'axios'
import { useRef } from "react"

function Login() {

    const userRef = useRef()
    const passwordRef = useRef()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            localStorage.setItem('token', res.data.accessToken)
        } catch (err) {
        }
    }

    return (
        <div className="login">
            <div className="wrapper">
                <h1 className="loginTitle">SIGN IN</h1>
                <form className="loginFrom" onSubmit={handleLogin}>
                    <input placeholder="username" required ref={userRef}/>
                    <input placeholder="password" type="password" required ref={passwordRef} />
                    <button>LOGIN</button>
                    <a>DO NOT YOU REMEMBER THE PASSWORD?</a>
                    <a>CREATE AN ACCOUNT</a>
                </form>
            </div>
        </div>
    )
}

export default Login
