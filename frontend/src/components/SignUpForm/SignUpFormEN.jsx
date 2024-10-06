import React, { useState } from 'react';
import axios from 'axios';

const SignUpFormEN = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('signup'); 

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
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Verification code has been sent:', response.data);
      setStep('verify');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/confirm/code/', {
        email: email,
        username: username,
        password_hash: password,
        first_name: firstName,
        last_name: lastName,
        code: verificationCode,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Verification successful:', response.data);
      window.location.href = "/login"
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      {step === 'signup' ? (
        <form onSubmit={handleSubmit} className="form-box">
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
              className="btn btn-warning btn-pill"
              value="Sign up"
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerification} className="form-box">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-warning btn-pill"
              value="Verify"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpFormEN;
