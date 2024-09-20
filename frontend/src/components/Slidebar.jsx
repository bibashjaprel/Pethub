import React from 'react';

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Pet Adoption System</h2>
      </div>
      <ul className="mt-6">
        {/* Links based on user role */}
        {role === 'admin' && (
          <>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/users" className="text-gray-700 block">Manage Users</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/all-pets" className="text-gray-700 block">Manage Pets</a>
            </li>
          </>
        )}
        {/* Other role-based links */}
      </ul>
    </div>
  );
};

export default Sidebar;
