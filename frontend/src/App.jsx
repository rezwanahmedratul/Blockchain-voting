import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages (to be implemented)
import Login from './pages/Login';
import Register from './pages/Register';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
            <Route path="/vote" element={<VotePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={
            <div className="flex-center" style={{height: '60vh'}}>
              <h2>404 - Page Not Found</h2>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
