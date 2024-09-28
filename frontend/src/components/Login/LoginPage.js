import React from 'react';
import './Login.css';
import Login from './Login';


const LoginPage = ({ setIsAuthenticated }) => {
    return (
        <div>
            <Login setIsAuthenticated={setIsAuthenticated} />
        </div>
    );
};

export default LoginPage;
