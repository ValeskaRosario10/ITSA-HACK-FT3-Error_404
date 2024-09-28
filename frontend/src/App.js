import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
<<<<<<< HEAD
import SidebarPage from './components/Sidebar/SidebarPage';

=======
import Dashboard from './components/Dashboard/Dashboard'; // Dashboard component after login
>>>>>>> 6bd48acbef4dc25eb96b2a0cc0a1ddc009dd71ab

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false
  
    useEffect(() => {
      console.log('Authentication state changed:', isAuthenticated);
    }, [isAuthenticated]);
  
    return (
<<<<<<< HEAD
        <div className="App">
            {/* <LoginPage /> */}
            <SidebarPage />
            
          
        </div>
=======
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
>>>>>>> 6bd48acbef4dc25eb96b2a0cc0a1ddc009dd71ab
    );
  };
  
  export default App;