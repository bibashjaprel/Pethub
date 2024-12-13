import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Container, Paper, Card, CardMedia, CardContent, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import PetsIcon from '@mui/icons-material/Pets';
import bannerImage from '../assets/banner2.jpg';
import { fetchRecentPets } from '../utils/apiHelpers';

const Home = () => {
  const [recentPets, setRecentPets] = useState([]);

  useEffect(() => {
    const loadRecentPets = async () => {
      try {
        const pets = await fetchRecentPets();
        setRecentPets(pets);
      } catch (error) {
        console.error('Error loading recent pets:', error.message);
      }
    };

    loadRecentPets();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Banner Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, sm: 6 },
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            mb: 6,
            color: 'white',
            boxShadow: 4,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', width: 100, height: 100 }}>
            <PetsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            PetHub
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Find your perfect pet companion today!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/all-pets"
            sx={{ mt: 4, paddingX: 4 }}
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
                <Card key={pet._id} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', p: 2, m: 2, borderRadius: 2, boxShadow: 2 }}>
                  <CardMedia
                    component="img"
                    image={pet.image || 'https://via.placeholder.com/200'}
                    alt={pet.name}
                    sx={{ width: { xs: '100%', sm: 200 }, borderRadius: 2 }}
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
          {[
            { title: 'Adopt a Pet', text: 'Browse through our list of pets available for adoption.', link: '/all-pets', button: 'Explore Pets' },
            { title: 'Donate', text: 'Help us continue our work by donating today.', link: '/donatepet', button: 'Donate Now' },
            { title: 'Contact Us', text: 'Get in touch with us if you have any questions or concerns.', link: '/contact', button: 'Contact Us' },
          ].map(({ title, text, link, button }, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper sx={{ textAlign: 'center', p: 4, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" gutterBottom>{title}</Typography>
                <Typography color="textSecondary" paragraph>{text}</Typography>
                <Button variant="outlined" color="primary" component={Link} to={link} sx={{ mt: 2 }}>
                  {button}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
