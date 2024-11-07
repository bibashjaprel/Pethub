const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure that the 'uploads/pets' directory exists
const uploadDir = path.join(__dirname, 'uploads', 'pets');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save the file in 'uploads/pets' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: file size limit (5MB)
  fileFilter: (req, file, cb) => {
    // Optional: restrict file types
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed'), false);
    }
  },
});

module.exports = upload;
