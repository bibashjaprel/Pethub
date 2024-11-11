const express = require('express');
const router = express.Router();

const {
  getAdoptionRequestApplications,
  createAdoptionRequestApplication,
  updateAdoptionRequestApplication,
  deleteAdoptionRequestApplication
} = require('../controllers/adoptionapplication.cotrollers');

router.get('/', getAdoptionRequestApplications);

router.post('/', createAdoptionRequestApplication);

router.put('/:id', updateAdoptionRequestApplication);

router.delete('/:id', deleteAdoptionRequestApplication);

module.exports = router;
