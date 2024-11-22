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
    const { id } = useParams(); // Get pet ID from URL parameters
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

    useEffect(() => {
      const fetchPet = async () => {
        try {
          const token = localStorage.getItem('authToken');
          axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
          const response = await axios.get(`/api/v1/pets/${id}`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          });
          setPet(response.data);
        } catch (err) {
          console.error(err);
          setError('Error fetching pet details');
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
      
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const userId = user ? user.id : '';
      console.log(userId);

      
      const extendedFormData = {
        ...formData,
        userId: userId,
      };

      try {
        axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
        const response = await axios.post('/api/v1/adoption', extendedFormData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        alert(response.data.message); // Handle response message
      } catch (err) {
        console.log(err);
        setError('Failed to submit adoption request'); // Handle errors
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
      </Box>
    );
  };

  export default AdoptPage;
