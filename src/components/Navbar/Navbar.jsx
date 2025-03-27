import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'; // Adjust the path based on your directory structure
import search_icon from '../../assets/search_icon.png'; // Ensure this path is correct

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Manage search query

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { // Check if Enter key is pressed
      handleSearch(searchQuery); // Trigger search action
    }
  };

  return (
    <div className='Navbar'>
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />

      <div className="search-bar">
        <img src={search_icon} alt="Search Icon" className="navbar-search-icon" />
        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={searchQuery}
          onChange={handleInputChange} // Handle input changes
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
      </div>
    </div>
  );
}

export default Navbar;
