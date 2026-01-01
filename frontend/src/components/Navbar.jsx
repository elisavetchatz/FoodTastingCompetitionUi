/**
 * Navbar Component
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">🍽️</span>
          <span className="navbar-title">Food Tasting Competition</span>
        </Link>

        <div className="navbar-menu">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Vote Food
          </Link>
          <Link
            to="/submit"
            className={`navbar-link ${location.pathname === '/submit' ? 'active' : ''}`}
          >
            Submit Food
          </Link>
          <Link
            to="/scores"
            className={`navbar-link ${location.pathname === '/scores' ? 'active' : ''}`}
          >
            Food Scores
          </Link>
          <Link
            to="/votes"
            className={`navbar-link ${location.pathname === '/votes' ? 'active' : ''}`}
          >
            All Votes
          </Link>
          <div className="navbar-divider"></div>
          <Link
            to="/talent-vote"
            className={`navbar-link ${location.pathname === '/talent-vote' ? 'active' : ''}`}
          >
            🌟 Talent Vote
          </Link>
          <Link
            to="/talent-scores"
            className={`navbar-link ${location.pathname === '/talent-scores' ? 'active' : ''}`}
          >
            🏆 Talent Scores
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
