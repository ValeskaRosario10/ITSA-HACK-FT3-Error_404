import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard/Dashboard'; // Dashboard component after login

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false
  
    useEffect(() => {
      console.log('Authentication state changed:', isAuthenticated);
    }, [isAuthenticated]);
  
    return (
      <Routes>
        {/* Route for Login Page */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
  
        {/* Route for Dashboard */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
  
        {/* Fallback to Login if route not found */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    );
  };
  
  export default App;