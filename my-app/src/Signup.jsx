import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Account created successfully! Redirecting to login...");
    // Redirect to login after successful signup
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="body-wrapper">
      <div className="signup-container">
        <div className="header-design"></div>

        <h1 className="signup-title">Sign up</h1>

      <form onSubmit={handleSubmit} id="signup-form">
        <div className="input-group-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group stacked">
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group stacked">
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group stacked">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirmation pass"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <p className="resend-option">
          <a href="#">resend opt!</a>
        </p>

        <button type="submit" className="btn-confirm">
          confirm
        </button>
      </form>

      <p className="login-prompt">
        do not you have account? <Link to="/login" className="login-link">login!</Link>
      </p>
    </div>
    </div>
  );
}

export default Signup;