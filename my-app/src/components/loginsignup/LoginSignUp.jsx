import React, { useState } from 'react';
import './loginSignUp.css';

const LoginSignUp = () => {

    const [action, setAction] = useState("Login");

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : 
                <div className="input">
                   <input type="name" placeholder='your name'/>
                </div>
                }
                
            </div>
            <div className="inputs">
            {action === "Login" ? <div></div> : 
                <div className="input">
                   <input type="number" placeholder='number'/>
                </div>
                }
            </div>
            <div className="inputs">
                <div className="input">
                   <input type="email" placeholder='your email'/>
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                   <input type="password" placeholder='your password'/>
                </div>
            </div>
            {action === "Sign Up"?<div></div> :
            <div className="forgetPass">Forgot Password?<span><a href="">Click Me!</a></span></div>
            }
            
            
            <div  className="submit-container">
            
            <button type="button" className={action === "Sign Up" ? "submit green":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</button>
            <button type="button" className={action === "Login" ? "submit green":"submit"} onClick={()=>{setAction("Login")}}>Login</button>
            </div>
        </div>
    );
};

export default LoginSignUp;