import React, { useEffect, useState } from 'react';
import './loginSignUp.css';

const LoginSignUp = () => {
    const [action, setAction] = useState("Login");
    const [data, setData] = useState(null);

    // Form fields
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');  // Feedback message for success or error

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then((response) => response.json())
            .then((data) => setData(data.message))
            .catch((error) => console.error('Error:', error));
    }, []);

    // Reset form fields and switch action between Login and Sign Up
    const switchAction = (newAction) => {
        setAction(newAction);
        setName('');
        setNumber('');
        setEmail('');
        setPassword('');
        setFeedback(''); // Clear feedback message
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, number, email, password };
        
        // Choose API endpoint based on action
        const apiUrl = action === "Sign Up" 
            ? 'http://127.0.0.1:8000/api/v1/auth/signup' 
            : 'http://127.0.0.1:8000/api/v1/auth/signin';

        // Send data to the backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setFeedback('Success!');
            } else {
                setFeedback(`Error: ${data.message}`);
            }
        })
        .catch((error) => {
            setFeedback('Error: Unable to connect');
        });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                {action === "Sign Up" && (
                    <div className="inputs">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Your name"
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input 
                                type="number" 
                                placeholder="Number"
                                value={number} 
                                onChange={(e) => setNumber(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input 
                            type="password" 
                            placeholder="Your password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="submit-container">
                    <button 
                        type="button" 
                        className={action === "Sign Up" ? "submit green" : "submit"} 
                        onClick={() => switchAction("Sign Up")}
                    >
                        Sign Up
                    </button>
                    <button 
                        type="button" 
                        className={action === "Login" ? "submit green" : "submit"} 
                        onClick={() => switchAction("Login")}
                    >
                        Login
                    </button>
                    <button type="submit" className="submit">Submit</button>
                </div>

                {/* Display feedback message */}
                {feedback && <p className="feedback">{feedback}</p>}
            </form>
        </div>
    );
};

export default LoginSignUp;
