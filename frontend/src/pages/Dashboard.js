import React, { useEffect, useState } from 'react';
import { getAdoptionRequests, getAdoptionApplications } from '../utils/apiHelpers';
import { clearToken } from '../utils/authHelpers'

const Dashboard = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await getAdoptionRequests();
        const applicationsData = await getAdoptionApplications();
        setRequests(requestsData);
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    clearToken();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6 bg-white p-4 shadow-md rounded">
        <h1 className="text-xl font-semibold text-gray-700">Hello {user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Log out
        </button>
      </header>
      <main className="space-y-6">
        <section className="bg-white p-4 shadow-md rounded">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Adoption Requests</h2>
          {requests.length > 0 ? (
            <ul className="space-y-4">
              {requests.map((request) => (
                <li key={request.id} className="border border-gray-300 p-4 rounded bg-gray-50">
                  <p className="font-medium text-gray-700">Pet: {request.petName}</p>
                  <p className="text-gray-600">Requester: {request.requesterName}</p>
                  <p className="text-gray-500">Status: {request.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No adoption requests available.</p>
          )}
        </section>
        <section className="bg-white p-4 shadow-md rounded">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Adoption Applications</h2>
          {applications.length > 0 ? (
            <ul className="space-y-4">
              {applications.map((application) => (
                <li key={application.id} className="border border-gray-300 p-4 rounded bg-gray-50">
                  <p className="font-medium text-gray-700">Pet: {application.petName}</p>
                  <p className="text-gray-600">Applicant: {application.applicantName}</p>
                  <p className="text-gray-500">Status: {application.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No adoption applications available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
