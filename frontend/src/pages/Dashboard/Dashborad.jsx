// Dashboard.js (Updated)
import React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography } from '@mui/material';
import { People, Pets, Assignment, Dashboard as DashboardIcon } from '@mui/icons-material';

// Components for the different dashboard sections
import ManageUsers from './ManageUsers';
import ViewAdoptionRequests from './ViewAdoptionRequests';
import ManagePets from './ManagePets';
import ViewDonateRequests from './ViewDonateRequests';

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = React.useState(<ManageUsers />);
  const [activeItem, setActiveItem] = React.useState("ManageUsers");

  const handleComponentChange = (component, itemName) => {
    setSelectedComponent(component);
    setActiveItem(itemName);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            PetHub Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleComponentChange(<ManageUsers />, "ManageUsers")} 
                      sx={{ color: activeItem === "ManageUsers" ? 'blue' : 'inherit' }}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ViewAdoptionRequests />, "ViewAdoptionRequests")} 
                      sx={{ color: activeItem === "ViewAdoptionRequests" ? 'blue' : 'inherit' }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View Adoption Requests" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ViewDonateRequests />, "ViewDonateRequests")} 
                      sx={{ color: activeItem === "ViewPetAdoptionRequests" ? 'blue' : 'inherit' }}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="View  Donate Requests" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<ManagePets />, "ManagePets")} 
                      sx={{ color: activeItem === "ManagePets" ? 'blue' : 'inherit' }}>
              <ListItemIcon><Pets /></ListItemIcon>
              <ListItemText primary="Manage Pets" />
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
