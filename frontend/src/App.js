// frontend/src/App.js

import React from 'react';
import AuthForm from './components/AuthForm';
import GroupTab from './components/GroupTab';

const App = () => {
    return (
        <div className="App">
            <AuthForm />
            <GroupTab />
        </div>
    );
};

export default App;
