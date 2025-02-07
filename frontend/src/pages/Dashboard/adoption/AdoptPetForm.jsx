import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Button, Grid, TextField, styled, Snackbar, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPet, createAdoptionRequest } from '../../../utils/apiHelpers'; // Import the helper functions
import { Alert } from '@mui/material';

const PetDetails = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 8,
  backgroundColor: '#fff',
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  backgroundColor: '#f9f9f9',
  boxShadow: theme.shadows[3],
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const AdoptPage = () => {
  const { id } = useParams(); // Get pet ID from URL parameters
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('user') || '',
    petId: id,
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

    // Check if the message field is empty
    if (!formData.message.trim()) {
      setError('Please provide a reason for adoption.');
      return;
    }

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
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ ml: 2, color: 'blue' }}>
          Loading pet details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <Grid container spacing={4} sx={{ maxWidth: '1200px' }}>
        <Grid item xs={12} md={6}>
          <PetDetails>
            <img
              src={pet.image || 'https://via.placeholder.com/400'}
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
            <Title variant="h5">{pet.name}</Title>
            <Typography variant="body1">
              <strong>Species:</strong> {pet.species}
            </Typography>
            <Typography variant="body1">
              <strong>Breed:</strong> {pet.breed}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {pet.age}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              <strong>Description:</strong> {pet.description}
            </Typography>
          </PetDetails>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormContainer>
            <Title variant="h6">Adoption Form</Title>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Why do you want to adopt?"
                variant="outlined"
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                sx={{ mb: 3 }}
                required
              />
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ py: 1.5 }}>
                Submit Adoption Application
              </Button>
            </form>
          </FormContainer>
        </Grid>
      </Grid>

      {/* Snackbar for success and error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Display error message if any */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AdoptPage;
