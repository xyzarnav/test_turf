import React, { useState } from 'react';
import { QuestionCircleFilled } from '@ant-design/icons'; // Import the QuestionCircleFilled icon
import './Contact.css'; // Import your custom CSS file
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Add logic to handle form submission (e.g., send data to server)
        
        // Reset form data
        setFormData({
            name: '',
            email: '',
            mobile: '',
            message: ''
        });
    };

    return (
        <div>
            <Navbar /> {/* Include Navbar component here */}
            <div className='navmistake'>     </div>
            <div className="contact-us-container">
                <div className="left-container">
                    <QuestionCircleFilled style={{ fontSize: '48px', marginBottom: '20px' }} /> {/* Icon */}
                    <h2 id='letstalk'>Let's Talk</h2> {/* Heading */}
                    <p> <a href='#'>bookmyturf@gmail.com</a></p> {/* Gmail Address */}
                    <p>Vivekanand College of Eng</p> {/* Physical Address */}
                    <p>+9090909090</p>
                </div>
                <div className="right-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" id="mobile" name="mobile" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} required />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} required></textarea>

                        <button type="submit" className="send-button">Send</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
        
    );
};

export default ContactUs;
