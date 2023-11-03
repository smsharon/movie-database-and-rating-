import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link to="/addMovie">Add Movie</Link>
        </li>
        <li className="nav-item">
          <Link to="/Login">Login
          Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
