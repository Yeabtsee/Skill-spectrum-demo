import express from 'express';
import db from '../config/db.js';


const contactsRoute = express.Router();

// POST route to save contact form data
contactsRoute.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Validate that all fields are provided
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // Insert into database
    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error inserting contact data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Contact form submitted successfully' });
    });
});

export default contactsRoute;
