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
            Vote
          </Link>
          <Link
            to="/scores"
            className={`navbar-link ${location.pathname === '/scores' ? 'active' : ''}`}
          >
            Leaderboard
          </Link>
          <Link
            to="/votes"
            className={`navbar-link ${location.pathname === '/votes' ? 'active' : ''}`}
          >
            All Votes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
