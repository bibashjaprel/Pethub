import React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, useMediaQuery, Divider } from '@mui/material';
import { People, Pets, Assignment, Dashboard as DashboardIcon, AccountCircle, ExitToApp, Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// Components for the different dashboard sections
import AnalyzeDashboard from './AnalyzeDashboard';
import ManageUsers from './ManageUsers';
import ViewAdoptionRequests from './ViewAdoptionRequests';
import ManagePets from './ManagePets';
import ViewDonateRequests from './ViewDonateRequests';

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = React.useState(<AnalyzeDashboard />); // Default to AnalyzeDashboard
  const [activeItem, setActiveItem] = React.useState("AnalyzeDashboard");

  const handleComponentChange = (component, itemName) => {
    setSelectedComponent(component);
    setActiveItem(itemName);
  };

  const isLargeScreen = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>PetHub Admin Dashboard</Link>
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen || undefined}
        onClose={!isLargeScreen ? () => {} : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f0f0f0' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Add AnalyzeDashboard item before other sections */}
            <ListItem button onClick={() => handleComponentChange(<AnalyzeDashboard />, "AnalyzeDashboard")}
                      sx={{
                        color: activeItem === "AnalyzeDashboard" ? 'blue' : 'inherit',
                        backgroundColor: activeItem === "AnalyzeDashboard" ? '#e0f7fa' : 'inherit',
                      }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Analyze Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ViewAdoptionRequests />, "ViewAdoptionRequests")}
                      sx={{
                        color: activeItem === "ViewAdoptionRequests" ? 'blue' : 'inherit',
                        backgroundColor: activeItem === "ViewAdoptionRequests" ? '#e0f7fa' : 'inherit',
                      }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View Adoption Requests" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ViewDonateRequests />, "ViewDonateRequests")}
                      sx={{
                        color: activeItem === "ViewDonateRequests" ? 'blue' : 'inherit',
                        backgroundColor: activeItem === "ViewDonateRequests" ? '#e0f7fa' : 'inherit',
                      }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View Donate Requests" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ManagePets />, "ManagePets")}
                      sx={{
                        color: activeItem === "ManagePets" ? 'blue' : 'inherit',
                        backgroundColor: activeItem === "ManagePets" ? '#e0f7fa' : 'inherit',
                      }}>
              <ListItemIcon><Pets /></ListItemIcon>
              <ListItemText primary="Manage Pets" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ManageUsers />, "ManageUsers")}
                      sx={{
                        color: activeItem === "ManageUsers" ? 'blue' : 'inherit',
                        backgroundColor: activeItem === "ManageUsers" ? '#e0f7fa' : 'inherit',
                      }}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
          </List>

          <Divider />

          {/* Profile and Logout Section */}
          <List>
            <ListItem button>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => alert("Logging out...")}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
}
