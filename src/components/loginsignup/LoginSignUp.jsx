import React, { useEffect, useState } from 'react';
import './loginSignUp.css';

const LoginSignUp = () => {
    const [action, setAction] = useState("Login");
    const [data, setData] = useState(null);

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then((response) => response.json())
            .then((data) => setData(data.message))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevents the page from refreshing
        const userData = { name, number, email, password };  // Gather all input values

        const apiUrl = action === "Sign Up" 
            ? 'http://127.0.0.1:8000/api/v1/auth/signup' 
            : 'http://127.0.0.1:8000/api/v1/auth/signin';

        // Send data to the backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),  // Convert the data to JSON format
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>  {/* Wrap the inputs in a form */}
                {action === "Sign Up" && (
                    <div className="inputs">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Your name"
                                value={name} 
                                onChange={(e) => setName(e.target.value)}  // Update name state
                            />
                        </div>
                        <div className="input">
                            <input 
                                type="number" 
                                placeholder="Number"
                                value={number} 
                                onChange={(e) => setNumber(e.target.value)}  // Update number state
                            />
                        </div>
                    </div>
                )}
                <div className="inputs">
                    <div className="input">
                        <input 
                            type="email" 
                            placeholder="Your email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  // Update email state
                        />
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input 
                            type="password" 
                            placeholder="Your password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  // Update password state
                        />
                    </div>
                </div>
                {action === "Login" && (
                    <div className="forgetPass">
                        Forgot Password?<span><a href="#">Click Me!</a></span>
                    </div>
                )}
                <div className="submit-container">
                    <button type="button" className={action === "Sign Up" ? "submit green" : "submit"} onClick={() => setAction("Sign Up")}>
                        Sign Up
                    </button>
                    <button type="button" className={action === "Login" ? "submit green" : "submit"} onClick={() => setAction("Login")}>
                        Login
                    </button>
                    <button type="submit" className="submit">Submit</button> {/* Submit button */}
                </div>
            </form>
        </div>
    );
};

export default LoginSignUp;
