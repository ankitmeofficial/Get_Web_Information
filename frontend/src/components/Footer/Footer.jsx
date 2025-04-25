import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

         {/* Portfolio Note */}
         <div className="footer-section">
          <h2>About This Portfolio</h2>
          <p>
            Designed and developed by Ankit Kumar Singh, showcasing skills in full-stack development, UI/UX design, and branding. Let’s collaborate and build something amazing together!
          </p>
        </div>
        
        {/* Contact Information */}
        <div className="footer-section">
          <h2>Contact</h2>
          <p>Ankit Kumar Singh</p>
          <p>Email: ankitmeofficial@gmail.com</p>
          <p>Phone: +91 6203288175</p>
          <p>Bangalore, India</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h2>Follow Me</h2>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/ankit-kumar-singh-2a3a29245/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/ankitmeofficial/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/ankitmeofficial/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

       
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ankit Kumar Singh. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
