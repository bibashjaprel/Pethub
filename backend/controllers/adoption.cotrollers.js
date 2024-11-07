const mongoose = require('mongoose');
const AdoptionRequest = require('../models/adoption.models');

// Get all adoption requests
const getAdoptionRequests = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find().populate('user pet');
    res.status(200).json(adoptionRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch adoption requests' });
  }
};

// Get a single adoption request by ID
const getAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    const adoptionRequest = await AdoptionRequest.findById(id).populate('user pet');

    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    res.status(200).json(adoptionRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch adoption request' });
  }
};

// Create a new adoption request
const createAdoptionRequest = async (req, res) => {
  const { userId, petId, message } = req.body;

  let emptyFields = [];
  if (!userId) emptyFields.push('userId');
  if (!petId) emptyFields.push('petId');
  if (!message) emptyFields.push('message');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all fields', emptyFields });
  }

  try {
    const newAdoptionRequest = await AdoptionRequest.create({
      user: userId,
      pet: petId,
      message,
      status: 'Pending',
    });
    res.status(201).json(newAdoptionRequest);
  } catch (error) {
    console.error('Error creating adoption request:', error);
    res.status(400).json({ error: 'Failed to create adoption request'})
  }
};

const deleteAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    const adoptionRequest = await AdoptionRequest.findByIdAndDelete(id);

    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    res.status(200).json({ message: 'Adoption request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete adoption request' });
  }
};

const updateAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid adoption request ID' });
  }

  try {
    const adoptionRequest = await AdoptionRequest.findById(id);

    if (!adoptionRequest) {
      return res.status(404).json({ error: 'No such adoption request' });
    }

    const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedAdoptionRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update adoption request' });
  }
};

module.exports = {
  getAdoptionRequests,
  getAdoptionRequest,
  createAdoptionRequest,
  deleteAdoptionRequest,
  updateAdoptionRequest,
};
