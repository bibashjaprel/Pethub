const PetDonate = require('../models/petDonate.models');
const Pet = require('../models/pet.models');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.donatePet = async (req, res) => {
  const { name, breed, age, description, species } = req.body;

  // Validation for required fields
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
    // Cloudinary upload
    let imageUrl = '';
    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'pets',  // Optional: set a folder in Cloudinary for organization
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = cloudinaryResult.secure_url;

      // Clean up the uploaded file from the local file system
      fs.unlinkSync(req.file.path);
    }

    // Create the PetDonate record
    const newPetDonate = new PetDonate({
      name,
      breed,
      age,
      description,
      species,
      image: imageUrl,
      donor: req.user._id,
      donorname: req.user.firstname, // Assuming you're using a logged-in user
    });

    // Save the donation record
    await newPetDonate.save();

    // Create the general Pet record
    const newPet = new Pet({
      name,
      breed,
      age,
      description,
      species,
      image: imageUrl,  // Same image URL
    });

    // Save the pet record in the general Pet collection
    await newPet.save();

    return res.status(201).json({
      message: 'Pet donated successfully and saved in the general pet collection',
      petDonate: newPetDonate,
      pet: newPet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to donate pet' });
  }
};
