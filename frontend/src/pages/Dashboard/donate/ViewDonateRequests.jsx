import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function ViewDonateRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
      const response = await axios.get('/api/v1/pets/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedData = response.data.map((item) => ({
        id: item._id,
        petName: item.name,
        species: item.species,
        breed: item.breed,
        age: item.age,
        status: item.status,
        donorName: item.user ? `${item.user.firstname} ${item.user.lastname}` : 'Unknown',
        description: item.description,
        image: item.image,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch donation requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (row) => {
    const newStatus = 'available';
    const token = localStorage.getItem('authToken');

    try {
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      );
      axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
      await axios.put(
        `/api/v1/pets/pending/${row.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Pet status updated successfully.');
    } catch (error) {
      setError('Failed to update pet status.');
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: row.status } : r))
      );
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'petName', headerName: 'Pet Name', width: 150 },
    { field: 'species', headerName: 'Species', width: 120 },
    { field: 'breed', headerName: 'Breed', width: 120 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'donorName', headerName: 'Donor Name', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">{params.row.status}</Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateStatus(params.row)}
          disabled={params.row.status === 'available'}
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        View Pet Donate Requests
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        loading={loading}
        checkboxSelection
      />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ViewDonateRequests;
