import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          // Save the UserID in localStorage
          localStorage.setItem('UserID', data.user.UserID);

          // Clear input fields
          setEmail('');
          setPassword('');

          // Display success alert
          alert('Login successful!');

          // Redirect to home page
          navigate('/home');
        } else {
          // Display error message
          setErrorMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
