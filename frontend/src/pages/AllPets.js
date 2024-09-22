import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/pets/');
        setPets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching pets');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0h-4a4 4 0 00-8 0H4z"></path>
        </svg>
        <p className="ml-2 text-blue-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Pets</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length === 0 ? (
          <p className="text-center col-span-full">No pets available.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
              <p className="text-gray-700">Species: {pet.species}</p>
              <p className="text-gray-700">Breed: {pet.breed}</p>
              <p className="text-gray-700">Age: {pet.age}</p>
              <p className="text-gray-700 mb-4">Description: {pet.description}</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                Adopt {pet.name}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPets;
