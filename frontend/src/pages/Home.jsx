import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingTop: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Pet Adoption
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Find your perfect pet companion today!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/adopt"
            sx={{ marginTop: 3 }}
          >
            Adopt a Pet
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          {/* Adopt Feature */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>
                Adopt a Pet
              </Typography>
              <Typography color="textSecondary" paragraph>
                Browse through our list of pets available for adoption.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                component={Link} 
                to="/all-pets"
              >
                Explore Pets
              </Button>
            </Box>
          </Grid>

          {/* Donate Feature */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>
                Donate
              </Typography>
              <Typography color="textSecondary" paragraph>
                Help us continue our work by donating today.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                component={Link} 
                to="/donatepet"
              >
                Donate Now
              </Button>
            </Box>
          </Grid>

          {/* Contact Us Feature */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography color="textSecondary" paragraph>
                Get in touch with us if you have any questions or concerns.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                component={Link} 
                to="/contact"
              >
                Contact Us
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
