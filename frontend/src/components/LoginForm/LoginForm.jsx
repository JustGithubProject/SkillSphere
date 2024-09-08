import React, { useState } from 'react';

import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();     
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/login/', {
            username: username,
            password: password
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
           }
          );
    
          console.log('User login successfully:', response.data);
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