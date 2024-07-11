
import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'; // Adjust the path based on your directory structure
import search_icon from '../../assets/search_icon.png'; // Ensure this path is correct


const Navbar = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className='Navbar'>
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />
  
      <div className="search-bar">
        <img src={search_icon} alt="Search Icon" className="navbar-search-icon" />
        <input type="text" placeholder="Search for restaurants and food" />
      </div>
    </div>
  );
}

export default Navbar;
