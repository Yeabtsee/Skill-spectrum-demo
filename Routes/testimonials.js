import express from 'express';
import db from '../config/db.js'; 

const testimonialsRoute = express.Router();

// POST endpoint for testimonials
testimonialsRoute.post('/', (req, res) => {
  const { username, testimonial } = req.body;

  if (!username || !testimonial) {
    return res.status(400).json({ message: 'Username and testimonial are required.' });
  }
  // Fetch user ID from the database using the username
  db.query('SELECT id FROM users WHERE username = ?', [username], (error, userResult) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user.' });
    }
    // Check if user exists
    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user_id = userResult[0].id;
    // Insert the testimonial into the database
    db.query('INSERT INTO testimonials (user_id, testimonial, created_at) VALUES (?, ?, NOW())', 
      [user_id, testimonial], (error, result) => {
        if (error) {
          console.error('Error saving testimonial:', error);
          return res.status(500).json({ message: 'Error saving testimonial.' });
        }
        return res.status(201).json({ 
          message: 'Testimonial submitted successfully!', 
          testimonial: { id: result.insertId, user_id, testimonial, created_at: new Date() } 
        });
    });
  });
});


// GET endpoint for fetching testimonials with usernames
testimonialsRoute.get('/', (req, res) => {
  const query = `
    SELECT t.id, t.testimonial, t.created_at, u.username 
    FROM testimonials t 
    JOIN users u ON t.user_id = u.id 
    ORDER BY t.created_at DESC 
    LIMIT 3
  `;
  
  // Execute the query using callback
  db.query(query, (error, testimonials) => {
    if (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ message: 'Error fetching testimonials.' });
    }

    // Return the testimonials with usernames
    return res.status(200).json(testimonials);
  });
});

export default testimonialsRoute;
