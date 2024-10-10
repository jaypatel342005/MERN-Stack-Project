import React from 'react';
import "./Navbar.css"; 

const Footer = () => {
  return (
    <footer className=" text-light py-3">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <span className="copyright">
          &copy; 2024 Jay Patel. All rights reserved.
        </span>
       
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a href="#privacy" className="text-light">
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#terms" className="text-light">
              Terms of Use
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#sales" className="text-light">
              Sales and Refunds
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#legal" className="text-light">
              Legal
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#sitemap" className="text-light">
              Site Map
            </a>
          </li>
        </ul>
        <span>INDIA</span>
      </div>
    </footer>
  );
};

export default Footer;
