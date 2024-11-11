const express = require('express')
const router = express.Router();
// const upload = require('../middlewares/multer.js')
const authMiddleware = require('../middlewares/authMiddleware.js');
const {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet
} = require('../controllers/pet.controllers.js')

router.get('/' , authMiddleware, getPets)
router.get('/:id', authMiddleware, getPet)
// router.post('/', upload.single('image'), createPet)
router.delete('/:id',authMiddleware, deletePet)
router.patch('/:id', authMiddleware, updatePet)


module.exports = router;
