// frontend/src/App.js

import React from 'react';
import AuthForm from './components/AuthForm';
import LoginPage from './components/Login/LoginPage';

const App = () => {
    return (
        <div className="App">
            {/* <AuthForm /> */}
            <LoginPage />
        </div>
    );
};

export default App;
