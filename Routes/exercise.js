import multer from 'multer';
import express from 'express';
import db from '../config/db.js';
const exerciseRoute = express.Router();

// Configure multer storage to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle exercise submission
exerciseRoute.post('/submit', upload.single('File'), (req, res) => {
  const { student, courseName, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const fileName = file.originalname;
  const fileData = file.buffer;

  const checkQuery = 'SELECT * FROM exercise_submissions WHERE student = ? AND course = ? AND file_name=?';
  db.query(checkQuery, [student, courseName, fileName], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Database error:', checkErr); // Log the error
      return res.status(500).json({ message: 'Failed to check existing submissions.' });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'You have already submitted an exercise for this course.' });
    }

    // Save exercise details to the database
    const exercise = {
      student,
      courseName,
      description,
      fileName,
      fileData,
      submittedAt: new Date()
    };

    const query = 'INSERT INTO exercise_submissions (student, course, description, file_name, file_data, submitted_at) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [exercise.student, exercise.courseName, exercise.description, exercise.fileName, exercise.fileData, exercise.submittedAt], (err, result) => {
      if (err) {
        console.error('Database error:', err); // Log the error
        return res.status(500).json({ message: 'Failed to add exercise to the database.' });
      }
      res.status(201).json({ message: `Exercise for '${exercise.courseName}' submitted successfully!`, exercise });
    });
  });
});

export default exerciseRoute;