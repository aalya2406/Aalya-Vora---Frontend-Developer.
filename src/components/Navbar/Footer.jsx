import React from 'react';
import './Footer.css'; // Adjust the path based on your project structure
import download from '../../assets/download.jpg'; // Adjust the path based on your directory structure

const Footer = () => {
  return (
    <footer className="footer">
      <img src={download} alt="Footer Image" className="footer-image" />
      <p>&copy; 2023 Bundi Tecnhologies Pvt Ltd</p>
    </footer>
  );
};

export default Footer;
