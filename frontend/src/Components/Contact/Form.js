import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/contacts', formData);
            alert(response.data.message);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form after submission
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('There was an error submitting your contact form. Please try again later.');
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Contact</h5>
                    <h1>Contact For Any Query</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form bg-secondary rounded p-5">
                            <form onSubmit={handleSubmit}>
                                <div className="control-group">
                                    <input type="text" className="form-control border-0 p-4" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="control-group">
                                    <input type="email" className="form-control border-0 p-4" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="control-group">
                                    <input type="text" className="form-control border-0 p-4" id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                                </div>
                                <div className="control-group">
                                    <textarea className="form-control border-0 py-3 px-4" rows="5" id="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
