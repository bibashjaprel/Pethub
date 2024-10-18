const multer = require('multer')
const { cloudinaryStorage, CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pets',
    allow_formats: ['jpg', 'png', 'jpeg' ]
  }
})

const upload = multer({ storage: storage})

module.exports = upload;
