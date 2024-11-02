import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Grid,
  TextField,
  styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const PetDetails = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  backgroundColor: '#fff',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  backgroundColor: '#f9f9f9',
}));

const AdoptPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/pets/${id}`);
        setPet(response.data);
      } catch (err) {
        setError('Error fetching pet details');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <Box className="min-h-screen flex justify-center items-center">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2, color: 'blue' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <Grid container spacing={4} sx={{ maxWidth: '1000px' }}>
        <Grid item xs={12} md={6}>
          <PetDetails>
            <img
              src={pet.image || 'https://plus.unsplash.com/premium_photo-1675437553489-0ddf979f299a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
              alt={pet.name}
              loading="lazy"
              style={{
                borderRadius: 8,
                display: 'block',
                width: '100%',
                maxWidth: '400px',
                objectFit: 'cover',
                marginBottom: '16px',
              }}
            />
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
              {pet.name}
            </Typography>
            <Typography variant="body1">
              <strong>Species:</strong> {pet.species}
            </Typography>
            <Typography variant="body1">
              <strong>Breed:</strong> {pet.breed}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {pet.age}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Description:</strong> {pet.description}
            </Typography>
          </PetDetails>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Adoption Form
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                type="tel"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Why do you want to adopt?"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Submit Application
              </Button>
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdoptPage;
