import React, { useState } from 'react';
import './Register.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, dateOfBirth, gender }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                // Clear input fields
                setName('');
                setEmail('');
                setPassword('');
                setDateOfBirth('');
                setGender('');

                // Display success alert
                alert('Registration successful!');

                // Redirect to login page
                navigate('/login');
            } else {
                // Display error message
                setErrorMessage('Failed to register. Please try again.');
            }
        })
        .catch(error => {
            console.log('Error registering user:', error);
            setErrorMessage('An error occurred. Please try again later.');
        });
    };

    return (
        <div className="register-page">
            <div className="login-content"> {/* Use the same class name as in the login page */}
                <div className="register-form">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <button type="submit">Register</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p>Already have an account? <a href="/">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
