import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "student@example.com" && password === "1234") {
      setMessage("✅ Login Successful! Welcome back.");
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMessage("❌ Incorrect email or password.");
    }
  };

  return (
    <div className="body-wrapper">
      <div className="login-container">
        <div className="header-design"></div>
        <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="input-group stacked">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="helper-options-row">
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <Link to="/MissingPASS" className="forgot-password-link">Forgot Password?</Link>
        </div>
        <div className="button-group">
          <button type="submit" className="btn-login">Log in</button>
          <Link to="/signup" className="btn-signup-link">
            <button type="button" className="btn-signup">Sign up</button>
          </Link>
        </div>
      </form>
      {message && <h2 className="welcome-message">{message}</h2>}
    </div>
    </div>
  );
}

export default Login;