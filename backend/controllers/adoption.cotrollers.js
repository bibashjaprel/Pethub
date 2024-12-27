const mongoose = require('mongoose');
const AdoptionRequest = require('../models/adoption.models');

// Get all adoption requests
const getAdoptionRequests = async (req, res) => {
  try {
    // Fetch all adoption requests and populate user and pet data
    const adoptionRequests = await AdoptionRequest.find().populate('user pet');

    // Send successful response with data
    res.status(200).json(adoptionRequests);
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
    // Send error response if something goes wrong
    res.status(500).json({ error: 'Failed to fetch adoption requests' });
  }
};

// Get a single adoption request by ID
const getAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    // Fetch adoption request by ID and populate user and pet data
    const adoptionRequest = await AdoptionRequest.findById(id).populate('user pet');

    // Handle case where no adoption request is found
    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    // Send successful response with data
    res.status(200).json(adoptionRequest);
  } catch (error) {
    console.error('Error fetching adoption request:', error);
    // Send error response if something goes wrong
    res.status(500).json({ error: 'Failed to fetch adoption request' });
  }
};

// Create a new adoption request
const createAdoptionRequest = async (req, res) => {
  const { userId, petId, message } = req.body;

  // Validate required fields
  let emptyFields = [];
  if (!userId) emptyFields.push('userId');
  if (!petId) emptyFields.push('petId');
  if (!message) emptyFields.push('message');

  // If any field is missing, return error response
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all fields', emptyFields });
  }

  try {
    // Create new adoption request
    const newAdoptionRequest = await AdoptionRequest.create({
      user: userId,
      pet: petId,
      message,
      status: 'Pending', // Default status for a new request
    });

    // Send successful response with the created request
    res.status(201).json(newAdoptionRequest);
  } catch (error) {
    console.error('Error creating adoption request:', error);
    // Send error response if something goes wrong
    res.status(400).json({ error: 'Failed to create adoption request' });
  }
};

// Delete an adoption request
const deleteAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    // Attempt to find and delete the adoption request by ID
    const adoptionRequest = await AdoptionRequest.findByIdAndDelete(id);

    // Handle case where no adoption request was found
    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    // Send successful response
    res.status(200).json({ message: 'Adoption request deleted successfully' });
  } catch (error) {
    console.error('Error deleting adoption request:', error);
    // Send error response if something goes wrong
    res.status(500).json({ error: 'Failed to delete adoption request' });
  }
};

// Update an adoption request
const updateAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    // Attempt to find the adoption request by ID
    const adoptionRequest = await AdoptionRequest.findById(id);

    // Handle case where no adoption request was found
    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    // Update the adoption request with new data
    const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
      id,
      { ...req.body }, // Spread operator to update fields based on request body
      { new: true } // Return the updated document
    );

    // Send successful response with the updated data
    res.status(200).json(updatedAdoptionRequest);
  } catch (error) {
    console.error('Error updating adoption request:', error);
    // Send error response if something goes wrong
    res.status(500).json({ error: 'Failed to update adoption request' });
  }
};

// get user adoption only
const getMyAdoptionRequest = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from the authenticated user token
    console.log("Logged-in User ID:", userId);

    // Filter requests by userId
    const myAdoptionRequests = await AdoptionRequest.find({ user: userId }) // Filter the user field
      .populate('user pet'); // Populate user and pet references

    res.status(200).json(myAdoptionRequests);
  } catch (error) {
    console.error('Bibash, error here fetching adoption requests:', error);
    res.status(500).json({ error: 'Failed to fetch adoption requests' });
  }
};

module.exports = {
  getAdoptionRequests,
  getAdoptionRequest,
  createAdoptionRequest,
  deleteAdoptionRequest,
  updateAdoptionRequest,
  getMyAdoptionRequest,
};
