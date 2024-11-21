import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Container, Paper, Card, CardMedia, CardContent, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import PetsIcon from '@mui/icons-material/Pets';
import bannerImage from '../assets/banner2.jpg';
import axios from 'axios';

const Home = () => {
  const [recentPets, setRecentPets] = useState([]);

  useEffect(() => {
    const fetchRecentPets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Auth token not found in localStorage');
          setRecentPets([]);
          return;
        }

        const response = await axios.get('/api/v1/pets/availabe/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Debugging: Log the response data
        console.log('API Response:', response.data);

        // Ensure response data is an array
        setRecentPets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching recent pets:', error);
        setRecentPets([]); // Fallback to empty array on error
      }
    };

    fetchRecentPets();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Banner Section */}
        <Box 
          sx={{
            textAlign: 'center',
            py: 6,
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            mb: 6,
            color: 'white',
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', width: 80, height: 80 }}>
            <PetsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            PetHub
          </Typography>
          <Typography variant="h6">Find your perfect pet companion today!</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/all-pets"
            sx={{ mt: 4 }}
          >
            Adopt a Pet
          </Button>
        </Box>

        {/* Recent Pets Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Recently Added Pets
          </Typography>
          {Array.isArray(recentPets) && recentPets.length > 0 ? (
            <Carousel animation="slide" interval={3000} indicators={false} navButtonsAlwaysVisible>
              {recentPets.map((pet) => (
                <Card key={pet._id} sx={{ display: 'flex', alignItems: 'center', p: 2, m: 2 }}>
                  <CardMedia
                    component="img"
                    image={pet.image || 'https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg'}
                    alt={pet.name}
                    sx={{ width: 200, borderRadius: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{pet.name}</Typography>
                    <Typography variant="body1" color="textSecondary">{pet.species} - {pet.breed}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={`/adopt/${pet._id}`}
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
              No recent pets available at the moment.
            </Typography>
          )}
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ textAlign: 'center', p: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>Adopt a Pet</Typography>
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
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper sx={{ textAlign: 'center', p: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>Donate</Typography>
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
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper sx={{ textAlign: 'center', p: 4, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom>Contact Us</Typography>
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
