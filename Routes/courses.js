// routes/courses.js
import express from 'express';
import db from '../config/db.js';


const coursesRoute = express.Router();

coursesRoute.get('/', async (req, res) => {
  const query = 'SELECT * FROM courses';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching courses:', err);
          res.status(500).json({ error: 'Failed to fetch courses' });
      } else {
          res.json(results);
      }
  });
  });
export default coursesRoute;
