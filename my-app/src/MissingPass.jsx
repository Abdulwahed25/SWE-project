import React, { useState } from 'react';

function MissingPASS() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Reset link sent! Check your email.');
    // Add your password reset logic here
  };

  return (
    <div className="body-wrapper">
      <div className="signup-container">
        <div className="header-design"></div>

        <h1 className="signup-title">Reset Password</h1>

      <form onSubmit={handleSubmit} id="reset-password-form">
        <p className="reset-instruction-text">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <div className="input-group stacked">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-confirm">
          Send Reset Link
        </button>

        {message && <p className="success-message">{message}</p>}

        <p className="login-prompt">
          Remember your password? <a href="/login" className="login-link">Log in</a>
        </p>
      </form>
    </div>
    </div>
  );
}

export default MissingPASS;