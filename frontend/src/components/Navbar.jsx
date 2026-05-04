import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">BlockVote</Link>
      <div className="navbar-nav">
        {user ? (
          <>
            <Link to="/vote" className="nav-link">Vote</Link>
            <Link to="/results" className="nav-link">Results</Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            )}
            <button className="btn btn-secondary" onClick={handleLogout} style={{padding: '0.4rem 1rem'}}>
              Logout ({user.username})
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn" style={{padding: '0.4rem 1rem'}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
