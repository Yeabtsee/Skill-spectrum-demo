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
          res.json({courses: results});
      }
  });
  });

 // function to add a course to the database
 coursesRoute.post('/', async (req, res) => {
    const { name, description, imagePath } = req.body; 
    const query = 'INSERT INTO courses (course_name,course_description,image_path) VALUES (?,?,?)';
    
    db.query(query, [ name, description, imagePath], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to add course to the database.' });
      }
      res.status(201).json({ message: `Course '${name}' added successfully!` });
    });
  });
   
export default coursesRoute;
