const mongoose = require('mongoose');
const Pet = require('../models/pet.models.js');
const cloudinary = require('../config/cloudinary.js');

// get all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
};

// get single pet
const getPet = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findById(id);
    
    if (!pet) {
      return res.status(404).json({ error: 'No such pet' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
};

// create pet with image upload
const createPet = async (req, res) => {
  const { name, species, breed, age, description } = req.body;
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
      imageUrl = req.file.path;
    }

    const pet = await Pet.create({ name, species, breed, age, description, image: imageUrl });
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete pet
const deletePet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findOneAndDelete({ _id: id });
    
    if (!pet) {
      return res.status(404).json({ error: 'No such pet' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
};

// update pet with image upload
const updatePet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ error: 'No such pet' });
    }

    let imageUrl = pet.image;
    if (req.file) {
      imageUrl = req.file.path;

    }

    const updatedPet = await Pet.findOneAndUpdate({ _id: id }, {
      ...req.body,
      image: imageUrl,
    }, { new: true });

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
};

module.exports = {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet,
};
