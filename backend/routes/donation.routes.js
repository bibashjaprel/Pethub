const express = require('express');
const petDonateController = require('../controllers/petDonate.controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

/**
 * @route POST /donate
 * @desc Donate a pet
 * @access Protected
 */
router.post('/', authMiddleware, uploadMiddleware.single('file'), petDonateController.donatePet);

module.exports = router;
