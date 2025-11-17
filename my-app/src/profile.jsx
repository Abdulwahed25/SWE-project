import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Mohammed Abdullah",
    phone: "+966 500 050 055",
    email: "mohammed@kfupm.edu.sa",
    gender: "Male",
    dob: "2003-05-11" // YYYY-MM-DD for date input
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleEditClick = () => {
    setFormData({ ...userData });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setUserData({ ...formData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('input-', '')]: value
    }));
  };

  const formatDateForDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="profile-container">
      <div className="page-header">
        <a href="/dashboard" className="back-arrow"> &lt; </a>
      </div>

      <h1 className="profile-heading">Personal Information</h1>

      {/* DISPLAY MODE */}
      {!isEditing && (
        <div id="display-mode" className="profile-card">
          <ul className="info-list">
            <li className="info-item">
              <div className="info-label-group">
                <span className="item-icon">👤</span>
                <span className="info-label">Name</span>
              </div>
              <div className="info-value" id="display-name">{userData.name}</div>
              <span className="action-arrow">&gt;</span>
            </li>

            <li className="info-item">
              <div className="info-label-group">
                <span className="item-icon">📞</span>
                <span className="info-label">Phone Number</span>
              </div>
              <div className="info-value" id="display-phone">{userData.phone}</div>
              <span className="action-arrow">&gt;</span>
            </li>

            <li className="info-item">
              <div className="info-label-group">
                <span className="item-icon">📧</span>
                <span className="info-label">Email</span>
              </div>
              <div className="info-value" id="display-email">{userData.email}</div>
              <span className="action-arrow">&gt;</span>
            </li>

            <li className="info-item action-link">
              <div className="info-label-group">
                <span className="item-icon">🔒</span>
                <span className="info-label">Change your password</span>
              </div>
              <span className="info-value action-arrow">&gt;</span>
            </li>

            <li className="info-item">
              <div className="info-label-group">
                <span className="item-icon">♂️/♀️</span>
                <span className="info-label">Gender</span>
              </div>
              <div className="info-value" id="display-gender">{userData.gender}</div>
              <span className="action-arrow">&gt;</span>
            </li>

            <li className="info-item">
              <div className="info-label-group">
                <span className="item-icon">🎂</span>
                <span className="info-label">Date of birth</span>
              </div>
              <div className="info-value" id="display-dob">{formatDateForDisplay(userData.dob)}</div>
              <span className="action-arrow">&gt;</span>
            </li>
          </ul>

          <button id="edit-btn" className="btn-primary" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <form id="edit-profile-form" className="profile-card" onSubmit={handleSaveProfile}>
          <div className="form-input-group">
            <label htmlFor="input-name">Name</label>
            <input
              type="text"
              id="input-name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="input-phone">Phone Number</label>
            <input
              type="tel"
              id="input-phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="input-gender">Gender</label>
            <select id="input-gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-input-group">
            <label htmlFor="input-dob">Date of Birth</label>
            <input
              type="date"
              id="input-dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            id="cancel-btn"
            className="btn-primary"
            style={{ backgroundColor: '#ff4d4d', marginTop: '10px' }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;