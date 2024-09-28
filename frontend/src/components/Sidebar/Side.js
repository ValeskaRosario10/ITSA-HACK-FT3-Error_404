import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardPage from '../Dashboard/DashboardPage';
import ExpensePage from '../Expenses/ExpensePage';
import GroupsPage from '../Groups/GroupPage';
import ProfilePage from '../Profile/ProfilePage';


const NAVIGATION = [
 
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'expense',
    title: 'Expense',
    icon: <PointOfSaleSharpIcon />,
  },
  {
    segment: 'groups',
    title: 'Groups',
    icon: <Diversity3Icon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountCircleIcon />,
  },

];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  let content;

  switch (pathname) {
    case '/profile':
        content = <ProfilePage />;
        break;
    case '/dashboard':
      content = <DashboardPage />;
      break;
    case '/expense':
      content = <ExpensePage />;
      break;
    case '/groups':
      content = <GroupsPage />;
      break;
    default:
      content = <div>Page not found</div>;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {content}
    </Box>
  );
}


DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Side(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="media/Logo.svg" alt="MUI logo" />,
        title: 'BillSplit',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}



export default Side;
