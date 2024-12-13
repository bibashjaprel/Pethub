import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { isAuthenticated, getUser, clearToken } from '../utils/authHelpers';
import { getAdoptionRequests } from '../utils/apiHelpers';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const user = getUser();
  const role = user?.role;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [menuItems, setMenuItems] = useState([]);
  const [adoptionRequestsCount, setAdoptionRequestsCount] = useState(0);

  // Fetch adoption requests count for admin role
  const fetchAdoptionRequests = () => {
    if (role === 'admin') {
      getAdoptionRequests()
        .then((data) => setAdoptionRequestsCount(data.length))
        .catch((err) => console.error('Failed to fetch adoption requests:', err));
    }
  };

  // Dynamically set menu items based on authentication and user role
  useEffect(() => {
    if (isLoggedIn) {
      const newMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'Adopt', path: '/all-pets' },
        { text: 'Donate', path: '/donatepet' },
        { text: 'Contact Us', path: '/contact' },
        { text: 'My Requests', path: '/user/requests/' },
      ];

      if (role === 'admin') {
        newMenuItems.push({ text: 'Dashboard', path: '/admin/v1/dashboard' });
        fetchAdoptionRequests(); // Only fetch for admin role
      }

      setMenuItems(newMenuItems);
    } else {
      setMenuItems([
        { text: 'Home', path: '/' },
        { text: 'Adopt Pets', path: '/all-pets' },
        { text: 'Donate Pets', path: '/donatepet' },
        { text: 'My Requests', path: '/user/requests/' },
        { text: 'Contact Us', path: '/contact' },
        { text: 'Sign In', path: '/login/' },

      ]);
    }
  }, [isLoggedIn, role]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flex: 1, fontFamily: 'cursive', color: 'blue' }}>
          PetHub
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                color: 'text.primary',
                position: 'relative',
                '&:after': {
                  content: activeLink === item.path ? '""' : 'none',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'blue',
                },
              }}
              onClick={() => setActiveLink(item.path)}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2 }}
            >
              Login
            </Button>
          ) : (
            <>
              {role === 'admin' && adoptionRequestsCount > 0 && (
                <Button
                  component={Link}
                  to="/user/requests/"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: 'white',
                    width: '250px',
                    '&:hover': { backgroundColor: 'darkred' },
                  }}
                >
                  {`Alert (${adoptionRequestsCount})`}
                </Button>
              )}

              <Typography variant="body1" sx={{ mx: 1 }}>
                Welcome,{' '}
                <Typography component="span" sx={{ color: 'blue' }}>
                  {user?.firstname || 'User'} {user?.lastname}
                </Typography>
              </Typography>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: 250 }}
      >
        <Box sx={{ padding: '20px', backgroundColor: '#1976d2', color: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>PetHub Menu</Typography>
        </Box>
        <List sx={{ width: '250px' }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
    </Drawer>
      
    </AppBar>
  );
};

export default Navbar;
