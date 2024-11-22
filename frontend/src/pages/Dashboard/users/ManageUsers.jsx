import React, { useEffect, useState } from 'react';
import { getUser, deleteUser  } from '../../../utils/apiHelpers'; // Adjust path as necessary
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Button,
  TextField,
  Tooltip,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmationDialog, setConfirmationDialog] = useState({ open: false, userId: null });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUser();
        const mappedUsers = data.map(user => ({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        }));
        setUsers(mappedUsers);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(confirmationDialog.userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== confirmationDialog.userId));
      setNotification({ type: 'success', message: 'User deleted successfully.' });
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete user. Try again.' });
    } finally {
      setConfirmationDialog({ open: false, userId: null });
    }
  };

  const handleViewUser = userId => navigate(`/users/${userId}`);
  const handleUpdateUser = userId => navigate(`/users/update/${userId}`);
  const handleClearSearch = () => setSearchTerm('');
  const handleCloseNotification = () => setNotification(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: params => (
        <Typography
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            backgroundColor: params.value === 'Active' ? 'green.100' : 'red.100',
            color: params.value === 'Active' ? 'green.800' : 'red.800',
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: params => (
        <Box display="flex" gap={1}>
          <Tooltip title="View User Details">
            <Button variant="outlined" size="small" onClick={() => handleViewUser(params.id)}>
              View
            </Button>
          </Tooltip>
          <Tooltip title="Edit User Details">
            <Button variant="outlined" color="warning" size="small" onClick={() => handleUpdateUser(params.id)}>
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setConfirmationDialog({ open: true, userId: params.id })}
            >
              Delete
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredUsers = users.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} md={8}>
          <TextField
            label="Search by Username or ID"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleClearSearch} size="small">
            Clear Search
          </Button>
        </Grid>
      </Grid>
      <Box>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
      </Box>
      <Dialog open={confirmationDialog.open} onClose={() => setConfirmationDialog({ open: false, userId: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog({ open: false, userId: null })}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {notification && (
        <Snackbar open autoHideDuration={3000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ManageUser;
