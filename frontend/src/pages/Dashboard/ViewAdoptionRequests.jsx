// ViewAdoptionRequests.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'petName', headerName: 'Pet Name', width: 150 },
  { field: 'applicantName', headerName: 'Applicant Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, petName: 'Buddy', applicantName: 'John Doe', status: 'Pending' },
  { id: 2, petName: 'Bella', applicantName: 'Jane Smith', status: 'Approved' },
  // More data as needed
];

function ViewAdoptionRequests() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        View Adoption Requests
      </Typography>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
}

export default ViewAdoptionRequests;
