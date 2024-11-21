import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// AdoptPet component
const AdoptPet = () => {
  const { petId } = useParams(); // Get the pet ID from the URL

  const [adopterData, setAdopterData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setAdopterData({
      ...adopterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/v1/adopt/${petId}`, adopterData);
      setSuccessMessage('Your adoption request has been submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <Paper sx={{ maxWidth: '600px', width: '100%', p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Adopt a Pet
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please fill out the form below to adopt this pet.
        </Typography>

        {/* Success Message */}
        {successMessage && (
          <Typography variant="body1" color="green" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={adopterData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={adopterData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={adopterData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={adopterData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={adopterData.message}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Adoption Request
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdoptPet;
