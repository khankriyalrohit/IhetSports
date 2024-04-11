import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Header.css'

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h4>IhetSports</h4>   
      </div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/auction">Auction</Link>
        <Link to="/match">Match</Link>
        <Link to="/highlights">Highlights</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Sign In</Link>
      </div>
      <div className="navbar__social">
        <a href="https://www.linkedin.com/in/rohit-khankriyal-359680242/" target="_blank" rel="noopener noreferrer" id = "s1">
          <FaLinkedin />
        </a>
        <a href="https://github.com/khankriyalrohit" target="_blank" rel="noopener noreferrer" id = "s2">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/khankriyal__rohit/" target="_blank" rel="noopener noreferrer" id = "s3">
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Header;
