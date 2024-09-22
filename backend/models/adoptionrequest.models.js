const Adoption = require('../models/adoption.models.js');

// Get all adoption requests
const getAdoptionRequests = async (req, res) => {
  try {
    const adoptions = await Adoption.find({}).populate('userid').populate('petid');
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single adoption request by ID
const getAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const adoption = await Adoption.findById(id).populate('userid').populate('petid');
    if (!adoption) {
      return res.status(404).json({ error: 'Adoption request not found' });
    }
    res.status(200).json(adoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new adoption request
const createAdoptionRequest = async (req, res) => {
  const { requestid, userid, petid, requestdate, status } = req.body;

  try {
    const adoption = await Adoption.create({
      requestid,
      userid,
      petid,
      requestdate,
      status,
    });

    res.status(201).json(adoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an adoption request by ID
const updateAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const adoption = await Adoption.findByIdAndUpdate(id, req.body, { new: true });
    if (!adoption) {
      return res.status(404).json({ error: 'Adoption request not found' });
    }
    res.status(200).json(adoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an adoption request by ID
const deleteAdoptionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const adoption = await Adoption.findByIdAndDelete(id);
    if (!adoption) {
      return res.status(404).json({ error: 'Adoption request not found' });
    }
    res.status(200).json({ message: 'Adoption request deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAdoptionRequests,
  getAdoptionRequest,
  createAdoptionRequest,
  updateAdoptionRequest,
  deleteAdoptionRequest,
};
