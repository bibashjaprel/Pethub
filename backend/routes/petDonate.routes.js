const express = require('express');
const petDonateController = require('../controllers/petDonate.controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Route to donate a pet
router.post('/',  authMiddleware, uploadMiddleware.single('file'), petDonateController.donatePet);

module.exports = router;
