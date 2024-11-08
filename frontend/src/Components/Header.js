import React, {useEffect, useState } from 'react';
import { NavLink,Link } from 'react-router-dom';
import '../Assets/css/style.css';
import '../Assets/css/header.css';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []); // Runs only once when the component mounts

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigateToSection = () => {
    if (window.location.pathname === '/'||window.location.pathname === '/about'||window.location.pathname === '/courses') {
      const section = document.querySelector('#register');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); 
      }
    } else {
      window.location.assign('/#register');
    }
  };  
  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [])
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username')
      setIsAuthenticated(false);
      window.location.reload();
    }
  };
  const adminUsers = ["YEAB", "JOSI", "ABEL"];

  return (
   
    <div className="container-fluid">
    <div className="ctn row border-top px-xl-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to='/' style={{textDecoration: 'none'}}><h2 className="brand">Skill Spectrum</h2></Link>
      <nav className="col-lg-9 navbarr navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
        <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show' : ''}`} id="navbarCollapse">
          <div className="navbar-nav py-0">
            <NavLink to="/" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
              About
            </NavLink>
            <NavLink to="/courses" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
              Courses
            </NavLink>
            <NavLink to="/teachers" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
              Teachers
            </NavLink>
            <NavLink to="/contact" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
              Contact
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/mycourse" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
                My Course
              </NavLink>
            )}
            {isAuthenticated && adminUsers.includes(username) && (
              <NavLink to="/admin" className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'black' })}>
                Admin
              </NavLink>
            )}
             
          </div>
          {isAuthenticated ? (
            <div className="logout-container">
              <span className="welcome ml-auto" style={{ fontSize: '25px', fontWeight: 'bold' }}>Welcome, {username}</span>
              <div className="logout-btn">
                <button className='log-out' onClick={handleLogout}><LogoutIcon /></button>
                <span className="tooltip">Logout</span>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block" onClick={navigateToSection}>
              Join Now
            </button>
          )}
        </div>
      </nav>
    </div>
  </div>
  
  );
};

export default Header;
