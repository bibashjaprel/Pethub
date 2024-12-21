import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { getAdoptionRequests } from '../../../utils/apiHelpers';

function ViewAdoptionRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: null, severity: 'info' });
  const [searchQuery, setSearchQuery] = useState(''); // Track the search input

  const statusColors = {
    approved: 'green',
    pending: 'orange',
    rejected: 'red',
    default: 'grey',
  };

  const showNotification = (message, severity) => {
    const validSeverities = ['success', 'error', 'warning', 'info'];
    if (!validSeverities.includes(severity)) {
      severity = 'info';
    }
    setNotification({ message, severity });
  };

  const fetchAdoptionRequests = async () => {
    try {
      setLoading(true);
      const data = await getAdoptionRequests();
      const formattedData = data.map((item) => ({
        id: item._id,
        adoptionRequestId: item._id,
        petId: item.pet?._id,
        name: item.pet?.name || 'N/A',
        species: item.pet?.species || 'N/A',
        breed: item.pet?.breed || 'N/A',
        age: item.pet?.age || 'N/A',
        status: item.status || 'pending',
        adopterName: item.user ? `${item.user.firstname} ${item.user.lastname}` : 'Unknown',
        description: item.message || 'No message',
      }));
      setRows(formattedData);
    } catch (err) {
      showNotification('Failed to fetch adoption requests. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStatus = async (row) => {
    const newStatus = 'approved';
    const previousRows = [...rows];

    try {
      setRows((prevRows) =>
        prevRows.map((r) =>
          r.id === row.id ? { ...r, status: newStatus } : r
        )
      );

      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      await Promise.all([
        axios.patch(`/api/v1/adoption/${row.adoptionRequestId}`, { status: newStatus }, { headers }),
        axios.patch(`/api/v1/pets/${row.petId}`, { status: newStatus }, { headers }),
      ]);

      showNotification('Adoption request approved successfully!', 'success');
    } catch (error) {
      setRows(previousRows);
      showNotification(error?.response?.data?.message || 'Failed to approve adoption request. No changes were made.', 'error');
    }
  };

  const handleRejectStatus = async (row) => {
    const newStatus = 'rejected';
    const previousRows = [...rows];

    try {
      setRows((prevRows) =>
        prevRows.map((r) =>
          r.id === row.id ? { ...r, status: newStatus } : r
        )
      );

      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      await Promise.all([
        axios.patch(`/api/v1/adoption/${row.adoptionRequestId}`, { status: newStatus }, { headers }),
        axios.patch(`/api/v1/pets/${row.petId}`, { status: 'available' }, { headers }),
      ]);

      showNotification('Adoption request rejected successfully!', 'success');
    } catch (error) {
      setRows(previousRows);
      showNotification(error?.response?.data?.message || 'Failed to reject adoption request. No changes were made.', 'error');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  const handleCloseSnackbar = () => {
    setNotification({ message: null, severity: 'info' });
  };

  // Filtering rows based on search query
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery) ||
      row.species.toLowerCase().includes(searchQuery) ||
      row.breed.toLowerCase().includes(searchQuery) ||
      row.adopterName.toLowerCase().includes(searchQuery) ||
      row.status.toLowerCase().includes(searchQuery)
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.8 },
    { field: 'name', headerName: 'Pet Name', flex: 1 },
    { field: 'species', headerName: 'Species', flex: 0.8 },
    { field: 'breed', headerName: 'Breed', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 0.6 },
    { field: 'adopterName', headerName: 'Requested By', flex: 1.2 },
    { field: 'description', headerName: 'Message', flex: 1.5 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: statusColors[params.row.status] || statusColors.default,
            fontWeight: 'bold',
          }}
        >
          {params.row.status.toUpperCase()}
        </Typography>
      ),
    },
    {
      field: 'approveAction',
      headerName: 'Approve Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleApproveStatus(params.row)}
          disabled={params.row.status === 'approved'}
        >
          {params.row.status === 'approved' ? 'Approved' : 'Approve'}
        </Button>
      ),
    },
    {
      field: 'rejectAction',
      headerName: 'Reject Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleRejectStatus(params.row)}
          disabled={params.row.status === 'rejected'}
        >
          {params.row.status === 'rejected' ? 'Rejected' : 'Reject'}
        </Button>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 3,
        minHeight: '500px',
        overflowX: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
        Pet Adoption Requests
      </Typography>

      {/* Search Field */}
      <TextField
        variant="outlined"
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2, width: '100%' }}
        placeholder="Search by Pet Name, Species, Breed, or Status"
      />

      {/* Loading Spinner */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={filteredRows} // Apply filtered rows for better performance
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'primary.main',
              color: 'text.primary',
            },
            '& .MuiDataGrid-footerContainer': {
              justifyContent: 'center',
            },
          }}
        />
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification.message}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={notification.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {notification.message || 'An error occurred'}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ViewAdoptionRequests;
