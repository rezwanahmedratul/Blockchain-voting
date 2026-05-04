import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="page-container"><h2>Loading...</h2></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If not allowed, redirect to vote/results if USER, or login
    return <Navigate to="/vote" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
