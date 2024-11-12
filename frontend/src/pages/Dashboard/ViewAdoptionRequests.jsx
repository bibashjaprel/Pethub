import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

// Columns for the DataGrid
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'petName', headerName: 'Pet Name', width: 150 },
  { field: 'species', headerName: 'Species', width: 120 },
  { field: 'breed', headerName: 'Breed', width: 120 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { field: 'action', headerName: 'Action', width: 120, renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => params.row.handleUpdateStatus(params.row)}>
        Update Status
      </Button>
    ) 
  },
];

function ViewPetAdoptionRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

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
          donor: item.donor,
          description: item.description,
          image: item.image,
          handleUpdateStatus: handleUpdateStatus, // Add the handler to each row
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle status update
  const handleUpdateStatus = async (row) => {
    const newStatus = prompt('Enter the new status (pending, approved, rejected):', row.status);
    if (newStatus) {
      try {
        await axios.put(`/api/v1/pets/${row.id}`, { status: newStatus });
        const updatedRows = rows.map((r) => 
          r.id === row.id ? { ...r, status: newStatus } : r
        );
        setRows(updatedRows);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

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
    </Box>
  );
}

export default ViewPetAdoptionRequests;
