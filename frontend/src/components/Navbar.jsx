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
  Divider,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedIcon from '@mui/icons-material/Verified';
import { isAuthenticated, getUser, clearToken } from '../utils/authHelpers';
import { getAdoptionRequests } from '../utils/apiHelpers';
import { motion } from 'framer-motion';

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

  const fetchAdoptionRequests = () => {
    if (role === 'admin') {
      getAdoptionRequests()
        .then((data) => setAdoptionRequestsCount(data.length))
        .catch((err) => console.error('Failed to fetch adoption requests:', err));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const newMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'About Us', path: '/about-us' },
        { text: 'Adopt Pets', path: '/all-pets' },
        { text: 'Donate Pets', path: '/donate-pet' },
      ];

      if (role === 'admin') fetchAdoptionRequests();
      setMenuItems(newMenuItems);
    } else {
      setMenuItems([
        { text: 'Home', path: '/' },
        { text: 'About Us', path: '/about-us' },
        { text: 'Adopt Pets', path: '/all-pets' },
        { text: 'Donate Pets', path: '/donate-pet' },
      ]);
    }
  }, [isLoggedIn, role]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);

    if (open) {
      const updatedMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'About Us', path: '/about-us' },
        { text: 'Adopt Pets', path: '/all-pets' },
        { text: 'Donate Pets', path: '/donate-pet' },
      ];

      if (role === 'admin' || role === 'user') {
        updatedMenuItems.push({ text: 'My Requests', path: '/user/requests/' });
      }

      setMenuItems(updatedMenuItems);
    } else {
      // Reset to the default menu items when the drawer is closed
      const defaultMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'About Us', path: '/about-us' },
        { text: 'Adopt Pets', path: '/all-pets' },
        { text: 'Donate Pets', path: '/donate-pet' },
      ];

      setMenuItems(defaultMenuItems);
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Roboto, Arial',
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              color: '#fff',
            }}
            onClick={() => navigate('/')}
          >
            PetHub
          </Typography>
        </motion.div>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
          {menuItems.map((item) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                component={Link}
                to={item.path}
                sx={{
                  mx: 1.5,
                  color: activeLink === item.path ? '#FFD700' : '#fff',
                  fontWeight: activeLink === item.path ? 'bold' : 'normal',
                  '&:hover': { backgroundColor: '#1976d2', borderRadius: 2 },
                }}
                onClick={() => setActiveLink(item.path)}
              >
                {item.text}
              </Button>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            </motion.div>
          ) : (
            <>
              {role === 'admin' && adoptionRequestsCount >= 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    component={Link}
                    to="/user/requests/"
                    sx={{ color: '#fff', mx: 1 }}
                  >
                    <Badge
                      color="error"
                      badgeContent={adoptionRequestsCount}
                      sx={{ ml: 1 }}
                    >
                      <NotificationsIcon />
                    </Badge>
                  </Button>
                </motion.div>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#fff', mr: 1, fontFamily: 'Arial' }}
                >
                  Welcome,{' '}
                  <Typography
                    component="span"
                    sx={{
                      color: '#FFD700',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  >
                    {user?.firstname || 'User'}{' '}
                    {role === 'admin' && <VerifiedIcon sx={{ fontSize: 16 }} />}
                  </Typography>
                </Typography>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ ml: 2, borderColor: '#fff', color: '#fff' }}
                >
                  Logout
                </Button>
              </motion.div>
            </>
          )}
        </Box>

        <IconButton
          edge="start"
          color="inherit"
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
        <Box sx={{ p: 2, backgroundColor: '#1976d2', color: '#fff' }}>
          <Typography variant="h6">PetHub Menu</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {isLoggedIn && (
            <>
              <Divider />
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
