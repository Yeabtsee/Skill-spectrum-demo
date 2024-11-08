// controllers/passwordController.js

import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const verifyResetToken = async (req, res) => {
  const { token } = req.params;
  
  try {
    const query = `SELECT * FROM users WHERE resetPasswordToken = ? `;
    const [results] = await db.promise().query(query, [token]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    res.status(200).json({ message: 'Valid token' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePassword = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
   
  
    const query = `SELECT * FROM users WHERE resetPasswordToken = ? `;
  
    db.query(query, [token], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
  
      if (results.length === 0) {
        console.log(results)
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
     
  
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res.status(500).json({ message: 'Server error' });
        }
  
        const updateQuery = `UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE resetPasswordToken = ?`;
        
        db.query(updateQuery, [hashedPassword, token], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Server error' });
          }
  
          res.status(200).json({ message: 'Password updated successfully' });
        });
      });
    });
  };

export const sendResetEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const [user] = await db.promise().query(`SELECT * FROM users WHERE email = ?`, [email]);
      if (user.length === 0) {
        return res.status(400).json({ message: 'User with this email does not exist' });
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      const expireTime = new Date(Date.now() + 3600000); // 1 hour from now
  
      await db.promise().query(
        `UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?`,
        [token, expireTime, email]
      );
  
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      await sendEmail(email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
  
      res.status(200).json({ message: 'Reset link sent' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending reset link' });
    }
  };
