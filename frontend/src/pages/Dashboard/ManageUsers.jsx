import React, { useEffect, useState } from 'react';
import { getUser, deleteUser as deleteUserApi } from '../../utils/apiHelpers'; // Adjust the path to your API helpers
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserApi(userId);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleViewUser = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleUpdateUser = (userId) => {
    navigate(`/users/update/${userId}`);
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear the search term
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <span className={`py-1 px-3 rounded ${params.value === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button variant="outlined" color="primary" onClick={() => handleViewUser(params.id)}>
            View
          </Button>
          <Button variant="outlined" color="warning" onClick={() => handleUpdateUser(params.id)}>
            Update
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDeleteUser(params.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField 
          label="Search by Username or ID" 
          variant="outlined" 
          size="small" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }} // Margin to the right
        />
        <Button variant="contained" onClick={handleClearSearch} size="small">
          Clear
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={filteredUsers}
          columns={columns}
          pageSize={5} 
          rowsPerPageOptions={[5]} 
          disableSelectionOnClick 
        />
      </div>
    </Box>
  );
};

export default ManageUser;
