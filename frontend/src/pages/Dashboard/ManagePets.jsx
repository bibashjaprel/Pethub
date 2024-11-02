import React, { useEffect, useState } from 'react';
import { getPet, deletePet } from '../../utils/apiHelpers'; 
import { Box, Typography, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPet();
        setPets(data);
      } catch (err) {
        setError('Failed to fetch pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId);
      setPets((prevPets) => prevPets.filter(pet => pet._id !== petId));
    } catch (err) {
      setError('Failed to delete pet');
    }
  };

  const handleAddPet = () => {
    navigate('/pets/add'); // Adjust the path as necessary for adding pets
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear the search term
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    { field: 'owner', headerName: 'Owner', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button variant="outlined" color="primary" onClick={() => navigate(`/pets/${params.id}`)}>
            View
          </Button>
          <Button variant="outlined" color="warning" onClick={() => navigate(`/pets/edit/${params.id}`)}>
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
          label="Search by Name or ID" 
          variant="outlined" 
          size="small" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }} // Margin to the right
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
          getRowId={(row) => row._id} // Use _id as the unique identifier
        />
      </div>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddPet}>
          Add New Pet
        </Button>
      </Box>
    </Box>
  );
};

export default ManagePets;
