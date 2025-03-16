import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/loginService';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm new password do not match');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Password changed successfully');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <div className={styles.buttonGroup}>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}