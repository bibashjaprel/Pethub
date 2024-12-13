import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { getAdoptionRequests } from '../../../utils/apiHelpers'; // Import the API helper functions
import axios from 'axios';

function ViewAdoptionRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch adoption requests
  const fetchAdoptionRequests = async () => {
    try {
      setLoading(true);
      const data = await getAdoptionRequests();
      const formattedData = data.map((item) => ({
        id: item._id,
        name: item.pet?.name || 'N/A',
        species: item.pet?.species || 'N/A',
        breed: item.pet?.breed || 'N/A',
        age: item.pet?.age || 'N/A',
        status: item.status || 'N/A',
        // adopterNamw: item.user ? `${item.user.firstname} ${item.user.lastname}` : 'Unknown',
        adopterName: item.user ? `${item.user.firstname} ${item.user.lastname}` : 'Unknown',
        description: item.message || 'No message',
        image: item.pet?.image || '',
      }));
      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
      setError('Failed to fetch adoption requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  // Handle adoption request approval
  const handleApproveStatus = async (row) => {
    const newStatus = 'approved';

    try {
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
      );

      await axios.patch(`/api/v1/adoption/${row.id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      fetchAdoptionRequests();
      setSuccessMessage('Adoption request approved successfully!');
    } catch (error) {
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === row.id ? { ...r, status: row.status } : r))
      );
      setError('Failed to approve adoption request. Please try again later.');
    }
  };

  // Close the Snackbar
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
    { field: 'adopterName', headerName: 'Requested By', width: 200 },
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

      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

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
