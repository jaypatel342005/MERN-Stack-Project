import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import custom CSS styles
import appleLogo from './icons8-apple.svg'; // Import the local image
import { useState } from 'react';


const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <a className="navbar-brand mx-" href="/home">
        <img
          src={appleLogo} // Use the imported image
          alt="Apple Logo"
          width="30"
          height="30"
          className="d-inline-block align-top apple-logo" // Add class for animation
        />
        
      </a>
      <button
      onClick={handleToggle}  // Trigger state change onClick
      className={`navbar-toggler ${collapsed ? 'collapsed' : ''}`} // Dynamically add 'collapsed' class
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded={!collapsed}  // Set aria-expanded based on the collapsed state
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="/product">
              Products
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="/add">
              Add
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
