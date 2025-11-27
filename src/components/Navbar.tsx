import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Navbar.css';
import logo from '../assets/LogoProec.png';


const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">

      <Link to="/">
        <img src={logo} alt="UNIPAMPA Logo" className="navbar-logo" />
      </Link>


      <ul className="navbar-links">
        <li>
          <Link to="/">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
              <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
              <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="currentColor" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/sobre">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
              <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
            </svg>
            Sobre
          </Link>
        </li>
        <li>
          <Link to="/ajuda">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
              <path d="M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor" />
            </svg>
            Ajuda
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/upload">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
                <path d="M9 16H15V10H19L12 3L5 10H9V16ZM5 18H19V20H5V18Z" fill="currentColor" />
              </svg>
              Upload
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="navbar-auth-button">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="navbar-auth-button">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
