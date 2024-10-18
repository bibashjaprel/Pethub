const express = require('express')
const router = express.Router();
const upload = require('../middlewares/multer.js')

const {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet
} = require('../controllers/pet.controllers.js')

router.get('/', getPets)
router.get('/:id', getPet)
router.post('/', upload.single('image'), createPet)
router.delete('/:id', deletePet)
router.patch('/:id', updatePet)


module.exports = router;
