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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const user = getUser();
  const role = user?.role;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [menuItems, setMenuItems] = useState([
    { text: 'Home', path: '/' },
    { text: 'Adopt', path: '/all-pets' },
    { text: 'Donate', path: '/donatepet' },
    { text: 'Contact Us', path: '/contact' },
    { text: 'Login', path: '/login' },
  ]);


  useEffect(() => {
    if (isLoggedIn) {
      const newMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'Adopt', path: '/all-pets' },
        { text: 'Donate', path: '/donatepet' },
        { text: 'Contact Us', path: '/contact' },
      ];
      if (role === 'admin') {
        newMenuItems.push({ text: 'Dashboard', path: '/admin/v1/dashboard' });
      }
      setMenuItems(newMenuItems);
    } else {
      setMenuItems([
        { text: 'Home', path: '/' },
        { text: 'Adopt', path: '/all-pets' },
        { text: 'Donate', path: '/donatepet' },
        { text: 'Contact Us', path: '/contact' },
        { text: 'Login', path: '/login' },
      ]);
    }
  }, [isLoggedIn, role]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

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

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
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
