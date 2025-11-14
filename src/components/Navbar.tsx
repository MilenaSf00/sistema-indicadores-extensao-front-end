import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/LogoProec.png';


const Navbar: React.FC = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
