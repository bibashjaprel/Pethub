import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Button, Grid, TextField, styled, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPet, createAdoptionRequest } from '../../../utils/apiHelpers'; // Import the helper functions
import { Alert } from '@mui/material';

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
  const { id } = useParams(); // Get pet ID from URL parameters
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('user') || '',
    petId: id, // Set petId from URL
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await getPet(id); // Fetch pet data using the helper function
        setPet(petData);
      } catch (err) {
        setError('Error fetching pet details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : '';

    const extendedFormData = { ...formData, userId };

    try {
      const response = await createAdoptionRequest(extendedFormData); // Call the POST function for creating adoption request
      setSuccessMessage('Your adoption request has been submitted successfully!');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(-1); // Redirect to the previous page
      }, 3000); // Delay to allow the user to see the success message
    } catch (err) {
      setError('Failed to submit adoption request. Please try again.');
    }
  };

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
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Why do you want to adopt?"
                variant="outlined"
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit Application
              </Button>
            </form>
          </FormContainer>
        </Grid>
      </Grid>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Display error message if any */}
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AdoptPage;
