import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; 2024 MechAI Inc. |{' '}
          <a href="/terms-and-conditions">Terms and Conditions</a> |{' '}
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
