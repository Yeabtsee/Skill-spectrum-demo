import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Assets/css/ResetPassword.css'; // External CSS file for styling

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error('Failed to reset password');
      alert('Password has been successfully changed. Please login!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password-form">
      <h2 className="form-title">Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        required
        className="form-input"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
        className="form-input"
      />
      <button type="submit" className="form-button">Reset Password</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default ResetPassword;
