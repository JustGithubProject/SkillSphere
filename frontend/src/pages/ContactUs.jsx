import React, { useState } from 'react';
import axios from 'axios'; 
import './css/ContactUs.css';
import Header from '../components/CoursesPageComponents/Header/Header';

const ContactUs = () => {
    const [theme, setTheme] = useState('light');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const switchTheme = (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light');
        }
    };

    const validateAndRequestToCreateContactUs = async (e) => {
        e.preventDefault();

        if (name.length < 3) {
            setError('Your name should be at least 3 characters long.');
            return false;
        }

        if (!(email.includes('.') && email.includes('@')) || !emailIsValid(email)) {
            setError('Please enter a valid email address.');
            return false;
        }

        if (message.length < 5) {
            setError('Please write a longer message.');
            return false;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/v1/contactus", 
            {
                full_name: name,
                email: email,
                message: message
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSuccess('Thank you! I will get back to you as soon as possible.');
            setError('');
            setTimeout(() => {
                setSuccess('');
                setName('');
                setEmail('');
                setMessage('');
            }, 6000);
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error("Error: ", error);
        }

        return true;
    };

    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
    <>
        <div className="contact-us-container">
            <div className="contact-us-left-col">
                <a href="/"><img className="contact-us-logo" src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/logo.png" alt="Logo"/></a>
            </div>
            <div className="contact-us-right-col">
                <div className="theme-switch-wrapper">
                    <label className="theme-switch" htmlFor="theme-switch-checkbox">
                        <input
                            type="checkbox"
                            id="theme-switch-checkbox"
                            checked={theme === 'dark'}
                            onChange={switchTheme}
                        />
                        <div className="theme-switch-slider round"></div>
                    </label>
                    <div className="contact-us-description">Dark Mode</div>
                </div>

                <h1 className="contact-us-header">Contact us</h1>
                <p className="contact-us-paragraph">Planning to visit Indonesia soon? Get insider tips on where to go, things to do, and find the best deals for your next adventure.</p>

                <form id="contact-form" onSubmit={validateAndRequestToCreateContactUs} className="contact-us-form">
                    <label htmlFor="name" className="contact-us-label">Full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="email" className="contact-us-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="message" className="contact-us-label">Message</label>
                    <textarea
                        rows="6"
                        placeholder="Your Message"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="contact-us-textarea"
                    ></textarea>
                    <button type="submit" id="submit" name="submit" className="contact-us-button">Send</button>
                </form>
                {error && <div className="contact-us-error">{error}</div>}
                {success && <div className="contact-us-success-msg">{success}</div>}
            </div>
        </div>
    </>
    );
};

export default ContactUs;
