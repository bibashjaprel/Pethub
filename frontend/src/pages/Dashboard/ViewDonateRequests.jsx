import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Snackbar } from '@mui/material';
import axios from 'axios';

function ViewDonateRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For managing error state
  const [successMessage, setSuccessMessage] = useState(null); // For managing success message

  // Fetch the adoption requests data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/pets/pending');
        const formattedData = response.data.map((item) => ({
          id: item._id,
          petName: item.name,
          species: item.species,
          breed: item.breed,
          age: item.age,
          status: item.status,
          donorName: `${item.donor.firstname} ${item.donor.lastname}`, // Concatenate donor's first and last name
          description: item.description,
          image: item.image,
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
        setError('Failed to fetch adoption requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle status update
  const handleUpdateStatus = async (row) => {
    const newStatus = 'available'; // Correct the typo here

    try {
      const response = await axios.put(`/api/v1/pets/pending/${row.id}`, { status: newStatus });
      // Optimistically update the local state to reflect the change
      setRows((prevRows) =>
        prevRows.map((r) =>
          r.id === row.id ? { ...r, status: newStatus } : r
        )
      );
      setSuccessMessage('Pet status updated successfully.');
    } catch (error) {
      console.error('Error updating status:', error.response?.data?.error || error.message);
      setError('Failed to update pet status.');
    }
  };

  // Snackbar component to display error or success messages
  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'petName', headerName: 'Pet Name', width: 150 },
    { field: 'species', headerName: 'Species', width: 120 },
    { field: 'breed', headerName: 'Breed', width: 120 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'donorName', headerName: 'Donor Name', width: 200 }, // Donor Name column
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleUpdateStatus(params.row)}>
          Update Status
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
}

export default ViewDonateRequests;
