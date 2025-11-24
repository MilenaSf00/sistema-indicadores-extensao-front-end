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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/ajuda">Ajuda</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
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
