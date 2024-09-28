

// UnstyledTabsRouting.js
import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import EditProfile from './EditProfile';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Delete from './Delete';

// Example Components
function Inbox() {
  const { id } = useParams();
  return <div>Inbox Item ID: {id}</div>;
}

function Drafts() {
  return <div>Drafts Section</div>;
}

function Trash() {
  return <div>Trash Section</div>;
}

const blue = {
  400: '#66B2FF',
  500: '#3399FF',
  600: '#0072E5',
};

const grey = {
  500: '#9DA8B7',
  900: '#1C2025',
};

const RouteDisplay = styled('p')`
  font-size: 0.75rem;
  color: ${grey[500]};
`;

export default function ProfilePage() {
  return (
    <Router>
      <div>
        <MyTabs />
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/changepwd" element={<ChangePassword />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="*" element={<RouteDisplay>Page Not Found</RouteDisplay>} />
        </Routes>
      </div>
    </Router>
  );
}

function MyTabs() {
  const location = useLocation();

  const currentTab = (() => {
    if (location.pathname.startsWith('/profile/')) return `/profile/:id`;
    if (location.pathname === '/editprofile') return '/editprofile';
    if (location.pathname === '/changepwd') return '/changepwd';
    if (location.pathname === '/delete') return '/delete';
    return false;
  })();

  return (
    <Tabs value={currentTab} aria-label="Navigation Tabs" centered>
      <Tab
        label="Profile"
        value="/profile/:id"
        component={Link}
        to="/profile/1" // Change '1' dynamically as needed
      />
      <Tab
        label="Edit Profile"
        value="/editprofile"
        component={Link}
        to="/editprofile"
      />
      <Tab
        label="Change Password"
        value="/changepwd"
        component={Link}
        to="/changepwd"
      />
       <Tab
        label="Delete"
        value="/delete"
        component={Link}
        to="/delete"
      />
    </Tabs>
  );
}

