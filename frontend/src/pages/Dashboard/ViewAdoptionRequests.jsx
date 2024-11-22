import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function ViewAdoptionRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
      const response = await axios.get('/api/v1/adoption/', {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      // Map response data to match DataGrid columns
      const formattedData = response.data.map((item) => ({
        id: item._id,
        name: item.pet?.name || 'N/A', // Safely access name
        species: item.pet?.species || 'N/A',
        breed: item.pet?.breed || 'N/A',
        age: item.pet?.age || 'N/A',
        status: item.status || 'N/A',
        donorName: item.user ? `${item.user.firstname} ${item.user.lastname}` : 'Unknown',
        description: item.message || 'No message',
        image: item.pet?.image || '', // Provide a default if image is missing
      }));
      

      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
      setError('Failed to fetch adoption requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproveStatus = async (row) => {
    const newStatus = 'approved';

    try {
      // Optimistically update the status in the UI
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      );

      // Send the update request to the backend
      axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
      await axios.patch(`/api/v1/pets/${row.id}`, {
        status: newStatus,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });


      // Re-fetch the data to ensure the data stays consistent
      fetchData();

      // Show success message
      setSuccessMessage('Adoption request approved successfully.');
    } catch (error) {
      console.error('Error updating status:', error.response?.data?.error || error.message);

      // Revert UI in case of error
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: row.status } : r))
      );

      // Show error message
      setError('Failed to approve adoption request.');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Pet Name', width: 150 },
    { field: 'species', headerName: 'Species', width: 120 },
    { field: 'breed', headerName: 'Breed', width: 120 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'donorName', headerName: 'Donor Name', width: 200 },
    { field: 'description', headerName: 'Message', width: 200 },
    
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <Typography variant="body2">{params.row.status}</Typography>,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleApproveStatus(params.row)}
          disabled={params.row.status === 'approved'}
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        View Pet Adoption Requests
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        loading={loading}
        checkboxSelection
      />

      {/* Snackbar for error handling */}
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Snackbar for success message */}
      {successMessage && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default ViewAdoptionRequests;
