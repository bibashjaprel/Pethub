import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser as deleteUserApi } from '../utils/apiHelpers';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
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
      await deleteUserApi(userId); // Call the API to delete the user
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId)); // Update state
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full bg-gray-100 p-6 md:w-4/4">
      <h1 className="text-3xl text-gray-800 mb-6">User Management</h1>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-800 text-white text-left">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6">{user.id}</td>
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6">
                  <span className={`py-1 px-3 rounded ${user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 flex flex-col sm:flex-row sm:space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mb-2 sm:mb-0">View</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mb-2 sm:mb-0">Change Role</button>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded mb-2 sm:mb-0">Suspend</button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded" 
                    onClick={() => handleDeleteUser(user.id)} // Pass user ID
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">Add New User</button>
      </div>
    </div>
  );
};

export default UserManagement;
