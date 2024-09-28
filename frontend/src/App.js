// frontend/src/App.js

import React from 'react';
import AuthForm from './components/AuthForm';
import LoginPage from './components/Login/LoginPage';
import SidebarPage from './components/Sidebar/SidebarPage';


const App = () => {
    return (
        <div className="App">
            {/* <LoginPage /> */}
            <SidebarPage />
            
          
        </div>
    );
};

export default App;
