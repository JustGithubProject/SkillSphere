import React, { useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/login/', formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
           }
          );
          
          console.log("AccessToken: ", response.data.access_token);
          console.log("RefreshToken: ", response.data.refresh_token);
          

          const expiresInMinutes = 30;
          const minutes30 = new Date(new Date().getTime() + expiresInMinutes * 60 * 1000);

          // Setting access and refresh tokens to cookies
          Cookies.set(
            "access_token", response.data.access_token,
            {
              expires: minutes30, // 30 minutes
              path: '/',
              secure: false,
              sameSite: 'Strict'
            }
          );
          Cookies.set(
            "refresh_token",
            response.data.refresh_token,
            {
              expires: 30, // 30 days
              path: '/',
              secure: false,
              sameSite: 'Strict'
            }
          )
          
          // Redirect after login
          window.location.href = "https://www.youtube.com/"; // redirect to youtube (for a while)
        } catch (error) {
          console.error('Error login user:', error);
        }
      };


    return (
    <form onSubmit={handleSubmit} className="form-box">
      <h3 className="h4 text-black mb-4">Sign In</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary btn-pill"
          value="Sign in"
        />
      </div>
    </form>
    );
};

export default LoginForm;