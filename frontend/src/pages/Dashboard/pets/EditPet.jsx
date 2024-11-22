import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Snackbar, Grid, Input } from '@mui/material';
import axios from 'axios';

const EditPet = () => {
  const [pet, setPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    image: '',
    status: '',
    doner: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
        const response = await axios.get(`/api/v1/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPet(response.data);
        } else {
          setError('Failed to fetch pet data');
        }
      } catch (err) {
        setError('Error fetching pet data');
      }
    };
    fetchPetData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({
      ...pet,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', pet.name);
      formData.append('species', pet.species);
      formData.append('breed', pet.breed);
      formData.append('age', pet.age);
      formData.append('description', pet.description);
      formData.append('status', pet.status);
      formData.append('doner', pet.doner);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const token = localStorage.getItem('authToken');
      const response = await axios.put(`/api/v1/pets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Pet updated successfully!');
        navigate('/pets');
      }
    } catch (err) {
      setError('Failed to update pet');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Edit Pet</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={pet.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Species"
              variant="outlined"
              fullWidth
              name="species"
              value={pet.species}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Breed"
              variant="outlined"
              fullWidth
              name="breed"
              value={pet.breed}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              name="age"
              value={pet.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={pet.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              type="file"
              onChange={handleFileChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              variant="outlined"
              fullWidth
              name="status"
              value={pet.status}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Doner ID"
              variant="outlined"
              fullWidth
              name="doner"
              value={pet.doner}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Pet'}
          </Button>
        </Box>
      </form>

      {/* Snackbar for error handling */}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          message={error}
          onClose={handleCloseSnackbar}
        />
      )}

      {/* Snackbar for success message */}
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          message={successMessage}
          onClose={handleCloseSnackbar}
        />
      )}
    </Box>
  );
};

export default EditPet;
