// routes/resetPassword.js
import express from 'express';
import db from '../config/db.js'; 
import { sendResetPasswordEmail } from '../utils/email.js'; 
import crypto from 'crypto';


const resetRoute = express.Router();

// Route to handle forgot password
resetRoute.post('/', (req, res) => {
  const { email } = req.body;
  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000);


    db.query('UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [
      token,
      resetTokenExpires.toISOString().slice(0, 19).replace('T', ' '), // 1 hour expiration
      email,
    ], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Send the email
      sendResetPasswordEmail(email, token, (error) => {
        if (error) {
          console.error('Email sending error:', error);
          return res.status(500).json({ message: 'Error sending email' });
        }
        return res.status(200).json({ message: 'Password reset email sent' });
      });
    });
  });
});




export default resetRoute;
