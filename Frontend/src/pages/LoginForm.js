import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  // Import the CSS file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'student' && password === 'student') {
      navigate('/crud'); // Navigate to /crud on successful login
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="form-title">Login</h1>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input1"
            required
          />
        </div>

        <button type="submit" className="form-button1">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
