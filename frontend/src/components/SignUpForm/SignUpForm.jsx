import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/signup/', {
        email: email,
        username: username,
        password_hash: password,
        first_name: firstName,
        last_name: lastName
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
       }
      );

      console.log('User created successfully:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <h3 className="h4 text-black mb-4">Sign Up</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
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
          type="text"
          className="form-control"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
      <div className="form-group mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Re-type Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary btn-pill"
          value="Sign up"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
