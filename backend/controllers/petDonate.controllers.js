const Pet = require('../models/pet.models');
const DonateRequest = require('../models/donate.models');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.donatePet = async (req, res) => {
  const { name, breed, age, description, species, message } = req.body;

  // Validate required fields
  const requiredFields = { name, breed, age, description, species };
  const emptyFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill all fields',
      emptyFields,
    });
  }

  try {
    let imageUrl = '';
    if (req.file) {
      try {
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'pets',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = cloudinaryResult.secure_url;
      } catch (uploadError) {
        console.error('Error uploading file to Cloudinary:', uploadError);
        return res.status(500).json({ error: 'File upload failed' });
      } finally {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    // Save pet details
    const newPet = new Pet({
      name,
      breed,
      age,
      description,
      species,
      image: imageUrl,
      status: 'Pending',
      donor: req.user._id,
    });

    await newPet.save();

    // Save donation request
    const newDonateRequest = new DonateRequest({
      pet: newPet._id,
      donor: req.user._id,
      message: 'Uploaded pet for donation',
      status: 'Pending',
    });

    await newDonateRequest.save();

    console.log('New Pet:', newPet);
    console.log('New Donate Request:', newDonateRequest);

    return res.status(201).json({
      message: 'Pet donated successfully and saved in the general pet collection',
      pet: newPet,
      request: newDonateRequest,
    });
  } catch (error) {
    console.error('Error donating pet:', error);
    return res.status(500).json({ error: 'Failed to donate pet' });
  }
};
