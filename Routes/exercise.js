import multer from 'multer';
import express from 'express';
import db from '../config/db.js';
const exerciseRoute = express.Router();

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/exercises'); // Path to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  }
});
const upload = multer({ storage });

// Endpoint to handle exercise submission
exerciseRoute.post('/submit', upload.single('File'), (req, res) => {
  const { student, courseName, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const checkQuery = 'SELECT * FROM exercise_submissions WHERE student = ? AND course = ?';
  db.query(checkQuery, [student, courseName], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Database error:', checkErr); // Log the error
      return res.status(500).json({ message: 'Failed to check existing submissions.' });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'You have already submitted an exercise for this course.' });
    }

  // Convert backslashes to forward slashes in the file path
  const filePath = file.path.replace(/\\/g, '/');

  // Save exercise details to the database
  const exercise = {
    student,
    courseName,
    description,
    filePath,
    submittedAt: new Date()
  };
  // Replace with your database logic
  const query = 'INSERT INTO exercise_submissions (student, course, description, file_path, submitted_at) VALUES (?, ?, ?, ?, ?)';
    
  db.query(query, [exercise.student, exercise.courseName, exercise.description, exercise.filePath, exercise.submittedAt], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ message: 'Failed to add exercise to the database.' });
    }
    res.status(201).json({ message: `Exercise for '${exercise.courseName}' submitted successfully!`, exercise });
  });
});

});

export default exerciseRoute;