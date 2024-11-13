const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const {
  getPets,
  getPet,
  getPendingPets,
  deletePet,
  updatePet,
  updatePendingPetStatus,
} = require('../controllers/pet.controllers.js')

router.get('/' , authMiddleware,getPets)
router.get('/pending' ,authMiddleware, getPendingPets)
router.put('/pending/:id', authMiddleware, updatePendingPetStatus);
router.get('/:id', authMiddleware, getPet)
router.delete('/:id',authMiddleware, deletePet)
router.patch('/:id', authMiddleware, updatePet)


module.exports = router;
