import React, { useState, useEffect } from 'react';

import axios from 'axios';

const ForgotPasswordFormEN = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);    

    const handleForgotPasswordForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(
                `${BASE_URL}/api/v1/jwt/auth/forgot/password/?email=${email}`
            );
            setMessage("Check your email for the reset link");
        } catch(error) {
            if (error.response) {
                setMessage('Error: ' + 'Something went Wrong');
            } else {
                setMessage('Network error. Please try again later.');
            }
        } finally {
            setLoading(false);
        }


    }

    return (
        <form onSubmit={handleForgotPasswordForm} className="form-box">
            <h3 className="h4 text-black mb-4">Enter your email address to receive an email with further instructions</h3>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
            <button type="submit" disabled={loading} className="btn btn-primary btn-pill">
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {message && <p>{message}</p>}
            </div>
        </form>
    );
};

export default ForgotPasswordFormEN;