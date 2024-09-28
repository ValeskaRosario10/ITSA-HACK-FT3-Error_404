// frontend/src/App.js

import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupTab from './components/GroupTab/GroupTab';
import GroupView from './components/GroupTab/GroupView';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import SidebarPage from './components/Sidebar/SidebarPage';

import Dashboard from './components/Dashboard/Dashboard'; // Dashboard component after login

const App = () => {
    const [groups, setGroups] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false
  
    useEffect(() => {
      console.log('Authentication state changed:', isAuthenticated);
    }, [isAuthenticated]);
  
    return (
<<<<<<< HEAD
        <div className="App">
<<<<<<< HEAD
            {/* <AuthForm /> */}
            {/* <GroupTab /> */}
            <LoginPage />
            {/* <Router>
                <Routes>
                    <Route path="/" element={<GroupTab groups={groups} setGroups={setGroups} />} />
                    <Route path="/group/:groupName" element={<GroupView groups={groups} setGroups={setGroups} />} />
                </Routes>
            </Router> */}
=======
            {/* <LoginPage /> */}
            <SidebarPage />
            
          
>>>>>>> 255fd4372c802b3b7f04aa7f6a41aa425a927941
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