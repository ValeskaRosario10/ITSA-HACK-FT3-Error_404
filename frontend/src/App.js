// frontend/src/App.js

import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupTab from './components/GroupTab/GroupTab';
import GroupView from './components/GroupTab/GroupView';
import LoginPage from './components/Login/LoginPage';

const App = () => {
    const [groups, setGroups] = useState([]);

    return (
        <div className="App">
            {/* <AuthForm /> */}
            {/* <GroupTab /> */}
            <LoginPage />
            {/* <Router>
                <Routes>
                    <Route path="/" element={<GroupTab groups={groups} setGroups={setGroups} />} />
                    <Route path="/group/:groupName" element={<GroupView groups={groups} setGroups={setGroups} />} />
                </Routes>
            </Router> */}
        </div>
    );
};

export default App;
