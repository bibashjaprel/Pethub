import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, MenuItem, InputLabel, FormControl, Select, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import donateImage from '../assets/donate-page-image.png';

const Input = styled('input')({
  display: 'none',
});

const DonatePet = () => {
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
    species: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setImageError('Invalid file type. Please upload an image (JPEG, PNG, or GIF).');
        return;
      }
      setImageError('');
      setPetData({ ...petData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file', petData.image);
    formData.append('name', petData.name);
    formData.append('breed', petData.breed);
    formData.append('age', petData.age);
    formData.append('description', petData.description);
    formData.append('species', petData.species);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('/api/v1/donate', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      // Display success message
      setSnackbarMessage('Pet donated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      console.log(response.data);

      // Clear form after successful submission
      setPetData({
        name: '',
        breed: '',
        age: '',
        description: '',
        species: '',
        image: null,
      });
      setImagePreview(null); // Clear image preview
    } catch (error) {
      // Display error message
      setSnackbarMessage('Failed to donate pet. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      {/* Left side with image and text */}
      <Box sx={{ flex: 1, textAlign: 'center', padding: 3, backgroundColor: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="img" src={donateImage} alt="Thank you for donating" sx={{ width: '60%', borderRadius: '10px', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-10px)' } }} />
        <Typography variant="h4" sx={{ mt: 2 }}>Thank You for Donating</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Your donation helps animals in need find their forever homes.</Typography>
      </Box>

      {/* Right side with form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, maxWidth: '600px', padding: 3, backgroundColor: '#fff', borderRadius: '10px' }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>Donate a Pet</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pet Name"
              name="name"
              value={petData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select name="species" value={petData.species} onChange={handleChange} required>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Bird">Bird</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Breed"
              name="breed"
              value={petData.breed}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={petData.age}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={petData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="image-upload">
              <Input accept="image/*" id="image-upload" type="file" onChange={handleImageUpload} />
              <Button variant="contained" component="span">Upload Pet Image</Button>
            </label>
            {imageError && <Typography variant="body2" color="error">{imageError}</Typography>}
          </Grid>

          {imagePreview && (
            <Grid item xs={12}>
              <img src={imagePreview} alt="Pet Preview" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Donate Pet'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DonatePet;

