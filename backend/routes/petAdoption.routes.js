const express = require('express');
const router = express.Router();

const {
  getAdoptionRequests,
  getAdoptionRequest,
  createAdoptionRequest,
  deleteAdoptionRequest,
  updateAdoptionRequest
} = require('../controllers/petAdoption.controllers');

// Get all adoption requests
router.get('/', getAdoptionRequests);

// Get a specific adoption request by ID
router.get('/:id', getAdoptionRequest);

// Create a new adoption request
router.post('/', createAdoptionRequest);

// Delete a specific adoption request by ID
router.delete('/:id', deleteAdoptionRequest);

// Update a specific adoption request by ID
router.patch('/:id', updateAdoptionRequest);

module.exports = router;
