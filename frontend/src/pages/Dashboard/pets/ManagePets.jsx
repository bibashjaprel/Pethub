import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletePetId, setDeletePetId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [undoPet, setUndoPet] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
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

  const handleDeletePet = async () => {
    const petToDelete = pets.find((pet) => pet._id === deletePetId);
    setUndoPet(petToDelete);

    setPets((prevPets) => prevPets.filter((pet) => pet._id !== deletePetId));
    setShowDeleteDialog(false);
    setSnackbarOpen(true);

    try {
      const token = localStorage.getItem('authToken');
      axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
      await axios.delete(`/api/v1/pets/${deletePetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Pet deleted successfully.');
    } catch (err) {
      console.error(err);
      setError('Failed to delete pet');
    }
  };

  const undoDelete = () => {
    if (undoPet) {
      setPets((prevPets) => [...prevPets, undoPet]);
      setUndoPet(null);
    }
    setSnackbarOpen(false);
  };

  const handleAddPet = () => {
    navigate('/donatepet');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
    setSnackbarOpen(false);
  };

  const handleOpenDeleteDialog = (petId) => {
    setDeletePetId(petId);
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeletePetId(null);
  };

  const filteredPets = pets.filter((pet) => {
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleOpenDeleteDialog(params.id)}
          >
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by Name, ID, or Donor"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddPet}>
          Add New Pet
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

      {/* Snackbar for success or undo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          action={
            undoPet && (
              <Button color="inherit" size="small" onClick={undoDelete}>
                UNDO
              </Button>
            )
          }
        >
          Pet deleted successfully.
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pet? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePet} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePets;
