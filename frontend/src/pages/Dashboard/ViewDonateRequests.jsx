// ViewPetAdoptionRequests.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'applicantName', headerName: 'Applicant Name', width: 150 },
  { field: 'petName', headerName: 'Pet Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, applicantName: 'Alice', petName: 'Milo', status: 'Pending' },
  { id: 2, applicantName: 'Bob', petName: 'Daisy', status: 'Rejected' },
  // More data as needed
];

function ViewPetAdoptionRequests() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        View Pet Adoption Requests
      </Typography>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
}

export default ViewPetAdoptionRequests;
