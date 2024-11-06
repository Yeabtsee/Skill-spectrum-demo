import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();


export const registerUser = async (req, res) => {
  const { username, email, password, course } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password, course) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, course], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Username or Email exists. Please change your credentials!', error: err });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username });
  });
};
export const allUsers = (req, res) => {
  const query = 'SELECT id, fullName, Uni_id, username, email, course FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error accessing the database:", err);
      return res.status(500).json({ message: 'Error accessing the database!' });
    }

    // Check if results is an array and if it has elements
    if (!Array.isArray(results) || results.length === 0) {
      return res.status(404).json({ message: 'No users found!' });
    }

    res.status(200).json({ users: results });
  });
};

