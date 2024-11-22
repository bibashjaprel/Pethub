import React from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  useMediaQuery,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { People, Pets, Assignment, Dashboard as DashboardIcon, AccountCircle, ExitToApp, Search as SearchIcon, Notifications, Settings as SettingsIcon, Help as HelpIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
// Components for the different dashboard sections
import AnalyzeDashboard from './AnalyzeDashboard';
import ManageUsers from './users/ManageUsers';
import ViewAdoptionRequests from './adoption/ViewAdoptionRequests';
import ManagePets from './pets/ManagePets';
import ViewDonateRequests from './donate/ViewDonateRequests';
import { clearToken } from '../../utils/authHelpers';

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = React.useState(<AnalyzeDashboard />); // Default to AnalyzeDashboard
  const [activeItem, setActiveItem] = React.useState("AnalyzeDashboard");

  // State for menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  const handleComponentChange = (component, itemName) => {
    setSelectedComponent(component);
    setActiveItem(itemName);
  };

  const isLargeScreen = useMediaQuery('(min-width:600px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>PetHub Admin Dashboard</Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            {/* Profile Avatar with Dropdown */}
            <Avatar
              sx={{ bgcolor: 'secondary.main', width: 32, height: 32, cursor: 'pointer' }}
              onClick={handleMenuOpen}
            >
              A
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen || undefined}
        onClose={!isLargeScreen ? () => {} : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f7f7f7' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Dashboard Section */}
            <ListItem button onClick={() => handleComponentChange(<AnalyzeDashboard />, "AnalyzeDashboard")}
                      sx={{ color: activeItem === "AnalyzeDashboard" ? 'primary.main' : 'inherit', bgcolor: activeItem === "AnalyzeDashboard" ? '#e0f7fa' : 'inherit', borderRadius: 2 }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Analyze Dashboard" />
            </ListItem>

            {/* Requests Section */}
            <ListItem button onClick={() => handleComponentChange(<ViewAdoptionRequests />, "ViewAdoptionRequests")}
                      sx={{ color: activeItem === "ViewAdoptionRequests" ? 'primary.main' : 'inherit', bgcolor: activeItem === "ViewAdoptionRequests" ? '#e0f7fa' : 'inherit', borderRadius: 2 }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View Adoption Requests" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ViewDonateRequests />, "ViewDonateRequests")}
                      sx={{ color: activeItem === "ViewDonateRequests" ? 'primary.main' : 'inherit', bgcolor: activeItem === "ViewDonateRequests" ? '#e0f7fa' : 'inherit', borderRadius: 2 }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View Donate Requests" />
            </ListItem>

            {/* Management Section */}
            <ListItem button onClick={() => handleComponentChange(<ManagePets />, "ManagePets")}
                      sx={{ color: activeItem === "ManagePets" ? 'primary.main' : 'inherit', bgcolor: activeItem === "ManagePets" ? '#e0f7fa' : 'inherit', borderRadius: 2 }}>
              <ListItemIcon><Pets /></ListItemIcon>
              <ListItemText primary="Manage Pets" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ManageUsers />, "ManageUsers")}
                      sx={{ color: activeItem === "ManageUsers" ? 'primary.main' : 'inherit', bgcolor: activeItem === "ManageUsers" ? '#e0f7fa' : 'inherit', borderRadius: 2 }}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>

            {/* New Settings Option */}
            <ListItem button onClick={() => alert('Settings Page Coming Soon!')}
                      sx={{ color: 'inherit', bgcolor: 'inherit', borderRadius: 2 }}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            {/* Help Section */}
            <ListItem button onClick={() => alert('Help Section Coming Soon!')}
                      sx={{ color: 'inherit', bgcolor: 'inherit', borderRadius: 2 }}>
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>

          </List>

          <Divider />

          {/* Removed Profile from sidebar, now handled by dropdown */}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, transition: 'all 0.3s ease' }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
}

