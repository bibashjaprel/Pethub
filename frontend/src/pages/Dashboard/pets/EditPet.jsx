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
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/api/v1/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPet(response.data);
      } catch {
        setError('Error fetching pet data');
      }
    };
    fetchPetData();
  }, [id]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pet.name || !pet.species || !pet.status) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(pet).forEach(([key, value]) => formData.append(key, value));
      if (imageFile) formData.append('image', imageFile);

      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`/api/v1/pets/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage('Pet updated successfully!');
      navigate('/all-pets');
    } catch {
      setError('Failed to update pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Edit Pet</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['name', 'species', 'breed', 'age', 'description'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                fullWidth
                name={field}
                value={pet[field]}
                onChange={handleChange}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              value={pet.status}
              onChange={handleChange}
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input type="file" onChange={handleFileChange} fullWidth />
            {preview && <img src={preview} alt="Preview" width="100" />}
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Pet'}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={Boolean(error || successMessage)}
        autoHideDuration={6000}
        message={error || successMessage}
        onClose={() => setError(null) || setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default EditPet;
