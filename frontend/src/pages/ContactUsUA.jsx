import React, { useState } from 'react';
import axios from 'axios'; 
import './css/ContactUs.css';

const ContactUsUA = () => {
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
            setError('Ваше ім’я повинно містити принаймні 3 символи.');
            return false;
        }

        if (!(email.includes('.') && email.includes('@')) || !emailIsValid(email)) {
            setError('Будь ласка, введіть дійсну адресу електронної пошти.');
            return false;
        }

        if (message.length < 5) {
            setError('Будь ласка, напишіть довше повідомлення.');
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
            setSuccess('Дякуємо! Я зв’яжуся з вами якомога швидше.');
            setError('');
            setTimeout(() => {
                setSuccess('');
                setName('');
                setEmail('');
                setMessage('');
            }, 6000);
        } catch (error) {
            setError('Сталася помилка. Будь ласка, спробуйте пізніше.');
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
                <a href="/"><img className="contact-us-logo" src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/logo.png" alt="Логотип"/></a>
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
                    <div className="contact-us-description">Темний режим</div>
                </div>

                <h1 className="contact-us-header">Зв'яжіться з нами</h1>
                <p className="contact-us-paragraph">Плануєте відвідати Індонезію найближчим часом? Отримайте інсайдерські поради щодо того, куди поїхати, що робити і знайдіть найкращі пропозиції для вашої наступної пригоди.</p>

                <form id="contact-form" onSubmit={validateAndRequestToCreateContactUs} className="contact-us-form">
                    <label htmlFor="name" className="contact-us-label">Повне ім'я</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ваше повне ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="email" className="contact-us-label">Адреса електронної пошти</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ваша електронна адреса"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="contact-us-input"
                    />
                    <label htmlFor="message" className="contact-us-label">Повідомлення</label>
                    <textarea
                        rows="6"
                        placeholder="Ваше повідомлення"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="contact-us-textarea"
                    ></textarea>
                    <button type="submit" id="submit" name="submit" className="contact-us-button">Відправити</button>
                </form>
                {error && <div className="contact-us-error">{error}</div>}
                {success && <div className="contact-us-success-msg">{success}</div>}
            </div>
        </div>
    </>
    );
};

export default ContactUsUA;
