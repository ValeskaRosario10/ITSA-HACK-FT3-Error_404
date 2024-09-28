// frontend/src/App.js

import React from 'react';
import AuthForm from './components/AuthForm';
import GroupTab from './components/GroupTab';
import LoginPage from './components/Login/LoginPage';

const App = () => {
    return (
        <div className="App">
            <AuthForm />
            <GroupTab />
            {/* <AuthForm /> */}
            <LoginPage />
        </div>
    );
};

export default App;
