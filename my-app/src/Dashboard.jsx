import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="top-header">
        <div className="header-menu-icon">☰</div>
      </header>

      <div className="search-section">
        <p className="search-label">Search for friends</p>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="" />
        </div>
      </div>

      <main className="feature-grid">
        <Link to="/todo" className="feature-card large-card">
          Organize Tasks
        </Link>
        <Link to="/chat" className="feature-card large-card">
          Collaborate
        </Link>

        <div className="bottom-cards-container">
          <Link to="/chat" className="feature-card small-card">
            <span className="card-icon">🔍</span>
            Access Resources
          </Link>
          <Link to="/timer" className="feature-card small-card">
            <span className="card-icon">⏱️</span>
            Study timer
          </Link>
          <Link to="/todo" className="feature-card small-card schedule-card">
            <span className="card-icon">📅</span>
            Studying Schedule
          </Link>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/chat" className="nav-icon">
          <span className="icon-chat">💬</span>
        </Link>
        <Link to="/dashboard" className="nav-icon">
          <span className="icon-search">🔍</span>
        </Link>
        <Link to="/dashboard" className="nav-icon active">
          <span className="icon-home">🏠</span>
        </Link>
        <Link to="/profile" className="nav-icon">
          <span className="icon-profile">👤</span>
        </Link>
        <Link to="/dashboard" className="nav-icon">
          <span className="icon-notification">🔔</span>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;