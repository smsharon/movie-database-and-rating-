import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();

  // Handle logout: remove the token from localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page or any other page as needed
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Logout;
