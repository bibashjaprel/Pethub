import React, { useEffect, useState } from 'react'; 
import { Box, Typography, Button, TextField, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/api/v1/pets/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPets(response.data);
        } else {
          setError(`Error fetching pets: ${response.statusText}`);
        }
      } catch (err) {
        if (err.response) {
          setError(`Server Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong'}`);
        } else if (err.request) {
          setError('Network Error: No response received from the server');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDeletePet = async (petId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/v1/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPets((prevPets) => prevPets.filter(pet => pet._id !== petId));
      setSuccessMessage('Pet deleted successfully.');
    } catch (err) {
      console.log(err)
      setError('Failed to delete pet');
    }
  };

  const handleAddPet = () => {
    navigate('/pets/add');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Filter pets based on name, ID, or donor name
  const filteredPets = pets.filter(pet => {
    const donorName = pet.doner ? `${pet.doner.firstname} ${pet.doner.lastname}` : '';
    return (
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'breed', headerName: 'Breed', width: 130 },
    { field: 'age', headerName: 'Age', width: 100 },
    {
      field: 'doner',
      headerName: 'Donor',
      width: 150,
      renderCell: (params) => {
        const donor = params.row.doner;
        return donor ? `${donor.firstname} ${donor.lastname}` : 'Unknown';
      },
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button variant="outlined" color="primary" onClick={() => navigate(`/pets/${params.id}`)}>
            View
          </Button>
          <Button variant="outlined" color="warning" onClick={() => navigate(`/admin/dashboard/pets/edit/${params.id}`)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDeletePet(params.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Pets
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField 
          label="Search by Name, ID, or Donor" 
          variant="outlined" 
          size="small" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }} 
        />
        <Button variant="contained" onClick={handleClearSearch} size="small">
          Clear
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={filteredPets}
          columns={columns}
          pageSize={5} 
          rowsPerPageOptions={[5]} 
          disableSelectionOnClick 
          getRowId={(row) => row._id} 
        />
      </div>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddPet}>
          Add New Pet
        </Button>
      </Box>

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

export default ManagePets;
