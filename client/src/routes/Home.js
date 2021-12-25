import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authorize, deauthorize } from "../redux/user";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

function Home(){
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseText, setResponseText] = useState("")

    const clearAllFields = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setResponseText("")
    }

    const onRegister = () => {
        if(password !== confirmPassword){
            setResponseText("Passwords do not match")
        }
        else{
            axios.post("/api/users/register/", {
                username: username,
                email: email,
                password: password
            })
            .then((res) => {
                setResponseText("Account created");
            })
            .catch((error) => {
                let errors = Object.entries(error.response.data);
                setResponseText(errors[0][1]);
            })
        }
    }

    const onLogin = () => {
        axios.post("/api/users/login/", {
            email: email,
            password: password
        })
        .then((res) => {
            clearAllFields();
            sessionStorage.setItem("access_token", res.data.access);
            sessionStorage.setItem("refresh_token", res.data.refresh);
            sessionStorage.setItem("isAuth", true);
            dispatch(authorize());
        })
        .catch((error) => {
            setResponseText("Login failed");
        })
    }

    const onLogout = () => {
        sessionStorage.clear();
        dispatch(deauthorize());
    }

    return(
        <div className="background">
            <div className="boxes-container">
                <div className="box" >
                    <div className="box-container">
                        <h1 className="landing-description">Tools to improve your game and beat the pool!</h1>
                        <ul className="features-list">
                            <li style={{color: "white"}}>Preflop Charts</li>
                            <li style={{color: "white"}}>Equity Calculator</li>
                            <li style={{color: "white"}}>Hand History Database</li>
                            <li style={{color: "white"}}>Win Rate Graphs</li>
                            <li style={{color: "white"}}>and more!</li>
                        </ul>
                    </div>
                </div>
                {state.user.isAuth ?
                <div className="box">
                    <div className="box-container">
                        <div style={{color: "white", fontSize: "4em"}}>Welcome</div>
                        <Button className="form-item" variant="danger" onClick={() => onLogout()}>Logout</Button>
                    </div>
                </div>
                :
                <div className="box">
                    <div className="box-container">
                        <div className="login-register">
                            <h1 className={!isLogin ? "selected" : "not-selected"} onClick={() => {clearAllFields(); setIsLogin(false);}}>Register</h1>
                            <h1 className={isLogin ? "selected" : "not-selected"} onClick={() => {clearAllFields(); setIsLogin(true);}}>Login</h1>
                        </div>
                        {isLogin ?
                        <div style={{width: "100%"}}>
                            <Form className="form-group">
                                <FormControl className="form-item" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Button className="form-item" variant="danger" onClick={() => onLogin()}>Login</Button>
                            </Form>
                        </div>
                        :
                        <div>
                            <Form className="form-group">
                                <FormControl className="form-item" type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                <FormControl className="form-item" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <Button className="form-item" variant="danger" onClick={() => onRegister()}>Create Account</Button>
                            </Form>
                        </div>
                        }
                        <h5 style={responseText !== "Account created" ? {margin: "1em", color: "red"} : {margin: "1em", color: "green"}}>{responseText}</h5>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Home;