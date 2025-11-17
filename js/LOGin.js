// ✅ React Component for Login Page
    function Login() {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [message, setMessage] = React.useState('');

      const handleSubmit = (event) => {
        event.preventDefault();

        if (email === "student@example.com" && password === "1234") {
          setMessage("✅ Login Successful! Welcome back.");
        } else {
          setMessage("❌ Incorrect email or password.");
        }
      };

      return (
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
              <a href="/html/MissingPASS.html" className="forgot-password-link">Forgot Password?</a>
            </div>

            <div className="button-group">
              <button type="submit" className="btn-login">Log in</button>
              <a href="/html/signup.html">
                <button type="button" className="btn-signup">Sign up</button>
              </a>
            </div>
          </form>

          {message && <h2 className="welcome-message">{message}</h2>}
        </div>
      );
    }

    // ✅ Render the component to the page
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Login />);