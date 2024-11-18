import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SignUpFormEN = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('signup'); 

  const BASE_URL = "http://vaua0078539.online-vm.com:8000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/jwt/auth/signup/`, {
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
      const response = await axios.post(`${BASE_URL}/api/v1/jwt/auth/confirm/code/`, {
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
    <div style={styles.formBox}>
      {step === 'signup' ? (
        <form onSubmit={handleSubmit}>
          <h3 style={styles.title}>Sign up</h3>
          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              style={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              style={styles.input}
              placeholder="Re-type Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="submit"
              style={styles.button}
              value="Sign up"
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerification}>
          <h3 style={styles.title}>Verify your account</h3>
          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="submit"
              style={styles.button}
              value="Verify"
            />
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
    formBox: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#FF6600',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default SignUpFormEN;
