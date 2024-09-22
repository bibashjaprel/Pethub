import React from "react";

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Pet Adoption System</h2>
      </div>
      <ul className="mt-6">
        <li className="py-2 px-4 hover:bg-gray-200">
          <a href="/dashboard" className="text-gray-700 block">Dashboard</a>
        </li>

        {role === 'owner' && (
          <>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/my-pets" className="text-gray-700 block">My Pets</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/adoption-requests" className="text-gray-700 block">Adoption Requests</a>
            </li>
          </>
        )}

        {role === 'admin' && (
          <>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/manage-users" className="text-gray-700 block">Manage Users</a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200">
              <a href="/all-pets" className="text-gray-700 block">Manage Pets</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
