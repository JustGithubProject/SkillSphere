import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordFormUA = () => {
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
            setMessage("Перевірте свою електронну пошту для отримання посилання на скидання пароля");
        } catch (error) {
            if (error.response) {
                setMessage('Помилка: ' + 'Щось пішло не так');
            } else {
                setMessage('Помилка мережі. Спробуйте ще раз пізніше.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleForgotPasswordForm} className="form-box">
            <h3 className="h4 text-black mb-4">Зміна пароля</h3>
            <div className="form-group">
                <label htmlFor="email">Електронна пошта:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Електронна пошта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button type="submit" disabled={loading} className="btn btn-primary btn-pill">
                    {loading ? 'Відправляється...' : 'Надіслати посилання на скидання'}
                </button>
                {message && <p>{message}</p>}
            </div>
        </form>
    );
};

export default ForgotPasswordFormUA;
