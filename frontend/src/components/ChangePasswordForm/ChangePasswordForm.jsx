import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ unique_id }) => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);

    const handleChangePasswordForm = async (event) => {
        event.preventDefault();
        setError('');
        
        if (newPassword !== repeatPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${BASE_URL}/api/v1/jwt/auth/change/password/${unique_id}`,
                {
                    new_password: newPassword,
                    new_password_repeat: repeatPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            window.location.href = '/login';
        } catch (error) {
            console.log(error.response.data);
            setError('Ошибка при изменении пароля. Попробуйте ещё раз.');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa' // Light background color
    };

    const formBoxStyle = {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const alertStyle = {
        marginBottom: '15px',
        color: '#dc3545', // Bootstrap danger color
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        padding: '10px',
        borderRadius: '5px'
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleChangePasswordForm} style={formBoxStyle}>
                <h3 className="h4 text-black mb-4">Change password</h3>
                {error && <div style={alertStyle}>{error}</div>}
                <div className="form-group">
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="repeat-password">Repeat Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={loading} className="btn btn-primary btn-pill">
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
