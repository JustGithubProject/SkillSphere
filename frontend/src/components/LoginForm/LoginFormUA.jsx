import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginFormUA = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/login/', formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          console.log("AccessToken: ", response.data.access_token);
          console.log("RefreshToken: ", response.data.refresh_token);

          const expiresInMinutes = 30;
          const minutes30 = new Date(new Date().getTime() + expiresInMinutes * 60 * 1000);

          // Встановлення токенів доступу та оновлення в кукі
          Cookies.set("access_token", response.data.access_token, {
            expires: minutes30, // 30 хвилин
            path: '/',
            secure: false,
            sameSite: 'Strict'
          });
          Cookies.set("refresh_token", response.data.refresh_token, {
            expires: 30, // 30 днів
            path: '/',
            secure: false,
            sameSite: 'Strict'
          });

          // Перенаправлення після входу
          window.location.href = "/"; 
        } catch (error) {
          console.error('Помилка входу:', error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log(credentialResponse)
            const response = await axios.get('http://localhost:8000/auth/google/callback/', {
                params: {
                    google_id_token: credentialResponse.credential,
                  },
            });
            console.log("Google data: ", response.data);
            // Встановлення токенів у кукі, якщо вони повернені сервером
            if (response.data.access_token) {
                Cookies.set("access_token", response.data.access_token, {
                    expires: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 хвилин
                    path: '/',
                    secure: false,
                    sameSite: 'Strict'
                });
            }
            if (response.data.refresh_token) {
                Cookies.set("refresh_token", response.data.refresh_token, {
                    expires: 30, // 30 днів
                    path: '/',
                    secure: false,
                    sameSite: 'Strict'
                });
            }

            // Перенаправлення після входу
            window.location.href = "/";
        } catch(error) {
            console.log("Помилка запиту", error);
        } 
    };

    const handleGoogleLoginError = (error) => {
        console.error('Помилка входу через Google:', error);
    };

    const formStyles = {
        formBox: {
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            boxSizing: 'border-box',
        },
        title: {
            marginBottom: '20px',
            color: '#333',
            textAlign: 'center',
        },
        formGroup: {
            marginBottom: '15px',
        },
        formControl: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#FF6600',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        forgotPasswordLink: {
            display: 'block',
            textAlign: 'center',
            marginTop: '10px',
            color: '#FF6600',
        }
    };

    return (
        <GoogleOAuthProvider clientId="884747836178-avi25mislrh63h9644g684pttij98au2.apps.googleusercontent.com">
            <form onSubmit={handleSubmit} style={formStyles.formBox}>
                <h3 style={formStyles.title}>Увійти</h3>
                <div style={formStyles.formGroup}>
                    <input
                        type="text"
                        style={formStyles.formControl}
                        placeholder="Ім'я користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <input
                        type="password"
                        style={formStyles.formControl}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <input
                        type="submit"
                        style={formStyles.submitButton}
                        value="Увійти"
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap={false}
                        prompt="select_account"
                    />
                    <a href="/forgot-password" style={formStyles.forgotPasswordLink}>Забули пароль</a>
                </div>
            </form>
        </GoogleOAuthProvider>
    );
};

export default LoginFormUA;
