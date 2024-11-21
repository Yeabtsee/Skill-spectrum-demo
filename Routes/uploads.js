import express from 'express';
import db from '../config/db.js';

const uploadsRoute = express.Router();


uploadsRoute.get('/uploads', async (req, res) => {
    try {
      // Query the exercise_submissions table
      const query = `
        SELECT id, student, course, description, file_path, submitted_at
        FROM exercise_submissions
        ORDER BY submitted_at DESC;
      `;
      db.query(query, (checkErr, checkResult) => {
        if (checkErr) {
          console.error('Database error:', checkErr); // Log the error
          return res.status(500).json({ message: 'Failed to fetch data.' });
        }
        else{
            res.json( {uploads: checkResult});
        }
    });
  
    
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Error fetching submissions' });
    }
  });
  export default uploadsRoute;