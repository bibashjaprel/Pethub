import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getUser } from '../utils/authHelpers';
import UserManagement from '../components/UserManagement'
const user = getUser();


const Dashboard = () => {
  const role = user?.role;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <button
        className="sm:hidden p-2 text-gray-600"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <div className={`sm:block ${sidebarOpen ? 'block' : 'hidden'} sm:w-64 w-full fixed z-10 sm:static bg-white shadow-lg`}>
        <Sidebar role={role} />
      </div>

      <div className="flex-1 p-0 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="mt-6">
          {role === 'admin' &&
          //  <p>Admin-specific content goes here.</p>
          <UserManagement />
           }
          {role === 'owner' && <p>Owner-specific content goes here.</p>}
          {role === 'user' && <p>User-specific content goes here.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
