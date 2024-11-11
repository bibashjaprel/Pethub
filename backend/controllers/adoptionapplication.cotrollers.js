const mongoose = require('mongoose');
const AdoptionRequestApplication = require('../models/adoptionapplication.model');

const getAdoptionRequestApplications = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequestApplication.find();
    res.status(200).json(adoptionRequests);
  } catch (error) {
    console.error('Error fetching adoption applications:', error);
    res.status(500).json({ error: 'Failed to fetch adoption application requests' });
  }
};

const createAdoptionRequestApplication = async (req, res) => {
  const { userId, petId, name, message } = req.body;

  // Check for empty fields
  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!message) emptyFields.push('message');

  // If there are missing fields, return a 400 error
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all fields', emptyFields });
  }

  try {
    const newAdoptionRequest = await AdoptionRequestApplication.create({
      userId,
      petId,
      name,
      message,  
    });
    res.status(201).json(newAdoptionRequest);
  } catch (error) {
    console.error('Error creating adoption request:', error);
    res.status(400).json({ error: 'Failed to create adoption request' });
  }
};

// Update an existing adoption request (Placeholder for future functionality)
const updateAdoptionRequestApplication = async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;

  try {
    const updatedAdoptionRequest = await AdoptionRequestApplication.findByIdAndUpdate(
      id,
      { name, message },
      { new: true }
    );
    if (!updatedAdoptionRequest) {
      return res.status(404).json({ error: 'Adoption request not found' });
    }
    res.status(200).json(updatedAdoptionRequest);
  } catch (error) {
    console.error('Error updating adoption request:', error);
    res.status(400).json({ error: 'Failed to update adoption request' });
  }
};

// Delete an adoption request (Placeholder for future functionality)
const deleteAdoptionRequestApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdoptionRequest = await AdoptionRequestApplication.findByIdAndDelete(id);
    if (!deletedAdoptionRequest) {
      return res.status(404).json({ error: 'Adoption request not found' });
    }
    res.status(200).json({ message: 'Adoption request deleted successfully' });
  } catch (error) {
    console.error('Error deleting adoption request:', error);
    res.status(400).json({ error: 'Failed to delete adoption request' });
  }
};

module.exports = {
  getAdoptionRequestApplications,
  createAdoptionRequestApplication,
  updateAdoptionRequestApplication,
  deleteAdoptionRequestApplication,
};
