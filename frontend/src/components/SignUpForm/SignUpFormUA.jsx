import React, { useState } from 'react';
import axios from 'axios';

const SignUpFormUA = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== retypePassword) {
      alert('Паролі не збігаються');
      return;
    }

    setLoading(true);
    setError('');

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

      console.log('Код верифікації надіслано:', response.data);
      setStep('verify');
    } catch (error) {
      setError('Помилка створення користувача: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    
    setLoading(true);
    setError('');

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

      console.log('Верифікація успішна:', response.data);
      window.location.href = "/login";
    } catch (error) {
      setError('Помилка верифікації коду: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
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
    alert: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '15px',
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

  return (
    <div style={styles.formBox}>
      {error && <div style={styles.alert}>{error}</div>}
      {step === 'signup' ? (
        <form onSubmit={handleSubmit}>
          <h3 style={styles.title}>Зареєструватися</h3>
          <input
            type="text"
            style={styles.input}
            placeholder="Електронна адреса"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            style={styles.input}
            placeholder="Ім'я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            style={styles.input}
            placeholder="Ім'я"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            style={styles.input}
            placeholder="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Повторіть пароль"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
          <input
            type="submit"
            style={styles.button}
            value={loading ? 'Зачекайте...' : 'Зареєструватися'}
            disabled={loading}
          />
        </form>
      ) : (
        <form onSubmit={handleVerification}>
          <input
            type="text"
            style={styles.input}
            placeholder="Код верифікації"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <input
            type="submit"
            style={styles.button}
            value={loading ? 'Зачекайте...' : 'Верифікувати'}
            disabled={loading}
          />
        </form>
      )}
    </div>
  );
};

export default SignUpFormUA;
