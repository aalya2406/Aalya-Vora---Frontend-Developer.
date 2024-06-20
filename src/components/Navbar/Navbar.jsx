// Navbar.jsx

import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'; // Adjust the path based on your directory structure
import search_icon from '../../assets/search_icon.png'; // Ensure this path is correct

const Navbar = () => {
  const handleLogoClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <div className='Navbar'>
      <a href="/" onClick={handleLogoClick} className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <ul className="navbar-menu">
        {/* Menu items can go here */}
      </ul>
      <div className="search-bar">
        <img src={search_icon} alt="Search Icon" className="navbar-search-icon" />
        <input type="text" placeholder="Search for food..." />
      </div>
    </div>
  );
}

export default Navbar;
