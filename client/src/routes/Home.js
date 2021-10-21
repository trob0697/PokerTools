import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function Home(){
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseText/*, setResponseText*/] = useState("")

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
                <div className="box">

                    <div className="box-container">
                        <div className="login-register">
                            <h1 className={isLogin ? "selected" : "not-selected"} onClick={() => setIsLogin(true)}>Login</h1>
                            <h1 className={!isLogin ? "selected" : "not-selected"} onClick={() => setIsLogin(false)}>Register</h1>
                        </div>
                        {isLogin ?
                        <div style={{width: "100%"}}>
                            <Form className="form-group">
                                <FormControl className="form-item" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Button className="form-item" variant="danger">Login</Button>
                            </Form>
                        </div>
                        :
                        <div>
                            <Form className="form-group">
                                <FormControl className="form-item" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <FormControl className="form-item" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <Button className="form-item" variant="danger">Create Account</Button>
                            </Form>
                        </div>
                        }
                        <h5 style={{margin: "1em"}}>{responseText}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;