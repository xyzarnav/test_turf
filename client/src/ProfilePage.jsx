import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('UserID');
            if (!userId) {
                setError('User ID not found in localStorage');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setUserData(data);
                localStorage.setItem('UserEmail', data.Email);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const handleBookingsClick = () => {
        navigate('/bookings');
    };

    return (
        <div>
            <Navbar />
            <div className='navmistake'></div>
            <div className="profile-container">
                <h1>User Profile</h1>
                {userData && (
                    <div className="user-data">
                        <p><strong>Name:</strong> {userData.FullName}</p>
                        <p><strong>Email:</strong> {userData.Email}</p>
                        <p><strong>Date of Birth:</strong> {userData.DateOfBirth}</p>
                        <p><strong>Gender:</strong> {userData.Gender}</p>
                    </div>
                )}
                <button className="bookings-button" onClick={handleBookingsClick}>View Bookings</button>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
