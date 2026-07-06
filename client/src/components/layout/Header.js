import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaBars, FaGlobe } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg viewBox="0 0 1000 1000" height="32" width="32" fill="#FF5A5F">
            <path d="M500 0C224 0 0 224 0 500s224 500 500 500 500-224 500-500S776 0 500 0zm0 900c-221 0-400-179-400-400S279 100 500 100s400 179 400 400-179 400-400 400z"/>
          </svg>
          <span>rentals</span>
        </Link>

        <nav className="nav-center">
          <Link to="/">Places to stay</Link>
          <Link to="/experiences">Experiences</Link>
        </nav>

        <div className="nav-right">
          <Link to="/host/dashboard" className="become-host">Become a Host</Link>
          <button className="icon-btn"><FaGlobe /></button>
          
          <div className="user-menu">
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              <FaBars />
              <FaUser />
            </button>
            
            {showMenu && (
              <div className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link>
                    <Link to="/trips" onClick={() => setShowMenu(false)}>Trips</Link>
                    <Link to="/wishlists" onClick={() => setShowMenu(false)}>Wishlists</Link>
                    <Link to="/messages" onClick={() => setShowMenu(false)}>Messages</Link>
                    <hr />
                    <Link to="/host/dashboard" onClick={() => setShowMenu(false)}>Host Dashboard</Link>
                    <Link to="/host/create-listing" onClick={() => setShowMenu(false)}>List your space</Link>
                    <hr />
                    {user?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setShowMenu(false)}>Admin Panel</Link>
                    )}
                    <button onClick={handleLogout}>Log out</button>
                  </>
                ) : (
                  <>
                    <Link to="/register" onClick={() => setShowMenu(false)}>Sign up</Link>
                    <Link to="/login" onClick={() => setShowMenu(false)}>Log in</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
