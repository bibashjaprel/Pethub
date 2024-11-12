const Pet = require('../models/pet.models');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.donatePet = async (req, res) => {
  const { name, breed, age, description, species } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!species) emptyFields.push('species');
  if (!breed) emptyFields.push('breed');
  if (!age) emptyFields.push('age');
  if (!description) emptyFields.push('description');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all fields', emptyFields });
  }

  try {
    let imageUrl = '';
    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'pets',
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = cloudinaryResult.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const newPet = new Pet({
      name,
      breed,
      age,
      description,
      species,
      image: imageUrl,
      status: 'Pending',
      doner: req.user._id,
    });

    await newPet.save();

    return res.status(201).json({
      message: 'Pet donated successfully and saved in the general pet collection',
      pet: newPet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to donate pet' });
  }
};

