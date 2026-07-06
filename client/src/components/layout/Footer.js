import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Safety information</a>
          <a href="#">Cancellation options</a>
          <a href="#">Our COVID-19 Response</a>
        </div>
        
        <div className="footer-section">
          <h4>Community</h4>
          <a href="#">Disaster relief housing</a>
          <a href="#">Support refugees</a>
          <a href="#">Combating discrimination</a>
        </div>
        
        <div className="footer-section">
          <h4>Hosting</h4>
          <a href="#">Try hosting</a>
          <a href="#">Protection for Hosts</a>
          <a href="#">Hosting resources</a>
          <a href="#">Community forum</a>
        </div>
        
        <div className="footer-section">
          <h4>About</h4>
          <a href="#">Newsroom</a>
          <a href="#">Learn about new features</a>
          <a href="#">Letter from our founders</a>
          <a href="#">Careers</a>
          <a href="#">Investors</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Rental Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
