import React, { useState, useRef } from 'react';
import './css/ContactUs.css'; 

const ContactUs = () => {
    const [theme, setTheme] = useState('light');
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const errorRef = useRef(null);
    const successRef = useRef(null);

    const switchTheme = (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light');
        }
    };

    const validate = (e) => {
        e.preventDefault();
        
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        if (name.length < 3) {
            errorRef.current.innerHTML = 'Your name should be at least 3 characters long.';
            return false;
        }

        if (!(email.includes('.') && email.includes('@'))) {
            errorRef.current.innerHTML = 'Please enter a valid email address.';
            return false;
        }

        if (!emailIsValid(email)) {
            errorRef.current.innerHTML = 'Please enter a valid email address.';
            return false;
        }

        if (message.length < 15) {
            errorRef.current.innerHTML = 'Please write a longer message.';
            return false;
        }

        errorRef.current.innerHTML = '';
        successRef.current.innerHTML = 'Thank you! I will get back to you as soon as possible.';

        setTimeout(() => {
            successRef.current.innerHTML = '';
            e.target.reset();
        }, 6000);

        return true;
    };

    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="contact-us-container">
            <div className="contact-us-left-col">
                <img className="contact-us-logo" src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/logo.png" alt="Logo"/>
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

                <form id="contact-form" onSubmit={validate} className="contact-us-form">
                    <label htmlFor="name" className="contact-us-label">Full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        ref={nameRef}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="email" className="contact-us-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email Address"
                        ref={emailRef}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="message" className="contact-us-label">Message</label>
                    <textarea
                        rows="6"
                        placeholder="Your Message"
                        id="message"
                        name="message"
                        ref={messageRef}
                        required
                        className="contact-us-textarea"
                    ></textarea>
                    <button type="submit" id="submit" name="submit" className="contact-us-button">Send</button>
                </form>
                <div ref={errorRef} className="contact-us-error"></div>
                <div ref={successRef} className="contact-us-success-msg"></div>
            </div>
        </div>
    );
};

export default ContactUs;
