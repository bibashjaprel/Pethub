const express = require('express')
const router = express.Router();

const {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet
} = require('../controllers/pet.controllers.js')

router.get('/', getPets)
router.get('/:id', getPet)
router.post('/', createPet)
router.delete('/:id', deletePet)
router.patch('/:id', updatePet)


module.exports = router;
