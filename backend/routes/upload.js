const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs'); 

const router = express.Router();

// Set up Multer storage (temporary storage on the server)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Store files temporarily in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  },
});

// Initialize Multer with file size limit and file type filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload an image (JPEG, PNG, or GIF).'), false);
    }
  },
}).single('petImage');  // Expecting a file field named 'petImage'

// POST route for uploading pet image to Cloudinary
router.post('/upload-pet-image', upload, async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'pets',  // Specify folder in Cloudinary
      use_filename: true,  // Use the original file name in Cloudinary
      unique_filename: true,  // Ensure the filename is unique
    });

    // Clean up the uploaded file on the server after Cloudinary upload
    fs.unlinkSync(req.file.path);  // Remove the file from the local server

    // Send back the URL of the uploaded image
    res.status(200).json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file to Cloudinary.');
  }
});

module.exports = router;
