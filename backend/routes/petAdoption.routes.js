const express = require('express');
const router = express.Router();

const {
  getAdoptionRequests,
  getAdoptionRequest,
  createAdoptionRequest,
  deleteAdoptionRequest,
  updateAdoptionRequest
} = require('../controllers/petAdoption.cotrollers');


router.get('/', getAdoptionRequests);

router.get('/:id', getAdoptionRequest);

router.post('/', createAdoptionRequest);

router.delete('/:id', deleteAdoptionRequest);

router.patch('/:id', updateAdoptionRequest);

module.exports = router;
