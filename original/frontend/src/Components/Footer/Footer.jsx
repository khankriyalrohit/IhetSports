import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer">
                <h1 className="footer-heading">IhetSports</h1>
                <nav className="footer-nav">
                <Link to="/"className="footer-link">Home</Link>
                <Link to="/auction"className="footer-link">Auction</Link>
                <Link to="/match"className="footer-link">Match</Link>
                <Link to="/highlights"className="footer-link">Highlights</Link>
                <Link to="/about" className="footer-link">About</Link>
                <Link to="/login"className="footer-link">Sign In</Link>
                </nav>
                <div className="social-icons">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon facebook"><FaFacebook /></a>
                    <a href="https://twitter.com/khnakriyalrohit" target="_blank" rel="noopener noreferrer" className="social-icon twitter"><FaTwitter /></a>
                    <a href="https://www.linkedin.com/in/rohit-khankriyal-359680242/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin"><FaLinkedin /></a>
                    <a href="https://www.instagram.com/khankriyal__rohit/" target="_blank" rel="noopener noreferrer" className="social-icon insta"><FaInstagram /></a>
                </div>
                <p className="footer-text">© 2024 Rohit Khnakriyal. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;
