import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASSWORD 
  }
});

export const sendResetPasswordEmail = (email, token, callback) => {
  const mailOptions = {
    from: process.env.SMTP_USER, // sender address
    to: email, //receiver
    subject: 'Password Reset Request',
    text: `To reset your password, click the link: https://skill-spectrum.onrender.com//reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
       console.error('Error sending email:', error);
      return callback(error); // invoke callback with error
    }
    console.log('Email sent:', info.response);
    return callback(null);

  });
};
