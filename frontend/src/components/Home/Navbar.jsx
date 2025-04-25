import React from 'react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import './Navbar.css'; // Create this CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="home" smooth={true} duration={500}>Home</Link></li>

        <li className="dropdown">
          <Link to="latest-insights" smooth={true} duration={500}>Latest Insights</Link>
          <ul className="dropdown-content">
            <li><Link to="blogs" smooth={true} duration={500}>Blogs</Link></li>
            <li><Link to="videos" smooth={true} duration={500}>Videos</Link></li>
          </ul>
          
        </li>
        <li><Link to="case-studies" smooth={true} duration={500}>Case Studies</Link></li>
        <li><Link to="services" smooth={true} duration={500}>Services</Link></li>
        <li><Link to="about-us" smooth={true} duration={500}>About Us</Link></li>
        <li><Link to="contact-us" smooth={true} duration={500}>Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
