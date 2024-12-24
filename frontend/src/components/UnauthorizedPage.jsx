import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
        padding: 4,
        bgcolor: '#e3f2fd',
      }}
    >
      <Box sx={{ mb: 4, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignupRedirect}
            sx={{ paddingX: 4 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleLoginRedirect}
            sx={{ paddingX: 4 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to PetHub
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.2rem', lineHeight: 1.6 }}>
          Join PetHub, your ultimate destination for adopting a new furry friend or helping a pet in
          need find a loving home.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, width: '100%' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Why Choose PetHub?
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, fontSize: '1rem', lineHeight: 1.5 }}>
          - Verified pet adoption and donation processes<br />
          - Supportive community with guidance for new pet owners<br />
          - Resources for pet care, training, and more
        </Typography>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
